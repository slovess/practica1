import ApplicationLogo from './ApplicationLogo';
import { NavigationLinks } from '../Components/NavigationLink';
import { MenuButton } from './MenuButton';

export const Header = () => (
  <header className="header">
    <ApplicationLogo />
    <NavigationLinks fontFamily="Roboto Condensed" />
    <div className="mobile-menu">
      <MenuButton />
    </div>
    <style jsx={true}>{`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        margin-top: auto;
      }
      .mobile-menu {
        display: none;
      }
      @media (max-width: 640px) {
        .header {
          padding: 15px 10px;
        }
        .mobile-menu {
          display: block;
        }
      }
    `}</style>
  </header>
);

