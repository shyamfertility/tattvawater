# Tattva - The Water Story: Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from leading wellness and health tracking applications like Headspace (calming, mindful interfaces), MyFitnessPal (effective data visualization), and premium e-commerce platforms like Shopify. This creates a serene, health-focused aesthetic that inspires trust and daily engagement.

**Core Design Principles**:
- Tranquility & Flow: Designs that evoke water's calming nature through generous spacing and smooth transitions
- Clarity & Transparency: Clean information hierarchy that makes health data immediately understandable
- Inspirational & Motivating: Visual design that encourages consistent healthy habits
- Premium & Trustworthy: E-commerce quality that justifies product purchases

---

## Typography System

**Font Families** (via Google Fonts):
- Primary: 'Inter' - Clean, modern sans-serif for UI elements and data
- Accent: 'Playfair Display' - Elegant serif for recipe names and featured content
- Monospace: 'JetBrains Mono' - For numerical data and intake counters

**Hierarchy**:
- Hero Headings: Playfair Display, 3xl-5xl (48-64px), font-bold
- Section Headings: Inter, 2xl-3xl (32-40px), font-semibold
- Recipe Titles: Playfair Display, xl-2xl (24-32px), font-medium
- Body Text: Inter, base-lg (16-18px), font-normal
- Captions/Labels: Inter, sm-base (14-16px), font-medium
- Data Numbers: JetBrains Mono, 2xl-4xl (32-48px), font-bold

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16, 20, 24 for consistent rhythm

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl
- Content areas: max-w-6xl
- Reading content: max-w-3xl
- Forms: max-w-2xl

**Grid Systems**:
- Recipe Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Product Catalog: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Dashboard Stats: grid-cols-2 lg:grid-cols-4
- Benefits List: grid-cols-1 md:grid-cols-2

**Vertical Rhythm**:
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: space-y-8 to space-y-16
- Card padding: p-6 md:p-8

---

## Component Library

### Navigation
- **Header**: Sticky navigation with backdrop blur effect
  - Logo on left with brand tagline beneath
  - Center: Navigation links (Home, Recipes, Track, Shop, About)
  - Right: User avatar/login button and cart icon with badge
  - Mobile: Hamburger menu with slide-out drawer
  - Height: h-20, with shadow on scroll

### Hero Section (Landing Page)
- **Layout**: Full viewport (min-h-screen) with centered content
- **Image**: Large background image of water with fruit infusions, subtle overlay for text readability
- **Content**: 
  - Main headline with Playfair Display
  - Subheading explaining Tattva's mission
  - CTA buttons: "Start Tracking" (primary) and "Browse Recipes" (secondary) with blurred backgrounds
  - Trust indicators below: "100+ Recipes • Personalized Plans • Daily Motivation"
  - Scroll indicator at bottom

### Recipe Cards
- **Card Structure**: Rounded corners (rounded-2xl), hover lift effect
  - Image: Aspect ratio 4:3, rounded-t-2xl, showing vibrant infused water
  - Content padding: p-6
  - Recipe name: Playfair Display, text-xl
  - Quick stats: Prep time, calories, key benefits as icon badges
  - Ingredients preview: First 3-4 ingredients with "+" indicator
  - CTA: "View Recipe" text link
- **Grid Display**: gap-6 md:gap-8 between cards

### Recipe Detail Page
- **Hero Image**: Full-width banner showing the infused water bottle
- **Two-Column Layout** (lg:grid-cols-3):
  - Left (2 columns): 
    - Recipe overview card with key stats
    - Ingredients list with checkboxes
    - Step-by-step preparation with numbered circles
    - Health benefits section with expandable accordions
  - Right (1 column - sticky):
    - Add to cart card with bottle size options
    - Nutritional information panel
    - Similar recipes suggestions

### Water Intake Tracker Dashboard
- **Daily Progress Ring**: Large circular progress indicator
  - Center: Current intake in ml with JetBrains Mono
  - Outer ring: Visual fill showing progress to goal
  - Below: Target goal and percentage
  
- **Timeline View**: Horizontal scrollable timeline of the day
  - Time blocks with optimal drinking times highlighted
  - Checkmarks on completed intake moments
  - Next reminder time prominently displayed

