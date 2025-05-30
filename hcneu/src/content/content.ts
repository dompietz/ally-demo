export type ContentType = 'article' | 'video';

export interface ContentItem {
  id: string;
  slug: string;
  type: ContentType;
  title: string;
  description: string;
  categories: string[];
  thumbnailUrl: string;
  contentUrl: string;
  publishedAt: string;
}

export const content: ContentItem[] = [
  {
    id: "stress-article-1",
    slug: "wie-stress-den-koerper-beeinflusst",
    type: "article",
    title: "Wie Stress den Körper beeinflusst",
    description: "Erfahre, wie sich chronischer Stress auf deine Gesundheit auswirken kann.",
    categories: ["stress", "mental-health"],
    thumbnailUrl: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    contentUrl: "/content/articles/wie-stress-den-koerper-beeinflusst.md",
    publishedAt: "2025-05-01"
  },
  {
    id: "ernaehrung-article-1",
    slug: "die-rolle-der-ernaehrung-bei-chronischen-erkrankungen",
    type: "article",
    title: "Die Rolle der Ernährung bei chronischen Erkrankungen",
    description: "Welche Ernährung hilft bei der Prävention und Behandlung von IBD?",
    categories: ["ernaehrung", "ibd"],
    thumbnailUrl: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=3673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    contentUrl: "/content/articles/die-rolle-der-ernaehrung-bei-chronischen-erkrankungen.md",
    publishedAt: "2025-04-20"
  },
  {
    id: "bewegung-article-1",
    slug: "bewegung-und-immunsystem",
    type: "article",
    title: "Bewegung und Immunsystem: Was sagt die Forschung?",
    description: "Warum regelmäßige Bewegung dein Immunsystem stärken kann.",
    categories: ["bewegung", "immune-system"],
    thumbnailUrl: "https://images.unsplash.com/photo-1529229504105-4ea795dcbf59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    contentUrl: "/content/articles/bewegung-und-immunsystem.md",
    publishedAt: "2025-05-10"
  }
];
