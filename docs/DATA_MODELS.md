# Data Models

## 1. Core Entities

Initial public-site data contracts:

- `Project`
- `Flat`
- `House`
- `ContactRequest`

Future documentation may add `AdminUser`, `StaticPageContent`, and CRM-specific entities, but those are intentionally out of scope for the first implementation pass.

## 2. Relationship Overview

```text
Project 1 --- * Flat
House   1 --- 0 Flat
ContactRequest references a Flat or House only (not a Project)
```

Rules:

- A `Project` can contain many `Flat` records.
- A `Flat` must reference exactly one `Project`.
- A `House` is standalone and has no parent project.
- A `ContactRequest` stores the property type (`"flat"` or `"house"`) and property id so the future CRM can resolve context. `ContactRequest.propertyType` is typed as `Exclude<PropertyType, "project">`, so Projects cannot be directly referenced by a contact request.

## 3. Shared Concepts

### Listing Status

Values (`ListingStatus`):

- `available`
- `reserved`
- `sold`
- `coming-soon`

### Energy Class

Values (`EnergyClass`):

- `A+`
- `A`
- `B`
- `C`
- `D`
- `E`

### ListingImage

```ts
type ListingImage = {
  src: string;
  alt: string;
};
```

Used wherever a single image reference is stored (cover images, plan images, gallery arrays).

### ConstructionStatus

```ts
type ConstructionStatus = "planning" | "launching" | "in-progress" | "completed";
```

### Property Feature System

All property types may expose structured features.

`PropertyFeatureKey` is a controlled union of exactly 18 string literals — not a free-form string:

```ts
type PropertyFeatureKey =
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
```

`PropertyFeatureCategory` values:

```ts
type PropertyFeatureCategory =
  | "layout"
  | "comfort"
  | "outdoor"
  | "mobility"
  | "building"
  | "efficiency";
```

Feature shape:

```ts
type PropertyFeature = {
  key: PropertyFeatureKey;
  label: string;
  category: PropertyFeatureCategory;
  value: string;
  highlight?: boolean;
};
```

This allows a flat, house, or future admin form to share one consistent amenity model.

## 4. Project

Required fields:

- `id`
- `title`
- `slug`
- `description`
- `city`
- `address`
- `postcode`
- `constructionStatus` (`ConstructionStatus`)
- `energyClass`
- `developer`
- `latitude`
- `longitude`
- `coverImage` (`ListingImage`)
- `galleryImages` (`ListingImage[]`)
- `features` (`PropertyFeature[]`)
- `seoDescription`
- `projectStats` (`{ residences: number; availabilityLabel: string; deliveryLabel: string }`)
- `flats` (`ProjectFlatSummary[]`)
- `createdAt`
- `updatedAt`

### ProjectFlatSummary

A lightweight flat reference embedded in a Project for use in listing overviews:

```ts
type ProjectFlatSummary = {
  id: string;
  slug: string;
  title: string;
  price: number;
  surfaceM2: number;
  rooms: number;
  bedrooms: number;
  availabilityStatus: ListingStatus;
};
```

Relationship:

- One project contains many flats

## 5. Flat

Required fields:

- `id`
- `projectId`
- `projectSlug`
- `projectTitle`
- `title`
- `slug`
- `description`
- `city`
- `address`
- `postcode`
- `price`
- `surfaceM2`
- `rooms`
- `bedrooms`
- `bathrooms`
- `floor`
- `parking`
- `balcony`
- `terrace`
- `availabilityStatus`
- `energyClass`
- `galleryImages` (`ListingImage[]`)
- `features` (`PropertyFeature[]`)
- `seoDescription`
- `createdAt`
- `updatedAt`

Optional fields:

- `planImage?: ListingImage`

Relationship:

- Every flat belongs to one project

## 6. House

Required fields:

- `id`
- `title`
- `slug`
- `description`
- `city`
- `address`
- `postcode`
- `price`
- `surfaceM2`
- `landSurfaceM2`
- `rooms`
- `bedrooms`
- `bathrooms`
- `garage`
- `garden`
- `parking`
- `availabilityStatus`
- `energyClass`
- `galleryImages` (`ListingImage[]`)
- `features` (`PropertyFeature[]`)
- `seoDescription`
- `createdAt`
- `updatedAt`

## 7. ContactRequest

Required fields:

- `id`
- `propertyType` (`Exclude<PropertyType, "project">` — only `"flat"` or `"house"`; Projects cannot be referenced)
- `propertyId`
- `name`
- `email`
- `phone`
- `message`
- `createdAt`

Future-ready additions:

- `status`
- `source`
- `notes`

## 8. Validation Expectations

- Price values must be positive
- Surface values must be positive
- Required text fields must not be empty
- Slugs must be unique within their entity scope
- Contact requests must include valid email and message content
- Feature keys must be controlled values, not arbitrary UI strings
