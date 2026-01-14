# DevdanielsPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

---

[![NPM Test @ Development](https://github.com/devdanielsun/devdaniels-portfolio/actions/workflows/run-tests.yml/badge.svg)](https://github.com/devdanielsun/devdaniels-portfolio/actions/workflows/run-tests.yml)
[![Deploy app to Azure @ Main](https://github.com/devdanielsun/devdaniels-portfolio/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/devdanielsun/devdaniels-portfolio/actions/workflows/build-and-deploy.yml)

---

### Prerequisites

- [Node.js](https://nodejs.org/) >= 22.12
- [Angular CLI](https://angular.dev/tools/cli) (recommended)

### Install dependencies

```bash
npm install
```

### Development server

Start a local development server:

```bash
npm start
```

Open your browser at [http://localhost:4200/](http://localhost:4200/). The app reloads automatically on source file changes.

### Building

To build the project for production:

```bash
npm build
```

Build artifacts are stored in the `dist/` directory.

### Code scaffolding

Generate a new component:

```bash
ng generate component component-name
```

For more schematics (components, directives, pipes):

```bash
ng generate --help
```

### Deployment

The app is configured for deployment to Azure Static Web Apps. See [azure-staticwebapp.yml](.github/workflows/azure-staticwebapp.yml) for CI/CD details.

## Project Structure

- `src/app/` — Angular application source code
- `src/styles.scss` — Global styles and Material theming
- `src/assets/` — Static assets (images, favicon, etc.)
- `.github/workflows/` — GitHub Actions CI/CD workflows
- `.husky/precommit` - Executes a precommit which formats the staged code and executes tests

---
