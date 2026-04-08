# Warehouse Package Management System

A complete full-stack application for managing warehouse packages with capacity constraints.

## Project Structure

```
Assignment/
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── constants/    # Configuration constants
│   │   └── middleware/   # Custom middleware
│   ├── server.js         # Express server
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.jsx
│   │   └── App.css
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── .github/
    └── copilot-instructions.md
```

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
```

4. Edit `.env` with MongoDB URI:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/warehouse
NODE_ENV=development
```

5. Start development server:
```bash
npm run dev
```

Server runs on: **http://localhost:5000**

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start React app:
```bash
npm start
```

App runs on: **http://localhost:3000**

## Features

### Backend
- ✅ Express.js REST API
- ✅ MongoDB with Mongoose
- ✅ Package CRUD operations
- ✅ Capacity management (SMALL: 5, MEDIUM: 3, LARGE: 2)
- ✅ Size-based filtering and validation
- ✅ Tracking number lookup
- ✅ Complete error handling
- ✅ CORS enabled

### Frontend
- ✅ React with functional components
- ✅ JSX components
- ✅ Axios for API calls
- ✅ Color-coded package cards (Green/Orange/Red)
- ✅ Real-time capacity display
- ✅ Success/error alerts
- ✅ Responsive design
- ✅ Form validation

## API Endpoints

### Health Check
- `GET /api/health`

### Packages
- `GET /api/packages` - List all packages
- `GET /api/packages/capacity` - Get capacity status
- `GET /api/packages/:id` - Get package by ID
- `GET /api/packages/track/:trackingNumber` - Track package
- `POST /api/packages` - Create package
- `POST /api/packages/add` - Add package (with capacity check)
- `PATCH /api/packages/:id` - Update package
- `PUT /api/packages/:id/status` - Update status
- `DELETE /api/packages/:id` - Delete package
- `DELETE /api/packages/remove/:id` - Remove package

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Middleware**: CORS, body-parser
- **Dev Tool**: Nodemon

### Frontend
- **Library**: React 18
- **Language**: JSX
- **HTTP Client**: Axios
- **Styling**: CSS3
- **Build Tool**: Create React App

## Project Features

### Package Sizes & Capacity
- SMALL: 5 slots (Green badge)
- MEDIUM: 3 slots (Orange badge)
- LARGE: 2 slots (Red badge)

### Package Status
- pending
- in-transit
- delivered
- returned
- lost

### Error Handling
- Network error detection
- HTTP status-specific messages
- Validation errors
- Capacity exceeded alerts
- Auto-dismissing notifications

## Development Notes

### Backend
- All backend code is in the `backend/` folder
- MongoDB connection in `backend/server.js`
- Models in `backend/src/models/`
- Routes in `backend/src/routes/`
- Constants in `backend/src/constants/`

### Frontend
- All frontend code is in the `client/` folder
- React components in `client/src/components/`
- API URL: `http://localhost:5000/api/packages`
- Uses proxy in package.json for API calls

## Running Both Servers

In separate terminals:

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

## Documentation

- Backend docs: [backend/README.md](backend/README.md)
- Frontend docs: [client/README.md](client/README.md)
- Setup instructions: [.github/copilot-instructions.md](.github/copilot-instructions.md)

## License

MIT

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
  "dimensions": {
    "length": 30,
    "width": 20,
    "height": 15,
    "unit": "cm"
  },
  "content": "Electronics"
}
```

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

## Project Structure

```
warehouse-package-system/
├── server.js                 # Main server file
├── package.json              # Project dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── src/
    ├── models/
    │   └── Package.js        # Mongoose Package schema
    ├── routes/
    │   └── packages.js       # Package routes
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
  content: String,
  status: String (pending | in-transit | delivered | returned | lost),
  createdAt: Date,
  updatedAt: Date,
  deliveredAt: Date
}
```

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

## Development

To add more features:

1. Create models in `src/models/`
2. Create routes in `src/routes/`
3. Add middleware in `src/middleware/`
4. Import routes in `server.js`

## License

MIT
