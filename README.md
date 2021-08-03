# Next.js Template

## Technique

- TypeScript
- Next.js
  - React.js
  - SWR
- Tailwind CSS
- Storybook
- GitHub CI
- Docker
- *[OPTIONAL]* Sentry
- *[OPTIONAL]* Google Analytics

## Features

- Automatically analyze code after pushing to GitHub
  - Analyze with `CodeQL`
  - Analyze with `njsscan`
  - Test building production build with `yarn build`
  - Test building Docker with `docker build`
- Available to build as a Docker image
  - Exclude all useless components for a production build
    - For example, `storybook` and `eslint`
- Built-in `.vercelignore` so that you can install dependencies with `yarn --production`
  - Exclude all useless components for a production build
    - For example, `storybook` and `eslint`
- Built-in Sentry support
- Built-in Google Analytics support
- Built-in NProgress (process bar) support
- Built-in ESLint support
  - with featured ESLint rules
  - strictly follow the `ESLint` rules
- [Component Driven User Interfaces](https://www.componentdriven.org)
  - Built-in Storybook support

## Install Dependencies

```bash
yarn
```

## Configuration

- `consts.ts`
  - `PRODUCT_NAME`: your project name
  - `ENABLE_GA`: enable Google Analytics support
  - `ENABLE_SENTRY`: enable Sentry support
    - You should [initiate](https://docs.sentry.io/platforms/javascript/guides/nextjs/) your Sentry.
    - We only provided the base architecture
- `.env.local.example`
  - Should copy to `.env.local`
  - `NEXT_PUBLIC_GA_ID`: your Google Analytics ID after enabling `consts.ts` > `ENABLE_GA`

## Development

I recommend to use WebStorm or Visual Studio Code to develop this template.

```
yarn dev # dev server
yarn storybook # storybook
```

### Linting

```bash
yarn eslint .
```

## Building

### Local Deployment

```bash
yarn build
yarn start
```

### with Docker

```bash
docker build -t next-app .
docker run -d --name your-next-app-instance -p 8080:3000 next-app
```

## Authors

pan93412 and friends, 2021.
