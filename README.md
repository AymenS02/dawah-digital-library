This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

### Subscription Service

The application includes a comprehensive subscription service that allows users to support the library:

#### For Users
- Visit `/subscription` to choose your monthly subscription amount
- Minimum subscription is $1, with suggested amounts of $5, $10, $25, or $50
- View your current subscription status and renewal dates
- Submit optional notes with your subscription request

#### For Administrators
- Access the subscription management panel in the Admin Dashboard
- View all subscriptions filtered by status (pending, active, expired, cancelled)
- Receive automatic reminders for subscriptions expiring within 7 days
- Urgent notifications for subscriptions expiring in 3 days or less
- Update subscription details including status, dates, and notes
- Quick actions to activate, expire, or cancel subscriptions

#### API Endpoints
- `POST /api/subscription/submit` - Submit a new subscription request (requires authentication)
- `GET /api/subscription/status` - Get current user's subscription status (requires authentication)
- `GET /api/subscription/list` - List all subscriptions with optional status filter (admin only)
- `POST /api/subscription/update` - Update subscription details (admin only)
- `GET /api/subscription/reminders` - Get subscriptions due for renewal (admin only)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
