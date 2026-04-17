import type {
  Flat,
  House,
  ListingImage,
  Project,
  ProjectFlatSummary,
  PropertyFeature,
  PropertyFeatureCategory,
  PropertyFeatureKey,
} from "@/types/property";

const TIMESTAMP = "2026-03-15T00:00:00.000Z";

function image(src: string, alt: string): ListingImage {
  return { src, alt };
}

function feature(
  key: PropertyFeatureKey,
  label: string,
  category: PropertyFeatureCategory,
  value: string,
  highlight = false,
): PropertyFeature {
  return { key, label, category, value, highlight };
}

function toProjectFlatSummary(flat: Flat): ProjectFlatSummary {
  return {
    id: flat.id,
    slug: flat.slug,
    title: flat.title,
    price: flat.price,
    surfaceM2: flat.surfaceM2,
    rooms: flat.rooms,
    bedrooms: flat.bedrooms,
    availabilityStatus: flat.availabilityStatus,
  };
}

export const flats: Flat[] = [
  {
    type: "flat",
    id: "flat-grund-201",
    projectId: "project-grund-terraces",
    projectSlug: "grund-terraces",
    projectTitle: "Residence Grund Terraces",
    title: "Flat 201 - Two-bedroom city residence",
    slug: "grund-terraces-flat-201",
    description:
      "A bright apartment with a generous living space, calm materials, and direct access to the city center.",
    city: "Luxembourg",
    address: "18 Rue du Fort Olisy",
    postcode: "2261",
    price: 985000,
    surfaceM2: 92,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 2,
    floor: 2,
    parking: true,
    balcony: true,
    terrace: false,
    availabilityStatus: "available",
    energyClass: "A",
    coverImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "Living room in a modern Luxembourg apartment",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        "Living room in Flat 201",
      ),
      image(
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        "Kitchen in Flat 201",
      ),
      image(
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
        "Bedroom in Flat 201",
      ),
    ],
    planImage: image(
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "Plan placeholder for Flat 201",
    ),
    features: [
      feature("parking", "Parking", "mobility", "1 underground space", true),
      feature("balcony", "Balcony", "outdoor", "South-facing balcony"),
      feature(
        "underfloor-heating",
        "Heating",
        "comfort",
        "Underfloor heating",
      ),
      feature("triple-glazing", "Windows", "efficiency", "Triple glazing"),
      feature("bike-storage", "Bike storage", "building", "Shared bike room"),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "Two-bedroom apartment in Residence Grund Terraces with balcony, parking, and strong city access.",
  },
  {
    type: "flat",
    id: "flat-grund-401",
    projectId: "project-grund-terraces",
    projectSlug: "grund-terraces",
    projectTitle: "Residence Grund Terraces",
    title: "Flat 401 - Penthouse terrace apartment",
    slug: "grund-terraces-flat-401",
    description:
      "A premium top-floor layout with large glazing, a private terrace, and a strong indoor-outdoor feel.",
    city: "Luxembourg",
    address: "18 Rue du Fort Olisy",
    postcode: "2261",
    price: 1495000,
    surfaceM2: 128,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    floor: 4,
    parking: true,
    balcony: false,
    terrace: true,
    availabilityStatus: "reserved",
    energyClass: "A+",
    coverImage: image(
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "Penthouse interior with terrace access",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "Penthouse living space",
      ),
      image(
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        "Bright lounge with premium finishes",
      ),
      image(
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        "Open kitchen with natural light",
      ),
    ],
    planImage: image(
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "Plan placeholder for Flat 401",
    ),
    features: [
      feature("terrace", "Terrace", "outdoor", "34 m² private terrace", true),
      feature("parking", "Parking", "mobility", "2 underground spaces"),
      feature("elevator", "Lift access", "building", "Direct secure lift"),
      feature("south-facing", "Orientation", "layout", "South-west exposure"),
      feature(
        "underfloor-heating",
        "Heating",
        "comfort",
        "Low-temperature underfloor heating",
      ),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "Reserved penthouse apartment in Residence Grund Terraces with terrace, lift access, and premium proportions.",
  },
  {
    type: "flat",
    id: "flat-belair-102",
    projectId: "project-belair-residences",
    projectSlug: "belair-park-residences",
    projectTitle: "Belair Park Residences",
    title: "Flat 102 - Family apartment facing the garden",
    slug: "belair-park-flat-102",
    description:
      "A balanced family apartment designed around natural light, practical circulation, and green surroundings.",
    city: "Luxembourg",
    address: "7 Rue Nicolas Simmer",
    postcode: "2538",
    price: 1130000,
    surfaceM2: 109,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    floor: 1,
    parking: true,
    balcony: true,
    terrace: false,
    availabilityStatus: "available",
    energyClass: "A",
    coverImage: image(
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80",
      "Contemporary apartment with terrace outlook",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80",
        "Living area in Flat 102",
      ),
      image(
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "Dining and lounge area in Flat 102",
      ),
      image(
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
        "Bedroom in Flat 102",
      ),
    ],
    planImage: image(
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "Plan placeholder for Flat 102",
    ),
    features: [
      feature("balcony", "Balcony", "outdoor", "Garden-facing balcony", true),
      feature("parking", "Parking", "mobility", "1 indoor space"),
      feature("family-layout", "Layout", "layout", "Three-bedroom family plan"),
      feature("triple-glazing", "Windows", "efficiency", "Acoustic triple glazing"),
      feature("private-cellar", "Private cellar", "building", "Included storage"),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "Three-bedroom flat in Belair Park Residences with family layout, balcony, and indoor parking.",
  },
  {
    type: "flat",
    id: "flat-belair-301",
    projectId: "project-belair-residences",
    projectSlug: "belair-park-residences",
    projectTitle: "Belair Park Residences",
    title: "Flat 301 - Compact investor-friendly apartment",
    slug: "belair-park-flat-301",
    description:
      "A refined one-bedroom layout suited to professionals seeking a central address with quality finishes.",
    city: "Luxembourg",
    address: "7 Rue Nicolas Simmer",
    postcode: "2538",
    price: 715000,
    surfaceM2: 61,
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    floor: 3,
    parking: false,
    balcony: true,
    terrace: false,
    availabilityStatus: "coming-soon",
    energyClass: "A",
    coverImage: image(
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "Compact premium apartment interior",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
        "Studio-like premium living area",
      ),
      image(
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        "Kitchen and dining zone",
      ),
      image(
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
        "Bedroom scene",
      ),
    ],
    planImage: image(
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "Plan placeholder for Flat 301",
    ),
    features: [
      feature("balcony", "Balcony", "outdoor", "Private balcony"),
      feature("elevator", "Lift access", "building", "Lift to all floors"),
      feature("bike-storage", "Bike storage", "building", "Resident bike room"),
      feature("energy-class", "Energy class", "efficiency", "Class A", true),
      feature("heating-type", "Heating type", "comfort", "Heat pump system"),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "One-bedroom apartment in Belair with balcony, lift access, and efficient modern systems.",
  },
];

