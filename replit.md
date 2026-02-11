# Prime Cut Timber (PCT)

## Overview
A clone of the Waldo Logs (waldologs.com) forestry platform, rebranded as "Prime Cut Timber" (PCT). The site features digital load ticket management for the forestry industry with a full marketing homepage, phone-based user authentication, user dashboard, company setup wizard, admin login, and multiple sub-pages.

## Recent Changes
- **Feb 11, 2026**: Content & branding update - Redesigned PCT logo (orange icon + stacked text). Added image carousel/slider section before FAQ with 4 platform screenshots, auto-play, and navigation. Awards & Certifications section with 3 generated certificate images. Expanded case studies from 3 to 6 (added Sawmill, Sustainability, Mill categories). Expanded blog articles from 3 to 6. Contact form now saves to DB (contactRequests table) with admin dashboard tab for viewing submissions. Support email support@primecuttimber.com added to footer. Martijn photo replaced avatar on contact page.
- **Feb 11, 2026**: User auth system - Phone-based login/signup flow (phone → code verification → name/DOB registration). User dashboard with sidebar (Settlements, Company, Profile), weather & diesel price cards, notifications, pinned jobs. Profile page with avatar, logout, My Companies, Imperial/Metric preferences. Company setup wizard (3-step: Role → Name → Team). Admin dashboard updated to show all registered users with company details. Hero image replaced with CDN digital-trip-tickets-progress.png.
- **Feb 11, 2026**: Major update - Redesigned dropdown menus (Solutions 4-column mega-menu, Who We Serve with 6 roles, Resources with 5 items). Redesigned Contact page to "Talk with an Expert" layout with Martijn Craig Volman. Updated phone to (407) 813-5384. Redesigned Footer with newsletter signup, social icons, comprehensive link columns. Replaced placeholder images with real CDN product screenshots throughout LogoBar, HowItWorks, and Benefits sections.
- **Feb 11, 2026**: Initial build - Complete homepage with hero, how it works, benefits, integrations, testimonials, FAQ, case studies, blog preview sections. Admin login system with email/password. Sub-pages for Solutions, Who We Serve, Resources. Contact and Pricing pages.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Shadcn UI + Framer Motion
- **Backend**: Express.js + PostgreSQL + Drizzle ORM
- **Auth**: 
  - Admin login with email/password (bcryptjs + express-session)
  - User login with phone number + SMS code verification (simulated in dev, code returned in API response)
  - Replit Auth integration also available
- **Database**: PostgreSQL with admin_users, app_users, companies, team_members, contact_requests, sessions, users tables

## Key Files
- `client/src/pages/Home.tsx` - Main homepage with all sections
- `client/src/pages/Login.tsx` - Admin login page (email/password)
- `client/src/pages/Admin.tsx` - Admin dashboard with registered users table and contact requests tab
- `client/src/pages/UserLogin.tsx` - Phone-based user login (at /app-login)
- `client/src/pages/UserDashboard.tsx` - User dashboard with sidebar (at /dashboard)
- `client/src/pages/UserProfile.tsx` - User profile page (at /dashboard/profile)
- `client/src/pages/CompanySetup.tsx` - Company setup wizard (at /dashboard/company)
- `client/src/pages/GenericPage.tsx` - Dynamic sub-pages for solutions/who-we-serve/resources
- `client/src/components/Header.tsx` - Navigation with dropdown menus
- `client/src/components/Footer.tsx` - Site footer
- `client/src/components/ImageCarouselSection.tsx` - Platform screenshot slider/carousel
- `client/src/components/AwardsSection.tsx` - Awards & certifications display
- `server/routes.ts` - API routes including admin auth, user auth, companies, team
- `server/storage.ts` - Database CRUD operations
- `shared/schema.ts` - Database schema and Zod validation schemas

## Routes
- `/` - Homepage
- `/app-login` - User phone login
- `/dashboard` - User dashboard (requires user auth)
- `/dashboard/profile` - User profile
- `/dashboard/company` - Company setup wizard
- `/login` - Admin login
- `/admin` - Admin dashboard (requires admin auth)
- `/contact` - Contact page
- `/pricing` - Pricing page

## Admin Credentials
- Email: alexdenson231@gmail.com
- Password: Admintimber11

## Design
- Primary color: Orange (#E8632E / hsl 18 85% 55%)
- Font: Montserrat for headings, Open Sans for body
- Dark/Light mode support via CSS variables
- Product images: Real CDN images from Waldo's asset server used for logo bar, how it works, and benefits sections
- Hero image: CDN digital-trip-tickets-progress.png
- Contact expert: Martijn Craig Volman (Supply Chain & Implementation)
- Email: support@primecuttimber.com
- Phone: (407) 813-5384
- Logo: Orange icon square + stacked "PRIME CUT" / "TIMBER" text
- User login: Dark forest background with centered white card (matches Waldo's login)
- Dashboard: Light gray background, left sidebar with orange highlights, card-based layout

## User Preferences
- Wants the site to closely match waldologs.com structure
- Brand name: "Prime Cut Timber" with redesigned professional logo
- User will provide custom graphics later to replace generated hero/testimonial images
