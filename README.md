# AutoVIT - Robotics & Automation Club Website

Where Technology Meets Innovation. This is the official website for AutoVIT, a premier club dedicated to shaping the future of robotics and automation.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=flat-square&logo=firebase)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel)

---

## 🚀 Features

- **Modern UI/UX**: A sleek, responsive design built with Tailwind CSS and inspired by high-tech aesthetics.
- **Interactive Backgrounds**: Engaging particle effects using `@tsparticles/react`.
- **Dynamic Content**:
  - **Events**: Real-time event updates managed via Firebase Realtime Database.
  - **Team**: Leadership team display with Swiper.js carousels.
- **Recruitment System**: Custom recruitment form with direct submission to Firebase.
- **Admin Dashboard**:
  - Secure authentication via Firebase Auth.
  - Management tools for Events, Team Members, and Recruitment Applications.
  - CSV export for recruitment data.
- **Performance Optimized**: Built on Next.js 14 with optimized image loading and font management.

---

## 🛠 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React 18](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database**: [Firebase](https://firebase.google.com/) (Authentication, Realtime Database, Firestore)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Swiper.js](https://swiperjs.com/), [tsParticles](https://particles.js.org/)

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- A Firebase Project

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/autovit-website.git
   cd autovit-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add your Firebase credentials (refer to `.env.local.example`):
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router pages (Home, Admin, Recruit)
├── components/     # UI Components (Admin, Home, Layout, etc.)
├── hooks/          # Custom React hooks (useAuth)
├── lib/            # Firebase configuration and utility functions
└── public/         # Static assets (images, logos)
```

---

## 🚢 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Configure the Environment Variables in the Vercel project settings.
4. Deploy!

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
