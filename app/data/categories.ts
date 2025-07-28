export interface SubCategory {
  name: string;
  href: string;
}

export interface Category {
  name: string;
  href: string;
  image: string;
  subCategories: SubCategory[];
}

export interface CategoryGroup {
  name: string;
  categories: Category[];
}

const generateHref = (group: string, category: string) => {
  const groupSlug = group.toLowerCase().replace(/’s/g, '').replace(/ /g, '-');
  const categorySlug = category.toLowerCase().replace(/ /g, '-').replace(/\//g, '');
  return `/products?group=${groupSlug}&category=${categorySlug}`;
}

export const categoryData: CategoryGroup[] = [
  {
    name: "Men’s Unstitched",
    categories: [
      { name: "Summer Collection", href: generateHref("Men’s Unstitched", "Summer Collection"), image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Winter Collection", href: generateHref("Men’s Unstitched", "Winter Collection"), image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Formal Fabric", href: generateHref("Men’s Unstitched", "Formal Fabric"), image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Casual Fabric", href: generateHref("Men’s Unstitched", "Casual Fabric"), image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Designer Series", href: generateHref("Men’s Unstitched", "Designer Series"), image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', subCategories: [] },
    ],
  },
  {
    name: "Women’s Unstitched",
    categories: [
      { name: "2-Piece / 3-Piece Suits", href: generateHref("Women’s Unstitched", "2-Piece / 3-Piece Suits"), image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Embroidered / Plain", href: generateHref("Women’s Unstitched", "Embroidered / Plain"), image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Luxury Lawn", href: generateHref("Women’s Unstitched", "Luxury Lawn"), image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Chiffon Collection", href: generateHref("Women’s Unstitched", "Chiffon Collection"), image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=80', subCategories: [] },
      { name: "Khaddar / Linen / Cambric", href: generateHref("Women’s Unstitched", "Khaddar / Linen / Cambric"), image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', subCategories: [] },
    ],
  },
];
