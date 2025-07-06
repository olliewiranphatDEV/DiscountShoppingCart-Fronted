# Information Creator
Fullname : Wiranphat Pattaramool (Ollie)

# Test Account
Email : discount.shoppingcart@mail.com
Password : test101

---------------

# Discount Shopping Cart

A full-stack web application for a simple shopping cart system with user authentication, discount logic, and cart management.

---
## 📦 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Zustand (Global State Management)
- Axios
- SweetAlert2
- Framer-Motion

### Backend
- Node.js
- Express.js
- Prisma (ORM)
- JsonWebToken (JWT)
- BcryptJS

### Deploy Live Demo
- Frontend : Vercel
- Backend : Render
- Cloud Database : NeonDB - PostgreSQL

---
## Features

### Authentication
- Signup with email or phone
- Signin with identity (email or phone) + password
- Token-based authentication (JWT) + Hash password (BcryptJS)
- User session stored in Zustand

### Shopping Cart
- Add to cart
- View current cart
- Dynamic cart count
- Clear cart on signout

### Discount System
- Product discount logic
- Fetch available discounts from server
- Calculate total after discount
- Display discount tags in product cards

### Protected Routes
- Users must be signed in to access cart and checkout
