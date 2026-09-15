# CLICK Database Schema

## Overview

The database uses Prisma ORM with SQLite for development and PostgreSQL for production.

## Core Models

### User
- Authentication and user profiles
- Roles: BUYER, OWNER, BROKER, AGENT, AGENCY, COMPANY, DEVELOPER, LANDLORD, PROPERTY_MANAGER, ADMIN, SUPER_ADMIN

### Provider
- Business profiles for property providers
- Verification status: PENDING, UNDER_REVIEW, VERIFIED, REJECTED, SUSPENDED
- Linked to User model

### Property
- Property listings with full details
- Status: DRAFT, PENDING, ACTIVE, SOLD, RENTED, EXPIRED, SUSPENDED, ARCHIVED
- Linked to Provider model

### Inquiry
- Buyer-to-provider connections
- Status: NEW, CONTACTED, VIEWING, NEGOTIATION, SUCCESSFUL, CLOSED, LOST

### Lead
- Provider lead management
- Generated from inquiries

### Payment
- Transaction records
- Types: CONNECTION_FEE, MARKETING, SUBSCRIPTION, COMMISSION

### Commission
- Commission tracking
- Linked to payments and providers

## Relationships

```
User (1) ─── (1) Provider
Provider (1) ─── (*) Property
Property (1) ─── (*) Inquiry
Inquiry (1) ─── (*) Lead
User (1) ─── (*) Favorite
User (1) ─── (*) SavedSearch
Property (1) ─── (*) PropertyView
```

## Indexes

Key indexes for performance:
- Property: status, listingType, propertyType, price, district
- Provider: providerType, verificationStatus, district
- User: email, role
- Inquiry: status, providerId

## Migrations

Run migrations with:
```bash
npx prisma db push    # Development
npx prisma migrate dev # Create migration
```
