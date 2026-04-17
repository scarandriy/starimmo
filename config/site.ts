export const siteConfig = {
  name: "Starimmo",
  locale: "en-LU",
  currency: "EUR",
  siteUrl: "https://www.starimmo.lu",
  title: "Starimmo | Luxembourg Real Estate",
  description:
    "Premium residential properties across Luxembourg. Projects, apartments, and standalone homes.",
  defaultOgImage:
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
} as const;

export const routes = {
  home: "/",
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}`,
  flat: (slug: string) => `/flats/${slug}`,
  house: (slug: string) => `/houses/${slug}`,
  about: "/about",
  contact: "/contact",
} as const;

export const mainNavigation = [
  { label: "Home", href: routes.home },
  { label: "Projects", href: routes.projects },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

export const footerNavigation = [
  { label: "Projects", href: routes.projects },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

export const contactDetails = {
  phone: "+352 27 00 45 11",
  email: "hello@starimmo.lu",
  office: "12 Boulevard Royal, L-2449 Luxembourg",
  hours: "Monday to Friday, 09:00 — 18:00",
} as const;

export const homePagePartners = [
  { mark: "BGL", name: "BNP Paribas" },
  { mark: "Raiffeisen", name: "Banque Luxembourg" },
  { mark: "AXA", name: "Luxembourg" },
  { mark: "Foyer", name: "Assurances" },
  { mark: "BPI", name: "Real Estate" },
  { mark: "Thomas & Piron", name: "Developments" },
] as const;

export const homePageContent = {
  hero: {
    title: "Modern luxury\nresidences",
    subtitle: "Luxembourg's premier address for exceptional properties",
    primaryCta: {
      label: "View projects",
      href: routes.projects,
    },
    secondaryCta: {
      label: "Schedule a visit",
      href: routes.contact,
    },
  },
  featuredProjects: {
    eyebrow: "Featured developments",
    title: "Current projects across Luxembourg",
    description:
      "Carefully selected residential developments in prime locations, designed for modern living.",
  },
  featuredProperties: {
    eyebrow: "Available properties",
    title: "Discover your next home",
    description:
      "Browse our selection of apartments and houses, each presented with complete transparency.",
  },
  ctaBand: {
    title: "Find your ideal property in Luxembourg",
    description:
      "Whether you are looking for a city apartment or a family home, our team provides expert guidance at every step.",
    ctaLabel: "Speak with our team",
    ctaHref: routes.contact,
  },
} as const;

export const aboutPageContent = {
  eyebrow: "About us",
  title: "The trusted name in Luxembourg real estate",
  description:
    "For over 17 years, Starimmo has been the preferred partner for discerning buyers and investors seeking premium residential properties across Luxembourg.",
  story: [
    "Founded in Luxembourg City, Starimmo has built its reputation on deep market knowledge, transparent service, and an unwavering commitment to client satisfaction.",
    "Our team of experienced advisors combines local expertise with international standards, ensuring every transaction is handled with precision and care.",
  ],
  pillars: [
    {
      title: "Market expertise",
      description:
        "Deep understanding of Luxembourg's residential landscape, from city centers to emerging neighborhoods.",
    },
    {
      title: "Client-first approach",
      description:
        "Every interaction is tailored to your goals, timeline, and investment strategy.",
    },
    {
      title: "End-to-end service",
      description:
        "From property search to closing, we manage every detail so you can focus on what matters.",
    },
  ],
  quote: {
    text: "We don't just sell properties. We build lasting relationships based on trust, transparency, and results.",
    attribution: "Starimmo founding team",
  },
} as const;

export const companyStats = [
  { value: "17+", label: "Years in Luxembourg" },
  { value: "250+", label: "Properties advised" },
  { value: "98%", label: "Client retention" },
  { value: "4", label: "Languages spoken" },
] as const;

export const contactPageContent = {
  eyebrow: "Get in touch",
  title: "Let's discuss your property goals",
  description:
    "Whether you are exploring your first purchase or expanding a portfolio, our advisors are ready to help.",
  reassurance: [
    "Personalized advice for buyers and investors",
    "No-obligation consultation",
    "Fluent in English, French, German, and Luxembourgish",
  ],
} as const;
