export const NavigationLinks = () => (
    <nav className="nav-links">
      <a href="#" className="nav-link">главная</a>
      <a href="#" className="nav-link">моя аналитика</a>
      <a href="#" className="nav-link">вход|регистрация</a>
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
  
  