export const houses: House[] = [
  {
    type: "house",
    id: "house-cents-garden-villa",
    title: "Cents Garden Villa",
    slug: "cents-garden-villa",
    description:
      "A warm family home with landscaped outdoor space, generous reception areas, and a calm residential setting.",
    city: "Luxembourg",
    address: "42 Rue de Trèves",
    postcode: "2630",
    price: 2395000,
    surfaceM2: 246,
    landSurfaceM2: 540,
    rooms: 8,
    bedrooms: 4,
    bathrooms: 3,
    garage: true,
    garden: true,
    parking: true,
    availabilityStatus: "available",
    energyClass: "B",
    coverImage: image(
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      "Family villa with landscaped garden",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
        "Exterior of Cents Garden Villa",
      ),
      image(
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "Kitchen and dining area",
      ),
      image(
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "Garden terrace",
      ),
    ],
    features: [
      feature("garage", "Garage", "mobility", "Double garage", true),
      feature("garden", "Garden", "outdoor", "Landscaped private garden", true),
      feature("home-office", "Home office", "layout", "Dedicated office room"),
      feature(
        "underfloor-heating",
        "Heating",
        "comfort",
        "Underfloor heating on main level",
      ),
      feature("solar-panels", "Solar panels", "efficiency", "Roof-mounted system"),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "Family villa in Luxembourg-Cents with garden, double garage, and generous interior volume.",
  },
  {
    type: "house",
    id: "house-bridel-retreat",
    title: "Bridel Family Retreat",
    slug: "bridel-family-retreat",
    description:
      "A quiet standalone residence designed for long-term family living with strong indoor comfort and outdoor privacy.",
    city: "Bridel",
    address: "9 Rue des Prés",
    postcode: "8147",
    price: 1875000,
    surfaceM2: 218,
    landSurfaceM2: 470,
    rooms: 7,
    bedrooms: 4,
    bathrooms: 2,
    garage: true,
    garden: true,
    parking: true,
    availabilityStatus: "reserved",
    energyClass: "A",
    coverImage: image(
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      "Standalone house with modern exterior",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        "Exterior view of Bridel Family Retreat",
      ),
      image(
        "https://images.unsplash.com/photo-1600607687644-c7f34bc4b0b4?auto=format&fit=crop&w=1200&q=80",
        "Interior lounge with fireplace",
      ),
      image(
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        "Covered terrace and garden edge",
      ),
    ],
    features: [
      feature("garage", "Garage", "mobility", "Integrated garage"),
      feature("garden", "Garden", "outdoor", "Private rear garden", true),
      feature("family-layout", "Layout", "layout", "Four-bedroom family layout"),
      feature("triple-glazing", "Windows", "efficiency", "Triple glazing throughout"),
      feature("charging-point", "EV charging", "mobility", "Private charging point"),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "Reserved family home in Bridel with private garden, garage, and energy-efficient construction.",
  },
];

