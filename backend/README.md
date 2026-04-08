# Warehouse Package System - Backend

A RESTful API for managing warehouse packages using Node.js, Express, and MongoDB.

## Features

- **Package Management**: Create, read, update, and delete packages
- **Package Tracking**: Track packages by tracking number
- **Status Updates**: Update package status through the delivery lifecycle
- **Capacity Management**: Enforce storage limits by package size
- **Pagination**: Built-in pagination support for listing packages
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling middleware
- **MongoDB Integration**: Mongoose for database operations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Configure MongoDB connection in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/warehouse
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Packages

#### Get All Packages
```
GET /api/packages?limit=10&skip=0&status=pending
```
Query Parameters:
- `limit` (default: 10) - Number of packages to return
- `skip` (default: 0) - Number of packages to skip
- `status` - Filter by status (pending, in-transit, delivered, returned, lost)

#### Get Package by ID
```
GET /api/packages/:id
```

#### Get Package by Tracking Number
```
GET /api/packages/track/:trackingNumber
```

#### Get Warehouse Capacity
```
GET /api/packages/capacity
```

Returns capacity status for each size (SMALL, MEDIUM, LARGE)

#### Create Package
```
POST /api/packages
Content-Type: application/json

{
  "trackingNumber": "PKG-2024-001",
  "senderName": "John Sender",
  "senderEmail": "sender@example.com",
  "recipientName": "Jane Recipient",
  "recipientEmail": "recipient@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62701",
    "country": "USA"
  },
  "weight": {
    "value": 2.5,
    "unit": "kg"
  },
  "size": "SMALL",
  "content": "Electronics"
}
```

#### Add Package with Capacity Check
```
POST /api/packages/add
```
Same fields as above but with automatic capacity validation

#### Update Package
```
PATCH /api/packages/:id
Content-Type: application/json

{
  "status": "in-transit"
}
```

#### Update Package Status
```
PUT /api/packages/:id/status
Content-Type: application/json

{
  "status": "delivered"
}
```

#### Delete Package
```
DELETE /api/packages/:id
```

#### Remove Package
```
DELETE /api/packages/remove/:id
```

## Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json              # Project dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── src/
    ├── models/
    │   └── Package.js        # Mongoose Package schema
    ├── routes/
    │   └── packages.js       # Package API routes
    ├── constants/
    │   └── capacity.js       # Capacity configuration
    └── middleware/           # Custom middleware (if needed)
```

## Package Schema

```javascript
{
  trackingNumber: String (unique, indexed),
  senderName: String,
  senderEmail: String,
  recipientName: String,
  recipientEmail: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  weight: {
    value: Number,
    unit: String (kg | lbs)
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: String (cm | inches)
  },
  size: String (SMALL | MEDIUM | LARGE),
  content: String,
  status: String (pending | in-transit | delivered | returned | lost),
  createdAt: Date,
  updatedAt: Date,
  deliveredAt: Date
}
```

## Capacity Configuration

- **SMALL**: 5 packages max
- **MEDIUM**: 3 packages max
- **LARGE**: 2 packages max

## Middleware

- **CORS**: Enabled for all routes
- **JSON Parser**: Automatically parses incoming JSON requests
- **URL Encoded Parser**: Handles form-encoded data
- **Error Handler**: Global error handling middleware
- **404 Handler**: Routes not found handler

## Error Handling

The API returns error responses in the following format:

```json
{
  "error": "Error message",
  "timestamp": "2024-04-08T10:30:00.000Z"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (Capacity exceeded)
- `500` - Internal Server Error

## Development

To add more features:

1. Create models in `src/models/`
2. Create routes in `src/routes/`
3. Add middleware in `src/middleware/`
4. Import routes in `server.js`

## License

MIT