- **Weekly Graph**: Line or bar chart showing 7-day trend
  - Y-axis: Water intake (ml)
  - X-axis: Days
  - Goal line overlay
  - Interactive tooltips on hover

- **Stats Grid** (4 columns):
  - Total this week
  - Daily average
  - Current streak
  - Energy boost score (calculated metric)

### Product Catalog (Shop)
- **Filter Sidebar** (sticky on desktop):
  - Category filters (Detox, Energy, Immunity, etc.)
  - Ingredient filters with search
  - Price range slider
  - Sort options dropdown

- **Product Grid**:
  - Cards with bottle image (transparent PNG on subtle background)
  - Recipe name and flavor profile
  - Price with any discounts crossed out
  - Rating stars and review count
  - Quick add to cart button overlay on hover
  - "Best Seller" or "New" badges

### Product Detail Page
- **Split Layout**:
  - Left: Image gallery with main image and thumbnails
  - Right: 
    - Product name and rating
    - Price with subscription option (save 15%)
    - Quantity selector
    - Add to cart (primary) and Buy Now (secondary) buttons
    - Accordion sections: Description, Ingredients, Health Benefits, How to Use
    - Customer reviews with star ratings

### Purchase History & Logs
- **Tabs Navigation**: Switch between "Water Logs" and "Purchase History"
- **Log Cards**: Timeline format
  - Date and time stamp
  - Bottle flavor with small image
  - Amount consumed with progress bar
  - Notes section (expandable)
- **Purchase History**: Table view with order number, date, items, total, and status badge

### Forms (Login/Signup/Profile)
- **Card-Based Forms**: Centered, max-w-md with generous padding
- **Input Fields**: 
  - Full-width with consistent height (h-12)
  - Labels above with small helper text beneath
  - Focus states with ring effect
  - Error states with inline error messages
- **Social Login Options**: Icon buttons for Google, GitHub, Apple
- **Profile Setup**: Multi-step form with progress indicator at top

### Notifications Component
- **Slide-in Cards**: From top-right corner
- **Content**: Icon, headline, motivational message, time
- **Actions**: Dismiss X button, optional CTA
- **Categories**: Reminder (water drop icon), Achievement (trophy), Tip (lightbulb)

### Footer
- **Multi-Column Layout** (grid-cols-2 md:grid-cols-4):
  - About Tattva: Mission statement and links
  - Quick Links: Recipes, Shop, Blog, FAQ
  - Support: Contact, Shipping, Returns
  - Newsletter: Email input with subscribe button
- **Bottom Bar**: Copyright, privacy policy, terms, social icons
- **Trust Badges**: Payment methods, certifications

---

## Images

**Required Images**:
1. **Hero Section**: Full-width background image showing pristine water with colorful fruit and herb infusions (strawberries, mint, citrus) in glass bottles with natural lighting
2. **Recipe Cards**: Individual product photography of each infused water bottle showing vibrant colors and ingredients floating in water
3. **Product Detail**: Multiple angles of Tattva bottles with clean, professional photography on neutral backgrounds
4. **About Section**: Lifestyle imagery showing people enjoying Tattva water in wellness settings
5. **Benefits Icons**: Simple line icons for health benefits (energy, immunity, detox, etc.)

**Image Treatment**:
- All images should feel bright, clean, and refreshing
- Product images on transparent or subtly tinted backgrounds
- Lifestyle images with natural lighting and aspirational settings
- Consistent photography style across all product images

---

## Accessibility & Interaction

- **Focus Indicators**: Prominent ring offset on all interactive elements
- **Button States**: Distinct hover (slight scale and shadow), active (scale down), disabled (reduced opacity)
- **Form Validation**: Real-time inline feedback with clear error/success states
- **Loading States**: Skeleton screens for data-heavy sections, spinners for actions
- **Responsive Tables**: Stack or horizontal scroll on mobile with scroll indicators
- **Touch Targets**: Minimum 44x44px for all interactive elements

**Minimal Animation**: Gentle transitions only
- Card hover: transform scale(1.02) with shadow increase
- Page transitions: Fade-in on route change
- Graph animations: Smooth entry animation on scroll into view (once)
- No continuous animations or distractions

---

This design system creates a premium wellness application that balances serene aesthetics with robust functionality, encouraging users to build consistent hydration habits while seamlessly facilitating e-commerce transactions.