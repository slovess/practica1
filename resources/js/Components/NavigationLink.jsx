import { Link } from '@inertiajs/react';

export const NavigationLinks = () => (
    <nav className="nav-links">
        <Link href="/main" className="nav-link">главная</Link>
        <Link href="/analytics" className="nav-link">моя аналитика</Link>
        <Link href="/login" className="nav-link">вход|регистрация</Link>

      <style jsx="true">{`
        .nav-links {
          display: flex;
          gap: 40px;
          align-items: center;
        }
        .nav-link {
          color: #0b56f9;
          font-family: "Roboto Condensed";
          font-size: 20px;
          text-decoration: none;
        }
        @media (max-width: 640px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );

