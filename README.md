# MD MAHFUZUL HAQUE - Portfolio Website

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. This portfolio showcases my skills, projects, and professional experience as a Web Developer and Computer Science Technology student at Mymensingh Polytechnic Institute.

## 🌟 Features

- **Modern Design**: Glassmorphism UI with smooth animations and transitions
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes with smooth transitions
- **Interactive Elements**:
  - Animated technology marquee showcasing tech stack
  - Smooth scrolling with Lenis
  - Custom cursor with hover effects
  - GSAP animations for scroll-triggered effects
- **Project Showcase**: Dynamic project pages with detailed information
- **Contact Form**: Functional contact form with Web3Forms integration
- **SEO Optimized**: Comprehensive metadata and semantic HTML

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Fonts**: Space Grotesk & Manrope from Google Fonts
- **Icons**: Lucide React & Skill Icons

### Animations & Interactions

- **GSAP**: Professional scroll animations and transitions
- **Framer Motion**: UI animations and micro-interactions
- **Lenis**: Smooth scrolling experience
- **CSS Animations**: Custom keyframes for marquee effects

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript with strict mode

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and animations
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Homepage
│   │   ├── not-found.tsx        # 404 error page
│   │   └── projects/[id]/       # Dynamic project pages
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation with theme toggle
│   │   ├── Hero.tsx             # Hero section with animations
│   │   ├── About.tsx            # About section
│   │   ├── Skills.tsx           # Skills with marquee animation
│   │   ├── Technologies.tsx      # Technologies marquee section
│   │   ├── Projects.tsx         # Projects showcase with buttons
│   │   ├── Qualifications.tsx   # Education & experience
│   │   ├── Contact.tsx          # Contact form with toast
│   │   ├── Footer.tsx           # Footer with social links
│   │   ├── ThemeProvider.tsx    # Theme context provider
│   │   ├── SmoothScroll.tsx     # Smooth scrolling wrapper
│   │   ├── CustomCursor.tsx     # Custom cursor component
│   │   └── Toast.tsx          # Toast notifications
│   └── data/
│       └── projects.ts          # Projects data
├── public/
│   ├── images/                  # Image assets
│   │   ├── my-photo.jpg      # Profile picture
│   │   ├── keen-keeper.png   # KeenKeeper project
│   │   ├── DigiTools.png     # Digi Tools project
│   │   ├── Book-vibe.png     # Bookvibe project
│   │   ├── quebani-hut.png  # Qurbani Hut project
│   │   ├── dragon-news.png    # Dragon News project
│   │   └── bpl-dream-11.png # BPL Dream 11 project
│   └── resume.pdf              # Downloadable resume
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my-portfolio
```

1. Install dependencies:

```bash
npm install
```

1. Run the development server:

```bash
npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Personal Information

Update the following files with your information:

- **Personal Details**: `src/components/Hero.tsx`, `src/components/Contact.tsx`, `src/components/Footer.tsx`
- **Education**: `src/components/Qualifications.tsx`
- **Projects**: `src/data/projects.ts`
- **Metadata**: `src/app/layout.tsx`

### Styling

- **Colors**: Modify CSS variables in `src/app/globals.css`
- **Fonts**: Update font imports in `src/app/layout.tsx`
- **Animations**: Adjust keyframes and transitions in CSS

### Images

- **Profile Photo**: Add your photo to `public/images/my-photo.jpg`
- **Project Images**: Add project screenshots to `public/images/projects/`
- **Resume**: Update `public/resume.pdf` with your resume

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration Files

