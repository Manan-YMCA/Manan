# www — Frontend

React frontend for the Manan website built with Vite, Tailwind CSS v4, and React Router v7.

## Pages

| Route | Description |
|---|---|
| `/` | Home page |
| `/login` | OTP-based email login |
| `/members` | Public member directory |
| `/members/:id` | Individual member profile |
| `/events` | Events listing |
| `/gallery` | Photo gallery |
| `/admin` | Admin dashboard (requires admin role) |
| `/profile` | Edit own profile |

## Setup

```sh
cp .env.example .env
# Edit .env with your API URL
source .env
pnpm dev
```
