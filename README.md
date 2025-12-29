# E-Commerce Frontend Application

A full-featured **E-Commerce Frontend Application** built using **Angular** and **TypeScript**.  
This project simulates a real-world online shopping platform with authentication, product management, basket handling, checkout flow, and order tracking.

The application is designed with scalability and clean architecture in mind, using Angular best practices such as services, guards, interceptors, and modular components.

---

## 🚀 Features

### 🔐 Authentication & User Management
- User Registration
- Login & Logout
- Account Activation
- Forgot & Reset Password
- JWT Authentication
- Route Protection using Auth Guards

### 🛒 Shopping Experience
- Home Page with Featured Products
- Product Listing with Pagination
- Product Details Page
- Shopping Basket (Add / Remove / Update Quantity)
- Checkout Process
- Order Success Page

### 📦 Orders
- View Order History
- Order Details Page
- Delivery Method Selection

### 📄 Informational Pages
- About Us
- Contact Us (Send Messages)
- Responsive Navigation Bar & Footer

### ⚙️ Technical Features
- HTTP Interceptors (Auth & Loader)
- Global Loading Indicator
- Environment-based API Configuration
- Strong Typing using TypeScript Interfaces

---

## 🛠️ Tech Stack

- **Framework:** Angular
- **Language:** TypeScript
- **Styling:** CSS & SCSS
- **Architecture:** Component-Based Architecture
- **Routing:** Angular Router
- **State Handling:** Services & Observables
- **Authentication:** JWT
- **Testing:** Jasmine & Karma

---

