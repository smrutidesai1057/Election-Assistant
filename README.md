<div align="center">

# 🗳️ Election Guide India

### *Empowering Every Vote. Informing Every Citizen.*

> A full-stack civic-tech platform that educates Indian citizens about their electoral system using modern AI, interactive tools, and real-time data.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-Pro-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-FF9933?style=for-the-badge)](LICENSE)

<br/>

![Election Guide India Banner](https://via.placeholder.com/900x300/FF9933/FFFFFF?text=Election+Guide+India+—+Screenshot+Placeholder)

</div>

---

## 📖 Introduction

**Election Guide India** is a neutral, open-source civic-technology platform built to bridge the information gap between Indian voters and their democratic rights. In a nation of over 900 million eligible voters, access to accurate, unbiased, and accessible electoral information is not a privilege — it is a necessity.

This platform combines the power of **Generative AI**, **interactive visualizations**, and **gamified learning** to make the Indian electoral process approachable for every citizen — from first-time voters to seasoned participants. Whether you want to understand constitutional provisions, check your voter readiness, or simulate the voting process, Election Guide India has you covered.

> **Project Vision:** To empower voters with neutral, accurate, and actionable information using modern AI and interactive tools.

---

## ✨ Key Features

- 🤖 **ElectBot India** — An AI-powered conversational assistant powered by the **Gemini Pro API**. Ask anything about constitutional laws, ECI procedures, Model Code of Conduct, political history, or your fundamental voting rights — and get clear, neutral answers instantly.

- 📅 **Interactive Timelines** — A beautifully designed visual guide to upcoming election schedules and important historical milestones in Indian democracy, from Independence to the present day.

- ✅ **Voter Readiness Checklist** — A personalized, step-by-step checklist to help citizens prepare before election day — covering voter ID verification, booth locator, required documents, and more.

- 🔔 **State-wise Alerts** — Real-time, location-aware notifications and updates tailored to your specific Indian state — including polling dates, candidate lists, and ECI announcements.

- 🧠 **Quiz System** — A gamified civic knowledge quiz engine that makes learning about the Indian Constitution, election laws, and political geography fun and engaging.

- 🗳️ **Mock Election Simulator** — A fully interactive simulation of the Indian voting process, designed to familiarize first-time voters with EVMs, NOTA, and the step-by-step booth experience.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | [Next.js 15](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) |
| **AI / LLM** | [Google Generative AI — Gemini Pro](https://ai.google.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Package Manager** | npm |

---

## 🚀 Getting Started

Follow these steps to set up and run **Election Guide India** on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `v18.0.0` or higher — [Download Node.js](https://nodejs.org/)
- **PostgreSQL** `v14` or higher — [Download PostgreSQL](https://www.postgresql.org/download/)
- A **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/election-guide-india.git
cd election-guide-india
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```env
# PostgreSQL Database Connection
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/election_guide_db"

# Google Generative AI (Gemini Pro)
GOOGLE_GENAI_API_KEY="your_gemini_api_key_here"

# NextAuth.js
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

> [!NOTE]
> You can generate a secure `NEXTAUTH_SECRET` by running `openssl rand -base64 32` in your terminal.

### 4. Set Up the Database

Push the Prisma schema to your PostgreSQL database:

```bash
npx prisma db push
```

Optionally, seed the database with initial data:

```bash
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running. 🎉

---

## 📁 Project Structure

A high-level overview of the key directories in this project:

```
election-guide-india/
│
├── app/                        # Next.js 15 App Router
│   ├── (auth)/                 # Authentication routes (login, register)
│   ├── api/                    # API route handlers
│   │   ├── auth/               # NextAuth.js endpoints
│   │   └── electbot/           # ElectBot AI chat API
│   ├── dashboard/              # Main user dashboard
│   ├── quiz/                   # Quiz system pages
│   ├── simulator/              # Mock Election Simulator
│   ├── timeline/               # Interactive Timelines
│   └── layout.tsx              # Root layout
│
├── components/                 # Reusable UI components
│   ├── ElectBot/               # AI Chat assistant component
│   ├── Timeline/               # Timeline visualization components
│   ├── Checklist/              # Voter Readiness Checklist
│   ├── Alerts/                 # State-wise Alerts components
│   └── ui/                     # Shared UI primitives (buttons, cards, etc.)
│
├── lib/                        # Utility functions and configuration
│   ├── prisma.ts               # Prisma client instance
│   ├── gemini.ts               # Google Generative AI client setup
│   ├── auth.ts                 # NextAuth.js configuration
│   └── utils.ts                # General helper functions
│
├── prisma/
│   └── schema.prisma           # Database schema definition
│
├── public/                     # Static assets (images, icons)
├── .env.local                  # Local environment variables (do not commit)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 📸 Screenshots

> Replace the placeholder URLs below with actual screenshots from your deployed application.

**Home Page**
![Home Page](https://via.placeholder.com/900x500/FF9933/FFFFFF?text=Home+Page+Screenshot)

**ElectBot India — AI Chat**
![ElectBot India](https://via.placeholder.com/900x500/138808/FFFFFF?text=ElectBot+Chat+Screenshot)

**Interactive Timeline**
![Interactive Timeline](https://via.placeholder.com/900x500/000080/FFFFFF?text=Timeline+Screenshot)

**Voter Readiness Checklist**
![Voter Readiness Checklist](https://via.placeholder.com/900x500/FF9933/FFFFFF?text=Checklist+Screenshot)

**Quiz System**
![Quiz System](https://via.placeholder.com/900x500/138808/FFFFFF?text=Quiz+Screenshot)

**Mock Election Simulator**
![Mock Election Simulator](https://via.placeholder.com/900x500/000080/FFFFFF?text=Simulator+Screenshot)

---

## 🤝 Contributing

Contributions are welcome and appreciated! This is a civic-tech project aimed at public good.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

> [!IMPORTANT]
> Please ensure all contributions remain **politically neutral** and aligned with the project's mission of unbiased civic education.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Election Guide India Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**Built with ❤️ for Indian Democracy**

* जय हिन्द *

</div>
