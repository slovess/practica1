import React, { useState } from 'react';
import ApplicationLogo from '../Components/ApplicationLogo';
import { NavigationLinks } from '../Components/NavigationLink';
import { MenuButton } from '../Components/MenuButton';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <ApplicationLogo />
      <nav className="desktop-nav">
        <NavigationLinks fontFamily="Roboto Condensed" />
      </nav>
      <div className="mobile-menu">
        <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <NavigationLinks fontFamily="Roboto Condensed" />
        </div>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          position: relative;
          background: white;
          z-index: 200;
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
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-nav.open {
          padding: 20px;
          max-height: 300px; /* или auto с JS, но это безопаснее */
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
