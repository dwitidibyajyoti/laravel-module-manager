# Laravel + Inertia.js Starter

This is a Laravel + Inertia.js project using Vue/React (choose one) for building modern single-page apps (SPA) without the complexity of a full frontend framework.

## 🚀 Tech Stack

- Laravel 10+
- Inertia.js
- Vue 3 / React (pick one)
- Vite
- Tailwind CSS (optional)

---

## 🧰 Requirements

- PHP 8.1+
- Composer
- Node.js (16+ recommended)
- NPM or Yarn
- MySQL/PostgreSQL
- Laravel CLI

---

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/dwitidibyajyoti/laravel-module-manager.git
cd laravel-module-manager

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy .env and configure
cp .env.example .env
php artisan key:generate

# Set up database config in .env
# Then run:
php artisan migrate

# Run dev server
npm run dev
php artisan serve
