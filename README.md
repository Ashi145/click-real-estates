# CLICK Real Estate Connectors 🇺🇬

**Find It. Know It. Connect.**

Uganda's property connection platform. Discover homes, land, rentals and commercial properties across Uganda — then connect with the right owner, broker, agent or property company.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database](#database)
- [Authentication](#authentication)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

CLICK is a production-quality Ugandan real estate marketplace that connects property buyers with sellers, brokers, agents, and property companies. The platform features:

- **Visual Property Discovery**: Modern UI with interactive maps and property cards
- **Location-Aware Search**: Real distance calculations and directions
- **Verified Providers**: Trust system for brokers, agents, and companies
- **Secure Connections**: Protected contact information with commission-based access
- **Provider Ecosystem**: Support for all property provider types
- **Admin Dashboard**: Complete platform management

## ✨ Features

### For Property Buyers
- 🔍 Advanced property search with filters
- 📍 Location-aware discovery with real distances
- 🗺️ Interactive map view
- ❤️ Save favorite properties
- 🔔 Saved search alerts
- 📱 Mobile-first responsive design
- 🔒 Secure provider connections

### For Property Providers
- 📊 Provider dashboard with analytics
- 🏠 Property listing management
- 👥 Lead management system
- ⭐ Verified provider badges
- 📈 Marketing & promotion tools
- 💰 Commission tracking

### For Administrators
- 👥 User management
- 🏢 Provider verification workflow
- 📝 Property approval system
- 💵 Finance & commission management
- 🚨 Report handling
- 📊 Platform analytics

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Leaflet** - Interactive maps
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API
- **Prisma** - Type-safe ORM
- **NextAuth.js** - Authentication
- **Zod** - Schema validation

### Database
- **SQLite** (development)
- **PostgreSQL** (production)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashi145/click-real-estates.git
   cd click-real-estates
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. **Initialize the database**
   ```bash
   npx prisma db push
   ```

5. **Seed the database**
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@click.ug | admin123 |
| Buyer | buyer@click.ug | buyer123 |
| Provider | jioni@click.ug | provider123 |

## 📁 Project Structure

```
click-real-estates/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── properties/        # Property pages
│   ├── brokers/           # Provider directory
│   ├── map/               # Map view
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin panel
│   └── ...                # Other pages
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── ui/                # UI components
│   ├── properties/        # Property components
│   └── ...                # Other components
├── lib/                   # Utility functions
├── prisma/                # Database schema & seed
├── docs/                  # Documentation
├── public/                # Static assets
└── ...config files
```

## 🗄️ Database

### Schema

The database includes the following main models:

- **User** - User accounts with roles
- **Provider** - Business profiles for property providers
- **Property** - Property listings
- **Inquiry** - Buyer-provider connections
- **Lead** - Provider lead management
- **Payment** - Transaction records
- **Commission** - Commission tracking

### Migrations

```bash
# Push schema changes (development)
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name migration_name

# Generate Prisma Client
npx prisma generate
```

### Seeding

```bash
npm run db:seed
```

## 🔐 Authentication

CLICK uses NextAuth.js for authentication with support for:

- Email/password credentials
- Google OAuth (optional)
- JWT-based sessions
- Role-based access control

### Roles

| Role | Description |
|------|-------------|
| BUYER | Property seekers |
| OWNER | Individual property owners |
| BROKER | Independent property brokers |
| AGENT | Real estate agents |
| AGENCY | Real estate agencies |
| COMPANY | Property companies |
| DEVELOPER | Property developers |
| LANDLORD | Property landlords |
| PROPERTY_MANAGER | Property management companies |
| ADMIN | Platform administrators |
| SUPER_ADMIN | Super administrators |

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Key Endpoints

#### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property

#### Providers
- `GET /api/providers` - List providers

#### Contact
- `POST /api/contact` - Submit inquiry

#### Authentication
- `POST /api/auth/[...nextauth]` - Login/register

See [API Documentation](docs/API.md) for complete details.

## 🚀 Deployment

### GitHub Pages (Automatic via GitHub Actions)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the static export to GitHub Pages:
1. Merge your branch/PR into `main`.
2. In GitHub repository settings: **Settings** > **Pages** > **Build and deployment** > Set **Source** to **GitHub Actions**.
3. The site will be published at `https://ashi145.github.io/click-real-estates/`.

### Vercel (Alternative for Full-Stack / Node.js)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | Database connection string | Yes |
| NEXTAUTH_URL | Application URL | Yes |
| NEXTAUTH_SECRET | Authentication secret | Yes |
| GOOGLE_CLIENT_ID | Google OAuth client ID | No |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | No |
| RESEND_API_KEY | Email service API key | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

- **Email**: info@click.ug
- **Phone**: +256 700 000 000
- **Website**: [click.ug](https://click.ug)

## 🙏 Acknowledgments

- Built with ❤️ for Uganda's property market
- Inspired by leading international property platforms
- Designed for trust, transparency, and connection

---

**CLICK Real Estate Connectors** — *You know what you want. CLICK helps you find it.*