## 📂 Project Structure
```
├── 📁 .angular
├── 📁 public
│   └── 📄 favicon.ico
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 Components
│   │   │   ├── 📁 about-us
│   │   │   │   ├── 🎨 about-us.css
│   │   │   │   ├── 🌐 about-us.html
│   │   │   │   ├── 📄 about-us.spec.ts
│   │   │   │   └── 📄 about-us.ts
│   │   │   ├── 📁 active-accoount
│   │   │   │   ├── 🎨 active-accoount.css
│   │   │   │   ├── 🌐 active-accoount.html
│   │   │   │   ├── 📄 active-accoount.spec.ts
│   │   │   │   └── 📄 active-accoount.ts
│   │   │   ├── 📁 basket
│   │   │   │   ├── 🎨 basket.css
│   │   │   │   ├── 🌐 basket.html
│   │   │   │   ├── 📄 basket.spec.ts
│   │   │   │   └── 📄 basket.ts
│   │   │   ├── 📁 checkout
│   │   │   │   ├── 🎨 checkout.css
│   │   │   │   ├── 🌐 checkout.html
│   │   │   │   ├── 📄 checkout.spec.ts
│   │   │   │   └── 📄 checkout.ts
│   │   │   ├── 📁 contact-us
│   │   │   │   ├── 🎨 contact-us.css
│   │   │   │   ├── 🌐 contact-us.html
│   │   │   │   ├── 📄 contact-us.spec.ts
│   │   │   │   └── 📄 contact-us.ts
│   │   │   ├── 📁 footer
│   │   │   │   ├── 🎨 footer.css
│   │   │   │   ├── 🌐 footer.html
│   │   │   │   ├── 📄 footer.spec.ts
│   │   │   │   └── 📄 footer.ts
│   │   │   ├── 📁 forgot-password
│   │   │   │   ├── 🎨 forgot-password.css
│   │   │   │   ├── 🌐 forgot-password.html
│   │   │   │   ├── 📄 forgot-password.spec.ts
│   │   │   │   └── 📄 forgot-password.ts
│   │   │   ├── 📁 hero
│   │   │   │   ├── 🎨 hero.css
│   │   │   │   ├── 🌐 hero.html
│   │   │   │   ├── 📄 hero.spec.ts
│   │   │   │   └── 📄 hero.ts
│   │   │   ├── 📁 home
│   │   │   │   ├── 🎨 home.css
│   │   │   │   ├── 🌐 home.html
│   │   │   │   ├── 📄 home.spec.ts
│   │   │   │   └── 📄 home.ts
│   │   │   ├── 📁 login
│   │   │   │   ├── 🎨 login.css
│   │   │   │   ├── 🌐 login.html
│   │   │   │   ├── 📄 login.spec.ts
│   │   │   │   └── 📄 login.ts
│   │   │   ├── 📁 nav-bar
│   │   │   │   ├── 🎨 nav-bar.css
│   │   │   │   ├── 🌐 nav-bar.html
│   │   │   │   ├── 📄 nav-bar.spec.ts
│   │   │   │   └── 📄 nav-bar.ts
│   │   │   ├── 📁 order-details-component
│   │   │   │   ├── 🎨 order-details-component.css
│   │   │   │   ├── 🌐 order-details-component.html
│   │   │   │   ├── 📄 order-details-component.spec.ts
│   │   │   │   └── 📄 order-details-component.ts
│   │   │   ├── 📁 order-success-component
│   │   │   │   ├── 🎨 order-success-component.css
│   │   │   │   ├── 🌐 order-success-component.html
│   │   │   │   ├── 📄 order-success-component.spec.ts
│   │   │   │   └── 📄 order-success-component.ts
│   │   │   ├── 📁 orders-component
│   │   │   │   ├── 🎨 orders-component.css
│   │   │   │   ├── 🌐 orders-component.html
│   │   │   │   ├── 📄 orders-component.spec.ts
│   │   │   │   └── 📄 orders-component.ts
│   │   │   ├── 📁 pagination
│   │   │   │   ├── 🎨 pagination.css
│   │   │   │   ├── 🌐 pagination.html
│   │   │   │   ├── 📄 pagination.spec.ts
│   │   │   │   └── 📄 pagination.ts
│   │   │   ├── 📁 product
│   │   │   │   ├── 🎨 product.css
│   │   │   │   ├── 🌐 product.html
│   │   │   │   ├── 📄 product.spec.ts
│   │   │   │   └── 📄 product.ts
│   │   │   ├── 📁 product-details
│   │   │   │   ├── 🎨 product-details.css
│   │   │   │   ├── 🌐 product-details.html
│   │   │   │   ├── 📄 product-details.spec.ts
│   │   │   │   └── 📄 product-details.ts
│   │   │   ├── 📁 register
│   │   │   │   ├── 🎨 register.css
│   │   │   │   ├── 🌐 register.html
│   │   │   │   ├── 📄 register.spec.ts
│   │   │   │   └── 📄 register.ts
│   │   │   ├── 📁 reset-password
│   │   │   │   ├── 🎨 reset-password.css
│   │   │   │   ├── 🌐 reset-password.html
│   │   │   │   ├── 📄 reset-password.spec.ts
│   │   │   │   └── 📄 reset-password.ts
│   │   │   └── 📁 shop-item
│   │   │       ├── 🎨 shop-item.css
│   │   │       ├── 🌐 shop-item.html
│   │   │       ├── 📄 shop-item.spec.ts
│   │   │       └── 📄 shop-item.ts
│   │   ├── 📁 Environments
│   │   │   └── 📄 environment.ts
│   │   ├── 📁 Guards
│   │   │   ├── 📄 auth-guard-guard.spec.ts
│   │   │   └── 📄 auth-guard-guard.ts
│   │   ├── 📁 Interface
│   │   │   ├── 📄 ProductParams.ts
│   │   │   ├── 📄 iactiveAcount.ts
│   │   │   ├── 📄 iaddress.ts
│   │   │   ├── 📄 ibasket.ts
│   │   │   ├── 📄 icategory.ts
│   │   │   ├── 📄 icontectMeggase.ts
│   │   │   ├── 📄 idelivaryMethod.ts
│   │   │   ├── 📄 iorder.ts
│   │   │   ├── 📄 ipagination.ts
│   │   │   ├── 📄 iphoto.ts
│   │   │   └── 📄 iproduct.ts
│   │   ├── 📁 Services
│   │   │   ├── 📁 Auth
│   │   │   │   ├── 📄 auth-service.spec.ts
│   │   │   │   └── 📄 auth-service.ts
│   │   │   ├── 📁 Basket
│   │   │   │   ├── 📄 basket-service.spec.ts
│   │   │   │   └── 📄 basket-service.ts
│   │   │   ├── 📁 Category
│   │   │   │   ├── 📄 category.spec.ts
│   │   │   │   └── 📄 category.ts
│   │   │   ├── 📁 ContactMessage
│   │   │   │   ├── 📄 contact-message.spec.ts
│   │   │   │   └── 📄 contact-message.ts
│   │   │   ├── 📁 DeliveryMethod
│   │   │   │   ├── 📄 delivery-method-service.spec.ts
│   │   │   │   └── 📄 delivery-method-service.ts
│   │   │   ├── 📁 Order
│   │   │   │   ├── 📄 orders-service.spec.ts
│   │   │   │   └── 📄 orders-service.ts
│   │   │   ├── 📁 Product
│   │   │   │   ├── 📄 product-service.spec.ts
│   │   │   │   └── 📄 product-service.ts
│   │   │   └── 📁 loading
│   │   │       ├── 📄 loading.spec.ts
│   │   │       └── 📄 loading.ts
│   │   ├── 📁 interceptor
│   │   │   ├── 📁 AuthInterceptor
│   │   │   │   ├── 📄 auth-interceptor-interceptor.spec.ts
│   │   │   │   └── 📄 auth-interceptor-interceptor.ts
│   │   │   ├── 📄 loader-interceptor.spec.ts
│   │   │   └── 📄 loader-interceptor.ts
│   │   ├── 📄 app.config.ts
│   │   ├── 🎨 app.css
│   │   ├── 🌐 app.html
│   │   ├── 📄 app.routes.ts
│   │   ├── 📄 app.spec.ts
│   │   └── 📄 app.ts
│   ├── 🎨 custom-theme.scss
│   ├── 🌐 index.html
│   ├── 📄 main.ts
│   └── 🎨 styles.css
├── ⚙️ .editorconfig
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ angular.json
├── ⚙️ ignite-ui-cli.json
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
└── ⚙️ tsconfig.spec.json
```


---

## 🧩 Key Modules & Components

### Authentication
- Login
- Register
- Activate Account
- Forgot Password
- Reset Password

### E-Commerce
- Home
- Product
- Product Details
- Basket
- Checkout
- Orders
- Order Details
- Order Success

### Shared
- Navbar
- Footer
- Pagination
- Hero Section
- Loading Component

---

## 🔐 Security

- JWT Token attached automatically via Auth Interceptor
- Secure route access using Auth Guards
- Protected checkout and order pages

---

## 🌐 Environment Configuration

API endpoints and environment variables are defined in:


---

## ▶️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI

### Installation

```bash
npm install
ng serve
http://localhost:4200
ng test

