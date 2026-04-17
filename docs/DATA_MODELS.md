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
ContactRequest references a Project, Flat, or House by type and id
```

Rules:

- A `Project` can contain many `Flat` records.
- A `Flat` must reference exactly one `Project`.
- A `House` is standalone and has no parent project.
- A `ContactRequest` stores the property type and property id so the future CRM can resolve context.

## 3. Shared Concepts

### Listing Status

Suggested values:

- `available`
- `reserved`
- `sold`
- `coming-soon`

### Energy Class

Suggested values:

- `A+`
- `A`
- `B`
- `C`
- `D`
- `E`

### Property Feature System

All property types may expose structured features.

Feature shape:

```ts
type PropertyFeature = {
  key: string;
  label: string;
  category:
    | "layout"
    | "comfort"
    | "outdoor"
    | "mobility"
    | "building"
    | "efficiency";
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
- `constructionStatus`
- `energyClass`
- `developer`
- `latitude`
- `longitude`
- `coverImage`
- `galleryImages`
- `createdAt`
- `updatedAt`

Recommended additions for the public site:

- `seoDescription`
- `projectStats`
- `features`

Relationship:

- One project contains many flats

## 5. Flat

Required fields:

- `id`
- `projectId`
- `title`
- `slug`
- `description`
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
- `planImage`
- `galleryImages`
- `createdAt`
- `updatedAt`

Recommended additions:

- `projectSlug`
- `projectTitle`
- `city`
- `address`
- `postcode`
- `features`
- `seoDescription`

Relationship:

- Every flat belongs to one project

## 6. House

Required fields:

- `id`
- `title`
- `slug`
- `description`
- `price`
- `surfaceM2`
- `landSurfaceM2`
- `rooms`
- `bedrooms`
- `bathrooms`
- `city`
- `address`
- `postcode`
- `garage`
- `garden`
- `parking`
- `energyClass`
- `galleryImages`
- `createdAt`
- `updatedAt`

Recommended additions:

- `availabilityStatus`
- `features`
- `seoDescription`

## 7. ContactRequest

Required fields:

- `id`
- `propertyType`
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
