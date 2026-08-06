---
published: true
slug: cicd-case-study
author: Daniël Geerts
title: CI/CD Case Study
startDate: "2022"
endDate: "2022"
shortDescription: "A CI/CD case study from my IBM traineeship, building a full delivery pipeline with GitHub Actions, Docker, Kubernetes and Terraform on IBM Cloud."
categories:
  - Project
  - Case Study
featuredImage:
  altText: CI/CD Case Study
  srcPath: assets/images/articles/cicd-case-study.svg
githubRepo:
  label: Github - CI/CD Case Study
  link: https://github.com/devdanielsun/cicd-pipeline
tags:
  - Docker
  - Kubernetes
  - Terraform
  - Github Actions
  - CI/CD
---

## The assignment

During my traineeship at IBM, the case studies was about building a full delivery chain as a DevOps engineer: not just writing code, but actually getting an application built, tested, deployed and running in Kubernetes through CI/CD. The whole point was to apply everything I had learned about the DevOps process in one concrete project instead of separate exercises.

The requirements were fairly open. I had access to a free IBM Cloud **Kubernetes** cluster, a **Docker** registry to push images to, and I was free to pick my own CI/CD tooling. The only hard constraints were that pull requests to `main` had to run unit tests before they could be merged, and that a merge into `main` should push a freshly built Docker image to a registry and deploy it, exposed through a NodePort service since a free cluster doesn't support a load balancer or ingress. On top of that I wanted to provision the underlying cloud infrastructure itself as code instead of clicking it together in a dashboard, so **Terraform** became part of the picture as well.

## The application

The app itself was intentionally simple: a small **Node.js** application living in `/app`. The goal of the case study was never about the application logic, it was about everything around it. So I kept the app small and put all my effort into the pipeline, the infrastructure and how those two pieces work together.

## Choosing the tools

For CI/CD I went with **GitHub Actions**, mainly because it lives right next to the code and doesn't require a separate server or service to maintain. For the infrastructure I chose **Terraform** with the **IBM Cloud provider**, since IBM Cloud was the platform I had free access to during the traineeship, and Terraform state was stored in **Terraform Cloud** so it wasn't tied to my laptop or a single runner. Also I picked Terraform to get hands-on experience because it is not tightly coupled to a single cloud but meant for multicloud.

The application itself runs in **Docker**, gets pushed to the **IBM Cloud Container Registry**, and is deployed onto an **IBM Cloud Kubernetes Service (IKS)** cluster.

## Infrastructure as code with Terraform

Instead of provisioning the Kubernetes cluster and container registry by hand, the entire cloud environment is defined in a small set of Terraform files:

- `provider.tf` configures the IBM provider and points to a remote workspace in Terraform Cloud, so state is shared and versioned instead of living locally.
- `variables.tf` declares everything that differs per environment: the IBM Cloud org and space, the API key, region, namespace, cluster name and datacenter.
- `ibm.tf` contains the actual resources: a container registry namespace (`ibm_cr_namespace`) and the Kubernetes cluster itself (`ibm_container_cluster`), configured on the free tier with a single worker node.
- `outputs.tf` exposes the path to the generated cluster config file, so later steps in the pipeline can pick it up.
  > A small detail I liked adding was a Slack webhook directly on the cluster resource, so IBM Cloud notifies a Slack channel whenever something happens to the cluster. Small addition, but it made the infrastructure feel a lot less like a black box.

With this setup, spinning up (or tearing down) the entire cloud environment is a matter of:

```
$ cd terraform
$ terraform init
$ terraform plan
$ terraform apply
$ terraform destroy
```

## Three pipelines, three responsibilities

Rather than cramming everything into a single workflow, I split the pipeline into three separate GitHub Actions workflows, each with its own clear responsibility.

### 1. Continuous Integration (node.js.yml)

Triggered on every push to `development` and on every pull request to `main` or `development`. It checks out the repository, installs the Node.js dependencies, builds the app and runs the test suite. This is the gate that has to pass before code is allowed to move any further down the chain.

### 2. Cloud setup (terraform.yml)

Triggered on every push to `main`. This workflow runs `terraform fmt`, `terraform init`, `terraform validate` and `terraform plan`, and on a pull request it automatically posts the plan output as a comment on the PR, so reviewers can see exactly what would change in the infrastructure before anything is applied. Only when the push actually lands on `main` does it run `terraform apply` and provision or update the cluster and registry for real.

### 3. Continuous Deployment (ibm.yml)

This one doesn't trigger on a push at all. Instead, it listens for the Terraform workflow to finish successfully via `workflow_run`. Once the infrastructure is confirmed to be in place, it authenticates with the IBM Cloud CLI, builds the Docker image, tags it with the commit SHA, pushes it to the IBM Cloud Container Registry, and finally deploys it to the IKS cluster with `kubectl`, exposing it through a NodePort service on port 32100.

Chaining the workflows this way, instead of running everything in one long job, meant deployment could never run against infrastructure that wasn't actually ready yet.

## Working locally first

Before anything touched IBM Cloud, I wanted the same app to run locally with Docker Compose, and I wanted the same commands available through a `Makefile` so I wasn't retyping long `docker` or `terraform` commands every time:

```
$ make compose
$ make build
$ make push API_KEY=..
$ make tf-create-workspace ENV=staging
$ make tf-init ENV=staging
$ make tf-plan ENV=staging
```

This made it a lot easier to debug things locally before trusting a change to the pipeline, and it kept the CI workflows themselves fairly thin, since most of the underlying logic already existed as make targets.

## What I learned from it

This case study was really where CI/CD stopped being theory for me. Splitting the pipeline into CI, infrastructure and deployment, and having them depend on each other instead of just running in sequence in one file, taught me a lot about designing a delivery chain rather than just automating individual steps.

Terraform was the biggest new piece for me at the time. Seeing a `terraform plan` show up as a comment on a pull request, and only being able to merge once that plan looked correct, made infrastructure changes feel just as reviewable as code changes. That's a habit I've kept in projects since.

It also made very clear how much a free tier constrains your architecture. No load balancer, no ingress, one worker node. Working around those limitations, instead of just having unlimited cloud resources, forced me to actually understand what a NodePort service does instead of skipping past it.

If you're curious about the source code, it can be found on [GitHub](https://github.com/devdanielsun/cicd-pipeline)