- **Next.js**: `next.config.mjs` - Image optimization and remote patterns
- **TypeScript**: `tsconfig.json` - Strict type checking and path aliases
- **Tailwind**: `tailwind.config.js` - Custom design system
- **PostCSS**: `postcss.config.mjs` - CSS processing

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run start
```

## 📧 Contact

- **Name**: MD MAHFUZUL HAQUE
- **Email**: <mdmahfuzulhaque3140@gmail.com>
- **Phone**: +8801956016119
- **LinkedIn**: [msmahfuz3140](https://www.linkedin.com/in/msmahfuz3140)
- **GitHub**: [msmahfuz3140](https://github.com/msmahfuz3140)
- **Instagram**: [msmahfuz3140](https://www.instagram.com/msmahfuz3140)
- **Facebook**: [msmahfuz3140](https://www.facebook.com/msmahfuz3140)

## 🚀 Featured Projects

### 1. KeenKeeper

- **Type**: Social Management Platform
- **Description**: Comprehensive friend hub and relationship management platform with friend tracking, activity logging, and reminders
- **Tech Stack**: React.js, Node.js, MongoDB, Express.js, GSAP
- **Live Demo**: [https://keen-keeper-wine.vercel.app/](https://keen-keeper-wine.vercel.app/)
- **GitHub**: [https://github.com/msmahfuz3140/Keen_Keeper](https://github.com/msmahfuz3140/Keen_Keeper)

### 2. Digi Tools

- **Type**: Digital Marketplace
- **Description**: One-stop-shop for digital creators with AI tool subscriptions and premium stock assets
- **Tech Stack**: Next.js, Stripe, MongoDB, Tailwind CSS, Framer Motion
- **Live Demo**: [https://digitools-by-sk.netlify.app/](https://digitools-by-sk.netlify.app/)
- **GitHub**: [https://github.com/shuvr0shishir/DigiTools](https://github.com/shuvr0shishir/DigiTools)

### 3. Bookvibe

- **Type**: Social Platform for Book Lovers
- **Description**: Community-driven platform for bibliophiles with reading progress tracking and book reviews
- **Tech Stack**: React.js, Firebase, Context API, Tailwind CSS
- **Live Demo**: [https://real-book-vibe.netlify.app/](https://real-book-vibe.netlify.app/)
- **GitHub**: [https://github.com/msmahfuz3140/Book-Vibe-Project](https://github.com/msmahfuz3140/Book-Vibe-Project)

### 4. Qurbani Hut

- **Type**: Online Marketplace
- **Description**: Modern marketplace for buying and selling Qurbani animals connecting farmers directly with buyers
- **Tech Stack**: Next.js, React.js, Tailwind CSS, Node.js, MongoDB, REST API
- **Live Demo**: [https://qurbani-hut-mocha.vercel.app/](https://qurbani-hut-mocha.vercel.app/)
- **GitHub**: [https://github.com/msmahfuz3140/QurbaniHat-Project](https://github.com/msmahfuz3140/QurbaniHat-Project)

### 5. Dragon News

- **Type**: News Portal
- **Description**: Modern news portal with category-based browsing and detailed articles
- **Tech Stack**: Next.js, React.js, Tailwind CSS, Firebase Authentication, REST API
- **Live Demo**: [https://dragon-news-ms.vercel.app/](https://dragon-news-ms.vercel.app/)
- **GitHub**: [https://github.com/msmahfuz3140/Dragon-news](https://github.com/msmahfuz3140/Dragon-news)

### 6. BPL Dream 11

- **Type**: Fantasy Cricket Game
- **Description**: Fantasy cricket team builder for Bangladesh Premier League with player selection and team management
- **Tech Stack**: React.js, JavaScript (ES6), Tailwind CSS, Context API, REST API
- **Live Demo**: [https://bpl-dream-11-webp.netlify.app/](https://bpl-dream-11-webp.netlify.app/)
- **GitHub**: [https://github.com/msmahfuz3140/BPL-Dream-11](https://github.com/msmahfuz3140/BPL-Dream-11)

## 🎓 Education

**Diploma in Computer Science Technology**  
Mymensingh Polytechnic Institute (2023 - Present)

## 💼 Skills

### Frontend

- React, Next.js, JavaScript, TypeScript
- HTML5, CSS3, Tailwind CSS
- Responsive Design, UI/UX

### Backend

- Node.js, Express.js, MongoDB
- REST APIs, Authentication

### Tools

- Git, VS Code, Figma
- GSAP, Framer Motion

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Based on the game-changer-portfolio design
- Built with modern web technologies
- Icons from [Skill Icons](https://skillicons.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
