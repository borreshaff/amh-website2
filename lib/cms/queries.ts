import { sanityClient, isCmsConfigured } from "./client";
import { Project } from "./types";
import fallbackProjects from "@/content/fallback-data/projects.json";

const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true && published == true] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    client,
    "industry": industry->title,
    "services": services[]->title,
    summary,
    "heroImage": heroMedia.asset->url,
    featured
  }
`;

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isCmsConfigured || !sanityClient) {
    return fallbackProjects as Project[];
  }

  try {
    const projects = await sanityClient.fetch<Project[]>(FEATURED_PROJECTS_QUERY);
    return projects.length > 0 ? projects : (fallbackProjects as Project[]);
  } catch (error) {
    console.error("Sanity fetch failed, using fallback data:", error);
    return fallbackProjects as Project[];
  }
}
