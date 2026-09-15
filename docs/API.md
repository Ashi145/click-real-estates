# CLICK API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication via JWT token in the Authorization header.

## Endpoints

### Properties

#### GET /api/properties
List properties with filters.

**Query Parameters:**
- `q` (string): Search query
- `type` (string): Listing type (SALE, RENT, LEASE)
- `category` (string): Property type
- `district` (string): District filter
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `bedrooms` (number): Minimum bedrooms
- `page` (number): Page number
- `limit` (number): Items per page
- `sort` (string): Sort order (newest, price-asc, price-desc, popular)

**Response:**
```json
{
  "properties": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

#### POST /api/properties
Create a new property (requires authentication).

**Request Body:**
```json
{
  "title": "Property Title",
  "description": "Description",
  "propertyType": "HOUSE",
  "listingType": "SALE",
  "price": 500000000,
  "latitude": 0.3476,
  "longitude": 32.5825,
  "district": "Kampala",
  "bedrooms": 3,
  "bathrooms": 2
}
```

### Providers

#### GET /api/providers
List providers with filters.

**Query Parameters:**
- `q` (string): Search query
- `type` (string): Provider type
- `district` (string): District filter
- `verified` (boolean): Verified only
- `page` (number): Page number
- `limit` (number): Items per page

### Contact

#### POST /api/contact
Submit an inquiry for a property.

**Request Body:**
```json
{
  "propertyId": "property-id",
  "buyerId": "buyer-id",
  "message": "I'm interested in this property",
  "contactName": "John Doe",
  "contactEmail": "john@email.com",
  "contactPhone": "+256700000000"
}
```

### Authentication

#### POST /api/auth/[...nextauth]
NextAuth.js authentication endpoints.

**Credentials Login:**
```json
{
  "email": "user@email.com",
  "password": "password"
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error message",
  "details": {} // Optional additional details
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
