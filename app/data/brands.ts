export interface Brand {
  id: string;
  name: string;
  logo: string;
}

/**
 * All brand logos are now externally hosted URLs for reliability and consistency.
 * Consuming components should implement error handling for image loading (e.g., fallback image or alt text)
 * Example (using next/image):
 * <Image src={brand.logo} alt={brand.name} onError={(e) => e.currentTarget.src = '/fallback-logo.png'} ... />
 */
export const brands: Brand[] = [
  {
    id: '1',
    name: 'Gul Ahmed',
    logo: 'https://www.gulahmedshop.com/media/logo/stores/1/logo_1.png',
  },
  {
    id: '2',
    name: 'Alkaram Studio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Alkaram_Studio_logo.png', // Official Alkaram Studio logo
  },
  {
    id: '3',
    name: 'Khaadi',
    logo: 'https://seeklogo.com/images/K/khaadi-logo-4A5C1F6B9C-seeklogo.com.png', // Official Khaadi logo
  },
  {
    id: '4',
    name: 'Sapphire',
    logo: 'https://seeklogo.com/images/S/sapphire-logo-6B7A7B6D2C-seeklogo.com.png', // Official Sapphire logo
  },

  {
    id: '6',
    name: 'Sana Safinaz',
    logo: 'https://seeklogo.com/images/S/sana-safinaz-logo-5D5B5F6B9C-seeklogo.com.png', // Official Sana Safinaz logo
  },
];
