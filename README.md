# Quotely

Quotes submitted by users!

## Setup

`1` **Clone the repository**

```bash
git clone https://github.com/WoIfey/Quotely.git
```

```bash
cd Quotely
```

`2` **Install dependencies**

```bash
pnpm install
```

`3` **Configure environment variables**

Copy the `env.example` file and rename it to `.env` and set the following variables from:

- [Better Auth](https://www.better-auth.com/docs/installation#set-environment-variables)
  - [GitHub Provider](https://github.com/settings/developers)
  - [Google Provider](https://console.cloud.google.com/apis/credentials)
  <!-- - [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/) -->

`4` **Initialize the database**

```bash
pnpm docker
```

`5` **Run database migrations**

```bash
pnpm prisma
```

`6` **Start the development server**

```bash
pnpm dev
```
