import { Link, usePage } from '@inertiajs/react';

export const NavigationLinks = () => {
  const { auth } = usePage().props;
  const user = auth?.user;

  return (
    <nav className="nav-links">
      <Link href="/main" className="nav-link">главная</Link>
      <Link href="/analytics" className="nav-link">моя аналитика</Link>

      {user ? (
        <>
          <Link href="/profile" className="nav-link">{user.name}</Link>
          <Link href={route('logout')} method="post" as="button" className="nav-link">
            выход
          </Link>
        </>
      ) : (
        <Link href="/login" className="nav-link">вход|регистрация</Link>
      )}

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
          background: none;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 640px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
