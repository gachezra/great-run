# 🏁 The Great Run: The Official Website & Admin Hub

Welcome to the digital headquarters for **The Great Run**! This is the official home for "Petrol Heads with a Cause," a premier charity driving event that blends the thrill of the open road with a passion for giving back.

This repository contains the full source code for the Next.js-powered website and its integrated content management system. It's designed from the ground up to deliver a stunning, high-performance experience for participants, sponsors, and the entire community.

## ✨ Features

### Public-Facing Website:

- **Dynamic Event 'Editions':** Each run is showcased as a rich, blog-style "Edition," featuring event stories, fundraising achievements, and stunning photo galleries.
- **Automated Photo Gallery:** The main gallery is intelligently populated from images uploaded to each Edition, creating a vibrant and ever-growing visual history of the events with zero extra work.
- **Modern, Animated UI:** A visually engaging interface built with a **Glassmorphism** aesthetic. The user experience is enhanced with fluid animations powered by **Framer Motion**, scroll-based effects from **GSAP**, and engaging **Lottie** animations.
- **Prominent Sponsor Showcase:** We proudly feature our sponsors with their logos and links, giving them the recognition they deserve for fueling our cause.
- **Fully Responsive:** Built with Tailwind CSS, the site delivers a seamless experience on any device, from mobile phones to desktop monitors.

### 🚀 Admin Dashboard (The Cockpit):

- **Intuitive Content Management:** A secure and user-friendly admin dashboard allows the team to manage the entire website's content without writing a single line of code.
- **Effortless Management:** Easily **add** new runs, **update** event details, **upload** photo galleries, and **manage** sponsor logos in just a few clicks.
- **Secure Authentication:** The dashboard is protected by Supabase Auth, ensuring only authorized team members can manage content.

## 🛠️ Tech Stack

This project is built on a modern and powerful stack, designed for performance, scalability, and an exceptional developer experience.

- **Framework:** Next.js
- **Language:** TypeScript
- **Backend & Database:** Supabase (Postgres, Auth, and Storage)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Animations:** Framer Motion, GSAP, Lottie

## 🚀 Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/the-great-run.git
    ```

2.  **Install Dependencies:**

    ```bash
    cd the-great-run
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env.local` file in the root of your project and add your Supabase project credentials. You can find these in your Supabase project's dashboard under `Settings > API`.

    ```
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

We welcome contributions from the community! If you have ideas for new features, bug fixes, or improvements, please feel free to open an issue or submit a pull request.