export const projects: Project[] = [
  {
    type: "project",
    id: "project-grund-terraces",
    title: "Residence Grund Terraces",
    slug: "grund-terraces",
    description:
      "An intimate city development combining elegant apartment layouts with strong access to central Luxembourg.",
    city: "Luxembourg",
    address: "18 Rue du Fort Olisy",
    postcode: "2261",
    constructionStatus: "in-progress",
    energyClass: "A",
    developer: "Starimmo Developments",
    latitude: 49.6062,
    longitude: 6.1336,
    coverImage: image(
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
      "Facade of Residence Grund Terraces",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
        "Facade of Residence Grund Terraces",
      ),
      image(
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
        "Interior ambiance in Residence Grund Terraces",
      ),
      image(
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
        "Living room atmosphere in the project",
      ),
    ],
    projectStats: {
      residences: 18,
      availabilityLabel: "Limited availability",
      deliveryLabel: "Delivery Q4 2026",
    },
    flats: flats
      .filter((flat) => flat.projectId === "project-grund-terraces")
      .map(toProjectFlatSummary),
    features: [
      feature("elevator", "Lift access", "building", "Secure lift core"),
      feature(
        "landscaped-courtyard",
        "Courtyard",
        "outdoor",
        "Shared landscaped courtyard",
      ),
      feature("bike-storage", "Bike storage", "building", "Resident bike room"),
      feature("charging-point", "EV charging", "mobility", "Prepared parking bays"),
      feature("energy-class", "Energy class", "efficiency", "Class A"),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "City-center project in Luxembourg with premium apartments, landscaped common areas, and future-ready mobility features.",
  },
  {
    type: "project",
    id: "project-belair-residences",
    title: "Belair Park Residences",
    slug: "belair-park-residences",
    description:
      "A calm residential address pairing family-oriented layouts with the understated feel expected in Belair.",
    city: "Luxembourg",
    address: "7 Rue Nicolas Simmer",
    postcode: "2538",
    constructionStatus: "launching",
    energyClass: "A",
    developer: "Starimmo Developments",
    latitude: 49.6119,
    longitude: 6.1033,
    coverImage: image(
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
      "Facade view of Belair Park Residences",
    ),
    galleryImages: [
      image(
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
        "Belair Park Residences exterior",
      ),
      image(
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1400&q=80",
        "Garden-facing apartment living area",
      ),
      image(
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
        "Dining area inside Belair Park Residences",
      ),
    ],
    projectStats: {
      residences: 24,
      availabilityLabel: "Launch collection",
      deliveryLabel: "Delivery Q2 2027",
    },
    flats: flats
      .filter((flat) => flat.projectId === "project-belair-residences")
      .map(toProjectFlatSummary),
    features: [
      feature("elevator", "Lift access", "building", "Lift to all floors"),
      feature(
        "landscaped-courtyard",
        "Courtyard",
        "outdoor",
        "Shared landscaped garden",
      ),
      feature("private-cellar", "Cellars", "building", "Private basement storage"),
      feature("parking", "Parking", "mobility", "Indoor parking available"),
      feature("energy-class", "Energy class", "efficiency", "Class A"),
    ],
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    seoDescription:
      "Belair residential development with family-oriented apartments, indoor parking, and landscaped surroundings.",
  },
];
