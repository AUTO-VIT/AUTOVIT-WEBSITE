# 🤖 AutoVIT — Robotics & Automation Club Website

> The official digital hub for **AutoVIT**, the premier Robotics & Automation student club at **VIT Chennai**. Built with cutting-edge web technologies, featuring a state-of-the-art recruitment portal, a live quiz engine, and a complete admin management system.

---

## 🌟 Overview

**AutoVIT** is a technical club at Vellore Institute of Technology (VIT) Chennai that brings together passionate minds in robotics, industrial automation, AI, and hardware design. This repository hosts their official website: a high-performance, dark-themed, interactive platform designed to showcase the club's domains, team members, and events while automating their annual student recruitment campaigns.

---

## 🚀 Key Features

### 1. **Futuristic landing page**
* **Immersive Design**: A premium dark-theme first design (with support for toggling light/dark themes) using fonts like **Orbitron** and **Rajdhani**.
* **Dynamic Background**: Interactive particle fields powered by `@tsparticles/react`.
* **Slick Animations**: Advanced micro-interactions, page scroll transitions, and layouts powered by `framer-motion`.
* **Key Sections**:
  * **Hero**: A high-impact opening section showcasing the club's motto.
  * **About**: Insights into who AutoVIT is and their mission.
  * **Domains**: Showcases core areas (Robotics, Automation, AI, IoT, Web Dev, Design).
  * **Events**: Showcasing past and upcoming events/workshops.
  * **Team**: Sleek cards introducing the leadership/core team members.
  * **Contact**: Direct communication channel with automatic form validation.

### 2. **Recruitment Management System (`/recruit`)**
* **Step-by-Step Onboarding**: A complete, multi-stage registration wizard for applicants.
* **Form Validation**: Captures academic details, skillsets, project portfolios, and domain preferences.
* **Database Integration**: Directly registers user profiles to Firebase (Firestore / Realtime Database).

### 3. **Interactive Recruitment Quiz (`/quiz`)**
* **Live Assessment**: An online exam dashboard for evaluating candidate aptitudes.
* **Dynamic Content**: Fetches questions directly from Firestore to ensure randomized, up-to-date questions.
* **Progress Tracking**: Automatic response registration and timer capabilities.

### 4. **Unified Admin Panel V2.0 (`/admin`)**
* **Authorized Gate**: Admin login restricted to designated accounts (e.g., `it.autovit22@gmail.com`) using Firebase Authentication.
* **Modular Management Dashboards**:
  * **Recruitments**: View, filter, and sort candidate applications.
  * **Quiz Questions**: Full CRUD capabilities (Create, Read, Update, Delete) to modify live quiz questions.
  * **Events**: Add, edit, or archive club events shown on the homepage.
  * **Leadership Team**: Update active team members, titles, and profile images.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14.2](https://nextjs.org/) (App Router) | Server-side rendering, routing, and fast load times. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type-safety, interface declarations, and static checking. |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Utility-first styling with custom colors and font families. |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & [Swiper](https://swiperjs.com/) | Fluid responsive layouts, transitions, sliders, and touch-carousels. |
| **Background** | [tsParticles](https://particles.js.org/) | Physics-based particle background simulation. |
| **Database & Auth** | [Firebase](https://firebase.google.com/) | Authentication, Cloud Firestore, and Realtime Database integrations. |

---

## 📂 Project Structure

```bash
AUTOVIT-WEBSITE/
├── src/
│   ├── app/                      # Next.js App Router Pages
│   │   ├── admin/                # Admin Panel Entrance (/admin)
│   │   ├── quiz/                 # Recruitment Quiz Module (/quiz)
│   │   ├── recruit/              # Recruitment Application Module (/recruit)
│   │   ├── globals.css           # Global CSS variables & Tailwind imports
│   │   ├── layout.tsx            # Main layout wrapper (Fonts, Providers, Navbar, Cursor)
│   │   └── page.tsx              # Main Landing Page
│   ├── components/               # Reusable React UI Components
│   │   ├── admin/                # Dashboard, Events, Quiz, Team, and Login components
│   │   ├── home/                 # Hero, About, Domains, Events, Team, Contact components
│   │   ├── layout/               # Navbar, Footer, and Custom Cursor
│   │   ├── providers/            # Theme and error boundary listening providers
│   │   └── ParticlesBackground.tsx  # Dynamic particle system configuration
│   ├── hooks/                    # Custom React hooks (e.g., useAuth)
│   └── lib/                      # Firebase init, helpers, and utilities
├── public/                       # Static assets (Images, SVGs, Logos)
├── firebase.json                 # Firebase CLI hosting/rules configurations
├── database.rules.json           # Firebase Realtime Database rules
├── firestore.rules               # Cloud Firestore security rules
├── tailwind.config.ts            # Tailwind custom theme setup (Colors, Fonts, Animations)
└── tsconfig.json                 # TypeScript compiler configurations
```

---

## ⚙️ Development Setup

Follow these steps to run the project locally on your machine.

### 📋 Prerequisites
* Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or above recommended).
* A Firebase account and project set up.

### 1. Clone & Install Dependencies
Navigate to the project root directory and run:
```bash
npm install
```

### 2. Environment Variables Configuration
Create a `.env.local` file in the root directory and specify your Firebase keys:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### 3. Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
To create an optimized production build of the website:
```bash
npm run build
```

---

## 🔒 Firebase Deployments & Security
The repository is equipped with rules configurations for Firebase:
* **Database Rules**: Check [database.rules.json](file:///E:/AUTOVIT-WEBSITE/database.rules.json) for real-time security logic.
* **Firestore Rules**: Check [firestore.rules](file:///E:/AUTOVIT-WEBSITE/firestore.rules) for data rules.
* **Build Hosting**: Configuration is defined in [firebase.json](file:///E:/AUTOVIT-WEBSITE/firebase.json).

---

## 🤝 Contributing
Contributions to the AutoVIT website are welcome! Please create a feature branch, commit changes using clear messages, and open a Pull Request.

---

## 📄 License
This project is private and intended solely for the use of the **AutoVIT Student Chapter** at VIT Chennai. Unauthorized usage or redistribution is restricted.
