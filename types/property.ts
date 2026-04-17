export type PropertyType = "project" | "flat" | "house";

export type ListingStatus = "available" | "reserved" | "sold" | "coming-soon";

export type ConstructionStatus =
  | "planning"
  | "launching"
  | "in-progress"
  | "completed";

export type EnergyClass = "A+" | "A" | "B" | "C" | "D" | "E";

export type PropertyFeatureCategory =
  | "layout"
  | "comfort"
  | "outdoor"
  | "mobility"
  | "building"
  | "efficiency";

export type PropertyFeatureKey =
  | "parking"
  | "terrace"
  | "balcony"
  | "energy-class"
  | "heating-type"
  | "elevator"
  | "garage"
  | "garden"
  | "private-cellar"
  | "bike-storage"
  | "underfloor-heating"
  | "triple-glazing"
  | "home-office"
  | "south-facing"
  | "solar-panels"
  | "family-layout"
  | "landscaped-courtyard"
  | "charging-point";

export type ListingImage = {
  src: string;
  alt: string;
};

export type PropertyFeature = {
  key: PropertyFeatureKey;
  label: string;
  category: PropertyFeatureCategory;
  value: string;
  highlight?: boolean;
};

type SharedRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  city: string;
  address: string;
  postcode: string;
  energyClass: EnergyClass;
  galleryImages: ListingImage[];
  features: PropertyFeature[];
  createdAt: string;
  updatedAt: string;
  seoDescription: string;
};

export type ProjectFlatSummary = {
  id: string;
  slug: string;
  title: string;
  price: number;
  surfaceM2: number;
  rooms: number;
  bedrooms: number;
  availabilityStatus: ListingStatus;
};

export interface Project extends SharedRecord {
  type: "project";
  coverImage: ListingImage;
  constructionStatus: ConstructionStatus;
  developer: string;
  latitude: number;
  longitude: number;
  projectStats: {
    residences: number;
    availabilityLabel: string;
    deliveryLabel: string;
  };
  flats: ProjectFlatSummary[];
}

export interface Flat extends SharedRecord {
  type: "flat";
  coverImage: ListingImage;
  projectId: string;
  projectSlug: string;
  projectTitle: string;
  price: number;
  surfaceM2: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  parking: boolean;
  balcony: boolean;
  terrace: boolean;
  availabilityStatus: ListingStatus;
  planImage?: ListingImage;
}

export interface House extends SharedRecord {
  type: "house";
  coverImage: ListingImage;
  price: number;
  surfaceM2: number;
  landSurfaceM2: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  garden: boolean;
  parking: boolean;
  availabilityStatus: ListingStatus;
}

export type Property = Flat | House;

export interface ContactRequest {
  id: string;
  propertyType: Exclude<PropertyType, "project">;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
