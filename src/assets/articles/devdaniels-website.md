---
published: true
slug: devdaniels-website
author: Daniël Geerts
title: DevDaniels Website
startDate: "2025"
shortDescription: "A portfolio website built with Angular, hosted on Azure Static Web Apps and fully automated with GitHub Actions."
categories:
  - Project
  - Web Development
featuredImage:
  altText: DevDaniels Website Architecture
  srcPath: assets/images/project/devdaniels-website/devdaniels-website-architecture.jpg
githubRepo:
  label: Github - DevDaniels Website
  link: https://github.com/devdanielsun/devdaniels-website
tags:
  - Angular
  - Typescript
  - Cloudflare
  - Azure
  - SCSS
  - CI/CD (Github Actions)
  - Markdown to HTML
---

## Why a personal portfolio?

As a software engineer, I had been wanting to have my own place on the internet for a while. Not just a standard template, but something I built myself and can be proud of. A website where I can showcase projects, visualize my art, write articles, and where the technology behind the scenes is just as interesting as what you see as a visitor. So I got to work.

## Choosing Angular and TypeScript

For the framework I went with **Angular**. Not because it's the trendiest framework of the moment, but because I work with it almost regularly and know it well. Angular provides a solid structure for larger projects, and with the newer versions (at the time of writing this site runs on Angular 20) the framework has become a lot more modern. Standalone components, signals, and the `inject()` function instead of constructor injection make the code much cleaner.

**TypeScript** was a natural choice alongside it. Strong typing helps enormously in preventing bugs, especially as a project grows. It gives confidence that what you write actually works correctly, and your IDE does a large part of the thinking for you.

The entire application is built from standalone components. This means each component is self-contained and explicitly declares which dependencies it needs. No more loose `NgModules` woven throughout the codebase. That makes it easier to understand what each part does.

## The article system

One of the most enjoyable parts to build was the article system. The articles (including this one) are simply **Markdown files** with YAML frontmatter at the top. This contains metadata such as the title, author, date, tags, and a featured image.

Loading an article MD file works as follows:

1. The slug from the URL is picked up by the Angular router.
2. A **resolver** fetches the corresponding `.md` file via an HTTP call.
3. The frontmatter is parsed with `js-yaml` and the Markdown content is converted to HTML with `marked`.
4. The HTML is sanitized with `DOMPurify` to prevent XSS attacks, and then rendered on the page.

To add a new article, all I need to do is create a Markdown file and register the slug in a simple array. No database, no CMS, just files in the repository. That keeps things nice and simple.

## CI/CD with GitHub Actions

Writing code alone isn't enough. I wanted everything around testing, linting, and deployment to be fully automated. That's where **GitHub Actions** come in.

Two workflows are set up:

### 1. Run Tests (on pull requests)

With every pull request to the `development` branch, the following steps are automatically executed:

- Install dependencies
- Run ESLint to check code quality
- Run unit tests with Karma and Jasmine in a headless Chrome environment

This ensures that no broken code can make it into the development branch without being caught.

### 2. Build and Deploy (on push to main)

Once code lands on the `main` branch, the full pipeline runs:

- Linting and tests run again as an extra safety net
- The Angular application is built for production
- The result is automatically deployed to **Azure Static Web Apps**

Everything runs on `ubuntu-latest` runners and the entire process is completely free.

### Local quality control

In addition to the CI/CD pipeline, there's also a local safety net set up with **Husky** and **lint-staged**. With every commit, Prettier (for formatting) and ESLint (for code quality) are automatically run on the changed files. This way you catch issues before even pushing.

## Hosting: Azure Static Web Apps

One of my requirements was that hosting had to be **free**. After all, it's a personal project. **Azure Static Web Apps** offers a free tier that's perfect for this kind of project. You get:

- Free hosting for static content
- Automatic SSL certificates
- Global distribution via a CDN
- Seamless integration with GitHub Actions

The configuration is minimal. A small `staticwebapp.config.json` file handles the SPA routing by forwarding all requests to `index.html`, with exceptions for static assets like images.

For DNS and additional caching, I put **Cloudflare** in front of it. That adds an extra layer of protection and speed, again at no cost.

## What I learned from it

This project was a great way to get familiar with the newer features of Angular, such as signals and standalone components. Additionally, setting up a complete CI/CD pipeline with GitHub Actions and Azure Static Web Apps was a valuable learning experience. It's nice to see that you can set up a professional workflow with free tooling.

The article system with Markdown and frontmatter is a pattern I'll definitely apply more often in future projects. It's simple, flexible, and the content lives right in version control.

If you're curious about the source code, it can be found on [GitHub](https://github.com/devdanielsun/devdaniels-portfolio)
