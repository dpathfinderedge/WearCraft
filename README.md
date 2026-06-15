# WearCraft - E-Commerce Clothing Store

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- 🛍️ Complete product catalog with filtering and search
- 🛒 Shopping cart with real-time updates
- 💳 Secure checkout with PayStack integration
- 🔐 User authentication and protected routes
- 📦 Order history and management
- 📱 Fully responsive design
- ⚡ Fast and optimized performance

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Payment:** PayStack
- **Icons:** Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wearcraft
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create `.env.local` file and add your environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_APP_NAME=WearCraft
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

## 📁 Project Structure

```
wearcraft/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── store/           # Zustand stores
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript types
│   └── data/            # Mock data
├── public/              # Static assets
└── ...config files
```

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Rasheed