export interface Testimonial {
  id: string;
  created_at: string;
  author: string;
  content: string;
  is_published: boolean;
  rating?: number | null;
}
