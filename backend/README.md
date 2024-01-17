Node Express MongoDB API:
This is a simple Node.js API built using Express and MongoDB for user registration, login, and product management. It also includes Swagger documentation for easy API reference.

Features:
User Registration and Login: 
Endpoints for user registration and login with JWT authentication.

Product Management: 
CRUD operations for managing products.
Swagger Documentation: 
Swagger UI for easy API documentation access at /api-docs.

Technologies Used:
Node.js: 
JavaScript runtime for server-side development.
Express.js: 
Web application framework for Node.js.
MongoDB: 
NoSQL database for storing user and product data.
JWT: 
JSON Web Token for user authentication.
Swagger: 
API documentation using Swagger UI.

API Endpoints
POST /register: User registration with JWT token generation.
POST /login: User login with JWT token generation.
POST /addProduct: Add a new product.
GET /products: Get all products.
DELETE /delete/:id: Delete a product by ID.
GET /update/:id: Get product details by ID.
PUT /updateProduct/:id: Update product details by ID.
GET /search/:key: Search products by keyword.

Contributing
Feel free to contribute to the development of this project.