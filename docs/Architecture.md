# CLICK Real Estate Connectors - Architecture

## Overview

CLICK is a full-stack Ugandan real estate marketplace built with modern web technologies.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Leaflet (with OpenStreetMap)
- **State Management**: React Hooks + Context

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **ORM**: Prisma
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js
- **Email**: Nodemailer / Resend

### Infrastructure
- **Hosting**: Vercel (recommended)
- **Database**: PlanetScale / Supabase (production)
- **Storage**: S3-compatible (property images)
- **CDN**: Vercel Edge Network

## Architecture Patterns

### Frontend Architecture
```
app/
├── (routes)/           # Route groups
├── api/                # API routes
├── layout.tsx          # Root layout
├── page.tsx            # Homepage
└── globals.css         # Global styles
```

### Component Architecture
```
components/
├── layout/             # Layout components (Navbar, Footer)
├── ui/                 # Reusable UI components
├── properties/         # Property-specific components
├── map/                # Map components
├── providers/          # Provider components
└── dashboard/          # Dashboard components
```

### Database Architecture
- **Users**: Authentication and user profiles
- **Providers**: Business profiles for property providers
- **Properties**: Property listings with full details
- **Inquiries**: Buyer-to-provider connections
- **Leads**: Provider lead management
- **Payments**: Transaction records
- **Commissions**: Commission tracking

### API Architecture
- RESTful API design
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation with Zod
- Rate limiting (planned)

## Security

### Authentication
- JWT tokens via NextAuth.js
- Secure password hashing (bcrypt)
- HTTP-only cookies
- CSRF protection

### Authorization
- Role-based access control
- Provider verification workflow
- Admin approval system
- Secure contact information access

### Data Protection
- Input sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection
- Rate limiting (planned)
