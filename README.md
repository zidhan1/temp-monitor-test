# Deepfryer - Temperature Monitoring API

Express.js application for temperature monitoring with Supabase PostgreSQL database.

## Prerequisites
- Node.js installed
- Supabase account and project

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
DATABASE_URL="your-supabase-pooler-url"
DIRECT_URL="your-supabase-direct-url"
```

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

## Vercel Deployment

### Environment Variables
Before deploying, set these environment variables in your Vercel project settings:

- `DATABASE_URL`: Your Supabase pooler connection string
- `DIRECT_URL`: Your Supabase direct connection string

### Deployment Steps
1. Push your code to Git
2. Import your project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

The application will be available at your Vercel domain.

## API Endpoints

### GET /
API information and available endpoints.

### GET /health
Health check endpoint to verify the API is running and database is configured.

### POST /api/monitoring
Save temperature monitoring data.

Request body:
```json
{
  "DateTime": "2024-06-03T10:00:00Z",
  "Temp1": 25.5,
  "Status1": "Normal",
  "Temp2": 26.0,
  "Status2": "Normal",
  "Button": "On",
  "Mode": "Auto",
  "Location": "Kitchen"
}
```

## Database
This project uses Prisma ORM with Supabase PostgreSQL.
