import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CityListingPage } from './pages/CityListingPage';
import { SpaceDetailPage } from './pages/SpaceDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState<{
    type: 'home' | 'city' | 'space';
    slug?: string;
  }>({ type: 'home' });

  useEffect(() => {
    // Simple routing based on URL hash
    const handleRoute = () => {
      const path = window.location.hash.slice(1) || '/';
      
      if (path === '/') {
        setCurrentPage({ type: 'home' });
      } else if (path.startsWith('/coworking-space-in-')) {
        const citySlug = path.replace('/coworking-space-in-', '');
        setCurrentPage({ type: 'city', slug: citySlug });
      } else if (path.startsWith('/space/')) {
        const spaceSlug = path.replace('/space/', '');
        setCurrentPage({ type: 'space', slug: spaceSlug });
      } else {
        setCurrentPage({ type: 'home' });
      }
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  // Intercept link clicks to use hash routing
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.location.hash = href || '/';
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {currentPage.type === 'home' && <HomePage />}
        {currentPage.type === 'city' && currentPage.slug && (
          <CityListingPage citySlug={currentPage.slug} />
        )}
        {currentPage.type === 'space' && currentPage.slug && (
          <SpaceDetailPage spaceSlug={currentPage.slug} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;