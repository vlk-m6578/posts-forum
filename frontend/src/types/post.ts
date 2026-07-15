import type { Photo } from "./photo";

export interface Post {
  id: number;
  title: string;
  description: string;
  images: Photo[];
}