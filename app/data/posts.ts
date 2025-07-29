export interface Post {
  id: string;
  title: string;
  date: string;
  author: string;
  imageUrl: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Choosing the Right Fabric for Your Project',
    date: '2024-05-15',
    author: 'Jane Doe',
    imageUrl: 'https://picsum.photos/seed/postA/800/600',
    content: 'Choosing the right fabric is the most critical step in any sewing project. The texture, weight, and drape of the fabric will determine the final look and feel of your garment. In this guide, we explore different types of fabrics, from breathable cottons perfect for summer dresses to luxurious silks for evening wear. We will also cover how to care for each type to ensure your creations last a lifetime...',
  },
  {
    id: '2',
    title: 'Top 5 Summer Fashion Trends to Watch Out For',
    date: '2024-05-10',
    author: 'John Smith',
    imageUrl: 'https://picsum.photos/seed/postB/800/600',
    content: 'Summer is just around the corner, and it is time to update your wardrobe with the latest trends. This year, we are seeing a resurgence of bold prints, vibrant colors, and lightweight fabrics. From flowy maxi dresses to tailored linen suits, we have rounded up the top 5 fashion trends that will dominate the season. Get inspired and start planning your summer outfits today...',
  },
  {
    id: '3',
    title: 'DIY Home Decor: How to Create Stunning Cushion Covers',
    date: '2024-05-05',
    author: 'Emily White',
    imageUrl: 'https://picsum.photos/seed/postC/800/600',
    content: 'Give your living space a quick and easy makeover with custom cushion covers. This simple DIY project is perfect for beginners and can be completed in just a few hours. All you need is your favorite fabric, a sewing machine, and a little creativity. Follow our step-by-step tutorial to create beautiful and unique cushion covers that will add a personal touch to your home decor...',
  },
];
