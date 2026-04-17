import { routes } from "@/config/site";
import {
  flats,
  houses,
  projects,
} from "@/features/properties/data/mock-properties";
import { formatCurrency } from "@/lib/utils";
import type { Flat, House, Project, Property } from "@/types/property";

type FactItem = {
  label: string;
  value: string;
};

function formatConstructionStatus(status: Project["constructionStatus"]) {
  const labels: Record<Project["constructionStatus"], string> = {
    planning: "Planning",
    launching: "Launching",
    "in-progress": "In progress",
    completed: "Completed",
  };

  return labels[status];
}

export function getProjectStatusLabel(project: Project) {
  return project.constructionStatus === "in-progress"
    ? "In development"
    : formatConstructionStatus(project.constructionStatus);
}

export function getProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getFlats() {
  return flats;
}

export function getFlatBySlug(slug: string) {
  return flats.find((flat) => flat.slug === slug) ?? null;
}

export function getFlatsByProjectId(projectId: string) {
  return flats.filter((flat) => flat.projectId === projectId);
}

export function getHouses() {
  return houses;
}

export function getHouseBySlug(slug: string) {
  return houses.find((house) => house.slug === slug) ?? null;
}

export function getFeaturedProjects(limit = 2) {
  return projects.slice(0, limit);
}

export function getFeaturedProperties(limit = 3) {
  return [...flats.slice(0, 2), ...houses].slice(0, limit);
}

export function getProjectFacts(project: Project): FactItem[] {
  return [
    { label: "City", value: project.city },
    { label: "Status", value: getProjectStatusLabel(project) },
    { label: "Delivery", value: project.projectStats.deliveryLabel },
    { label: "Residences", value: String(project.projectStats.residences) },
  ];
}

export function getPropertyFacts(property: Property): FactItem[] {
  if (property.type === "flat") {
    return [
      { label: "Price", value: formatCurrency(property.price) },
      { label: "Surface", value: `${property.surfaceM2} m²` },
      { label: "Rooms", value: String(property.rooms) },
      { label: "Bedrooms", value: String(property.bedrooms) },
      { label: "Floor", value: String(property.floor) },
      { label: "Energy", value: property.energyClass },
    ];
  }

  return [
    { label: "Price", value: formatCurrency(property.price) },
    { label: "Surface", value: `${property.surfaceM2} m²` },
    { label: "Land", value: `${property.landSurfaceM2} m²` },
    { label: "Rooms", value: String(property.rooms) },
    { label: "Bedrooms", value: String(property.bedrooms) },
    { label: "Energy", value: property.energyClass },
  ];
}

export function getPropertyHref(property: Flat | House) {
  return property.type === "flat"
    ? routes.flat(property.slug)
    : routes.house(property.slug);
}
