# Prime Cut Timber (PCT)

## Overview
A clone of the Waldo Logs (waldologs.com) forestry platform, rebranded as "Prime Cut Timber" (PCT). The site features digital load ticket management for the forestry industry with a full marketing homepage, admin login, and multiple sub-pages.

## Recent Changes
- **Feb 11, 2026**: Major update - Redesigned dropdown menus (Solutions 4-column mega-menu, Who We Serve with 6 roles, Resources with 5 items). Redesigned Contact page to "Talk with an Expert" layout with Martijn Craig Volman. Updated phone to (407) 813-5384. Redesigned Footer with newsletter signup, social icons, comprehensive link columns. Replaced placeholder images with real CDN product screenshots throughout LogoBar, HowItWorks, and Benefits sections.
- **Feb 11, 2026**: Initial build - Complete homepage with hero, how it works, benefits, integrations, testimonials, FAQ, case studies, blog preview sections. Admin login system with email/password. Sub-pages for Solutions, Who We Serve, Resources. Contact and Pricing pages.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Shadcn UI + Framer Motion
- **Backend**: Express.js + PostgreSQL + Drizzle ORM
- **Auth**: Admin login with bcryptjs password hashing + express-session; Replit Auth integration also available
- **Database**: PostgreSQL with admin_users table, sessions table, users table

## Key Files
- `client/src/pages/Home.tsx` - Main homepage with all sections
- `client/src/pages/Login.tsx` - Admin login page
- `client/src/pages/Admin.tsx` - Admin dashboard
- `client/src/pages/GenericPage.tsx` - Dynamic sub-pages for solutions/who-we-serve/resources
- `client/src/components/Header.tsx` - Navigation with dropdown menus
- `client/src/components/Footer.tsx` - Site footer
- `server/routes.ts` - API routes including admin auth
- `shared/schema.ts` - Database schema

## Admin Credentials
- Email: alexdenson231@gmail.com
- Password: Admintimber11

## Design
- Primary color: Orange (#E8632E / hsl 18 85% 55%)
- Font: Montserrat for headings, Open Sans for body
- Dark/Light mode support via CSS variables
- Product images: Real CDN images from Waldo's asset server used for logo bar, how it works, and benefits sections
- Contact expert: Martijn Craig Volman (Supply Chain & Implementation)
- Phone: (407) 813-5384

## User Preferences
- Wants the site to closely match waldologs.com structure
- Brand name: "Prime Cut Timber" with "PCT" abbreviation badge
- User will provide custom graphics later to replace generated hero/testimonial images
