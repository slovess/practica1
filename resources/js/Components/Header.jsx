import { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';
import { NavigationLinks } from '../Components/NavigationLink';
import { MenuButton } from './MenuButton';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <ApplicationLogo />
      <NavigationLinks fontFamily="Roboto Condensed" className="desktop-nav" />
      <div className="mobile-menu">
        <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        {isMenuOpen && (
          <div className="mobile-nav">
            <NavigationLinks fontFamily="Roboto Condensed" />
          </div>
        )}
      </div>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          position: relative;
        }
        .desktop-nav {
          display: flex;
        }
        .mobile-menu {
          display: none;
        }
        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          padding: 20px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          z-index: 100;
        }
        @media (max-width: 640px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};
