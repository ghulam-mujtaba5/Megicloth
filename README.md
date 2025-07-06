# Megicloth - Premium Unstitched Fabrics E-commerce Platform

A modern, mobile-first e-commerce platform for premium unstitched fabrics, built with Next.js 14, React 18, and Material-UI. Designed specifically for the Pakistani textile market with production-ready features and exceptional user experience.

![Megicloth E-commerce Platform](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.0-blue?style=for-the-badge&logo=mui)

## 🚀 Features

### 🛍️ E-commerce Core
- **Product Catalog**: Comprehensive product browsing with categories
- **Advanced Search & Filtering**: Search by name, description, tags, and price range
- **Product Details**: Rich product pages with image galleries, specifications, and reviews
- **Shopping Cart**: Persistent cart with quantity management and real-time updates
- **Checkout Process**: Multi-step checkout with form validation and payment options
- **Order Management**: Order confirmation and tracking

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly Interface**: Large buttons and intuitive gestures
- **Progressive Web App**: Fast loading and offline capabilities
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation

### 🎨 Modern UI/UX
- **Material Design**: Clean, modern interface following Material Design principles
- **Smooth Animations**: Fade, slide, and scale animations for better user experience
- **Loading States**: Skeleton loaders and progress indicators
- **Toast Notifications**: User feedback for actions and errors
- **Dark/Light Theme**: Theme support (ready for implementation)

### ⚡ Performance & SEO
- **Next.js 14**: App Router with server-side rendering
- **Optimized Images**: Next.js Image component with lazy loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Fast Loading**: Code splitting and optimized bundles
- **Search Engine Friendly**: Clean URLs and proper meta descriptions

### 🔒 Security & Reliability
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Data Persistence**: Local storage for cart and user preferences
- **Type Safety**: Full TypeScript implementation

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: Component library and design system
- **Emotion**: CSS-in-JS styling

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Next.js Built-in Tools**: Image optimization, routing, and more

## 📦 Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/megicloth/ecommerce-platform.git
   cd megicloth-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm start

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📁 Project Structure

```
megicloth/
├── app/                          # Next.js App Router
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout process
│   ├── components/               # Reusable UI components
│   │   ├── Header.tsx           # Navigation header
│   │   └── ProductCard.tsx      # Product display card
│   ├── context/                  # React context providers
│   │   └── CartContext.tsx      # Shopping cart state management
│   ├── data/                     # Static data and mock APIs
│   │   └── products.ts          # Product catalog data
│   ├── globals.css              # Global styles and design system
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   └── products/                # Product pages
│       ├── [id]/                # Dynamic product detail pages
│       └── page.tsx             # Products listing page
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## 🎯 Key Components

### CartContext
- **State Management**: Centralized cart state with React Context
- **Persistence**: Local storage integration for cart data
- **Validation**: Stock checking and quantity validation
- **Performance**: Memoized calculations and optimized re-renders

### ProductCard
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Elements**: Add to cart, favorites, and quick view
- **Loading States**: Skeleton loaders for better UX
- **Accessibility**: ARIA labels and keyboard navigation

### Header
- **Navigation**: Clean navigation with cart indicator
- **Mobile Menu**: Collapsible mobile navigation
- **Search Integration**: Global search functionality
- **Cart Preview**: Quick cart overview

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Trust and reliability
- **Secondary**: Green (#10b981) - Success and growth
- **Warning**: Orange (#f59e0b) - Attention and alerts
- **Error**: Red (#ef4444) - Errors and warnings
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Fonts**: Inter (body) and Poppins (headings)
- **Hierarchy**: Clear typographic scale
- **Responsive**: Fluid typography that scales with screen size

### Spacing
- **Consistent**: 8px base unit system
- **Responsive**: Adaptive spacing for different screen sizes
- **Accessible**: Adequate spacing for touch targets

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Megicloth
```

### TypeScript Configuration
The project uses strict TypeScript configuration for better type safety and development experience.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Product listing with filters works
- [ ] Product detail pages display properly
- [ ] Add to cart functionality
- [ ] Checkout process completion
- [ ] Mobile responsiveness
- [ ] Form validation
- [ ] Error handling

### Performance Testing
- Lighthouse score > 90 for all metrics
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use Material-UI components consistently
- Maintain responsive design principles
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@megicloth.com
- 📱 Phone: +92 300 1234567
- 🌐 Website: https://megicloth.com

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Material-UI Team**: For the comprehensive component library
- **Unsplash**: For beautiful product images
- **Pakistani Textile Industry**: For inspiration and market insights

---

**Built with ❤️ for the Pakistani textile industry**

*Megicloth - Premium Unstitched Fabrics*
