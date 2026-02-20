MyStore Template Implementation Details

This document outlines the technical architecture and implementation details for the storefront templates in the MyStore platform.

1. Architectural Overview
The platform uses a dynamic template rendering system that allows store owners to choose between different visual styles. The templates are implemented as reusable React components that consume standardized store and product data.

Key Directories
components/templates/: Contains all template-specific components.
app/page.tsx
: Main entry point for subdomain-based storefront rendering.
app/dashboard/manage/[storeId]/page.tsx: Implementation of the live preview in the admin dashboard.

2. Template Structure
Each template is organized into a dedicated directory with a consistent set of components:

Storefront.tsx: The primary landing page for the store, featuring hero sections and product grids.
ProductDetails.tsx: A focused view for individual products, incorporating social proof, conversion elements, and purchase actions.
Navbar.tsx: A customizable header providing navigation and branding (optional in some templates).
Available Templates
Template	Aesthetic	Target Use Case
Modern	High-conversion, contemporary	Wellness, tech, and lifestyle brands.
Classic	Timeless, product-focused	General retail and traditional e-commerce.
Minimal	Essentialist, mono aesthetic	High-end fashion and boutique brands.

3. Dynamic Rendering Logic
Subdomain Detection
The platform identifies the appropriate store using a custom getSubdomain() utility.

typescript
const subdomain = await getSubdomain();
if (subdomain) {
  const { data: store } = await supabase.from("stores").select("*").eq("subdomain", subdomain).single();
  // Render selected template
}
Component Lookup Table
Templates are rendered dynamically using a registry object in 
app/page.tsx
:

typescript
const templates = {
  classic: ClassicStorefront,
  modern: ModernStorefront,
  minimal: MinimalStorefront,
};
const DTemplate = templates[store.template] || templates.classic;
return <DTemplate store={store} items={items} />;

4. Individual Template Features
Modern Template
Focus: Urgency and Social Proof

Real-time Stats: Simulated "People viewing" and "Recently sold" indicators.
Conversion Tools: Sticky countdown timers and limited-time offer badges.
Bundling: Integrated "Bundle & Save" options to increase Average Order Value (AOV).
Classic Template
Focus: Trust and Reliability

Offers: "Buy More Save More" tiered pricing (1 Pc, 2 Pc, 3 Pc).
Navigation: Traditional image gallery with arrows and dots indicators.
Trust Elements: Prominent display of shipping and satisfaction guarantees.
Minimal Template
Focus: Brand Identity

Aesthetic: Uses font-mono and grayscale hover transitions for a premium "lookbook" feel.
Simplicity: Stripped-back navigation and layout to minimize distractions.
Typography: Large, uppercase headers and tight tracking.

5. Data Model
All templates interact with the following core TypeScript interfaces:

typescript
interface Store {
  id: string;
  store_name: string;
  subdomain: string;
  template: string;
  image_url?: string;
}
interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  image_urls?: string[];
}

6. Dashboard Integration (Live Preview)
The "Manage Store" page implements a Live Preview system that:

Mocks Data: Uses mockStore and mockItems to populate the preview without affecting production data.
Renders Accurately: Uses the exact same template components used in the live storefront.
Real-time Feedback: Updates the preview instantly as the user switches templates in the dashboard UI.