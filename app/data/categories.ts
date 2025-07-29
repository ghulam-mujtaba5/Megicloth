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
      { name: "Summer Collection", href: generateHref("Men’s Unstitched", "Summer Collection"), image: 'https://picsum.photos/seed/catA/600/400', subCategories: [] },
      { name: "Winter Collection", href: generateHref("Men’s Unstitched", "Winter Collection"), image: 'https://picsum.photos/seed/catB/600/400', subCategories: [] },
      { name: "Formal Fabric", href: generateHref("Men’s Unstitched", "Formal Fabric"), image: 'https://picsum.photos/seed/catC/600/400', subCategories: [] },
      { name: "Casual Fabric", href: generateHref("Men’s Unstitched", "Casual Fabric"), image: 'https://picsum.photos/seed/catD/600/400', subCategories: [] },
      { name: "Designer Series", href: generateHref("Men’s Unstitched", "Designer Series"), image: 'https://picsum.photos/seed/catE/600/400', subCategories: [] },
    ],
  },
  {
    name: "Women’s Unstitched",
    categories: [
      { name: "2-Piece / 3-Piece Suits", href: generateHref("Women’s Unstitched", "2-Piece / 3-Piece Suits"), image: 'https://picsum.photos/seed/catD/600/400', subCategories: [] },
      { name: "Embroidered / Plain", href: generateHref("Women’s Unstitched", "Embroidered / Plain"), image: 'https://picsum.photos/seed/catC/600/400', subCategories: [] },
      { name: "Luxury Lawn", href: generateHref("Women’s Unstitched", "Luxury Lawn"), image: 'https://picsum.photos/seed/catA/600/400', subCategories: [] },
      { name: "Chiffon Collection", href: generateHref("Women’s Unstitched", "Chiffon Collection"), image: 'https://picsum.photos/seed/catF/600/400', subCategories: [] },
      { name: "Khaddar / Linen / Cambric", href: generateHref("Women’s Unstitched", "Khaddar / Linen / Cambric"), image: 'https://picsum.photos/seed/catE/600/400', subCategories: [] },
    ],
  },
];
