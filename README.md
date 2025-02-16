# CaseGO Frontend 🎮

This is the frontend for **CaseGO**, a React-based web application built with **Vite**, **TypeScript**, **TailwindCSS**, and **React Router**.

## 🚀 Getting Started

I have no idea why but if you wanna set up it follow the steps below.

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** (must have) – [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (you know)

### 📥 Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/qliquiz/casego
   cd casego
   ```

2. **Install dependencies**

   Using **npm**:

   ```sh
   npm install
   ```

   Or with **yarn**:

   ```sh
   yarn install
   ```

### 🏃 Running the Project

To start the development server:

```sh
npm run dev
```

This will start the **Vite** development server. Open [**http://localhost:5173/**](http://localhost:5173/) in your browser.

### 🎨 TailwindCSS Setup

TailwindCSS is already configured, but if needed (I don't recommend it), you can reinitialize it:

```sh
npx tailwindcss init -p
```

Ensure your **tailwind.config.js** is correctly set up:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 🔧 Available Scripts

- `dev` – Start the development server
- `build` – Build the project for production
- `preview` – Preview the production build
- `lint` – Run ESLint to check for issues

### 🌍 Environment Variables

Create a `.env` file in the root directory and configure environment variables:

```env
VITE_IS_PRODUCTION=false
VITE_API_URL=https://your-api-url.com
VITE_HOST_URL=https://your-host-url.com
```

Use it in your code:

```ts
const API_URL = import.meta.env.API_URL;
```

### 📂 Project Structure

```
casego
├── public                 # Static assets that are served as-is
│   ├── fonts              # Font files used in the project
│   ├── icons              # Static icons for the UI
│   └── images             # Static images used in the application
├── src                    # Main source code of the application
│   ├── app                # Core application logic and structure
│   │   ├── components     # Reusable UI components
│   │   ├── contexts       # React Context API providers for global state management
│   │   ├── hooks          # Custom React hooks for shared logic
│   │   ├── pages          # Page components that define different routes
│   │   ├── routes         # Routing configuration for the application
│   │   ├── services       # API calls, data fetching, and external service interactions
│   │   ├── stores         # State management (e.g., Zustand, Redux, or MobX)
│   │   ├── types          # TypeScript types and interfaces for the project
│   │   └── utils          # Utility functions and helper methods
│   ├── assets             # Project assets used within components
│   │   ├── fonts          # Font files imported into the application
│   │   ├── icons          # Icon assets used dynamically in components
│   │   └── images         # Image assets used dynamically in components
│   ├── configs            # Configuration files for different environments and settings
│   ├── styles             # Global styles and Tailwind CSS imports
│   │   ├── App.css        # Styles specific to the App component
│   │   └── index.css      # Global styles and Tailwind configuration
│   ├── App.tsx            # Root component of the React application
│   ├── main.tsx           # Entry point for the React application
│   ├── vite-env.d.ts      # TypeScript declaration file for Vite
│   └── weapons.json       # JSON data file, possibly for in-app items or game data
├── .env                   # Environment variables file for storing sensitive data (e.g., API keys)
├── .gitignore             # Specifies files and directories to ignore in Git version control
├── .prettierrc.js         # Configuration file for Prettier code formatting rules
├── eslint.config.js       # ESLint configuration for enforcing coding standards and best practices
├── index.html             # Main HTML file that serves as the root entry point for the app
├── package-lock.json      # Auto-generated file that locks dependencies' versions for consistency
├── package.json           # Project metadata and dependencies configuration
├── postcss.config.js      # Configuration file for PostCSS, used for processing CSS
├── README.md              # Documentation file with project details, setup instructions, and usage guidelines
├── tailwind.config.js     # Tailwind CSS configuration file
├── tsconfig.app.json      # TypeScript configuration specific to the application
├── tsconfig.json          # Main TypeScript configuration file
├── tsconfig.node.json     # TypeScript configuration for Node-related scripts
└── vite.config.ts         # Vite configuration file for project setup and optimizations
```

### 🤝 Contributing

If you want to contribute, feel free to fork the repository and submit a pull request.

### 📄 License

This project is licensed under the **MIT License**.
