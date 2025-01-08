# Restaurant Management System

A comprehensive API for managing restaurants, including menu items, tables, orders, and customer interactions.

## Features

### 1. Restaurant Management
- Create and manage restaurants
- Update restaurant details and operating hours
- Track restaurant status (open/closed)

### 2. Menu Management
- Create, update, and delete menu items
- Categorize menu items
- Set prices and item details
- Track vegetarian options and spice levels

### 3. Table Management
- Create and manage tables
- Track table status (available/occupied/reserved)
- Set table capacity
- Generate QR codes for each table

### 4. Order Management
- Process customer orders
- Track order status (pending/preparing/served)
- Calculate order totals
- Handle special instructions

### 5. Customer Interaction
- Scan table QR codes to view menu
- Place orders directly from mobile devices
- Track order status in real-time
- View estimated preparation time

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. Access the API documentation:
   ```
   http://localhost:3000/api-docs
   ```

## API Documentation

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Role-Based Access
- Owner: Full access to restaurant management
- Staff: Access to orders and table management
- Kitchen: Access to order management

### Main Endpoints

#### Authentication
- POST `/auth/login` - User login
- POST `/auth/register` - User registration

#### Restaurant Management
- POST `/restaurants` - Create restaurant
- PUT `/restaurants/:restaurantId` - Update restaurant
- GET `/restaurants` - List restaurants
- GET `/restaurants/:restaurantId` - Get restaurant details

#### Menu Management
- POST `/menu/:restaurantId/items` - Create menu item
- PUT `/menu/:restaurantId/items/:itemId` - Update menu item
- DELETE `/menu/:restaurantId/items/:itemId` - Delete menu item
- GET `/menu/:restaurantId/items` - List menu items
- GET `/menu/:restaurantId/items/:itemId` - Get menu item details

#### Table Management
- POST `/tables/:restaurantId` - Create table
- PATCH `/tables/:restaurantId/tables/:tableId/status` - Update table status
- GET `/tables/:restaurantId/tables` - List tables
- GET `/tables/:restaurantId/tables/:tableId` - Get table details

#### Order Management
- POST `/orders/:restaurantId` - Create order
- PATCH `/orders/:restaurantId/orders/:orderId/status` - Update order status
- GET `/orders/:restaurantId/orders` - List orders
- GET `/orders/:restaurantId/orders/:orderId` - Get order details

#### Customer Endpoints
- GET `/tables/:restaurantId/tables/:tableId/menu` - Get menu via QR code
- POST `/orders/:restaurantId/customer` - Place customer order
- GET `/orders/:restaurantId/customer/:orderId/status` - Check order status

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

Error responses include a message:
```json
{
  "error": "Error message here"
}
```

## Development

1. Run in development mode:
   ```bash
   npm run dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Security

- JWT-based authentication
- Role-based access control
- Input validation
- MongoDB injection prevention
- Rate limiting