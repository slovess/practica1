export const MenuButton = ({ isOpen, onClick }) => (
  <button onClick={onClick} className="menu-button">
    {isOpen ? '✖' : '☰'}
    <style jsx>{`
      .menu-button {
      color: blue;
        font-size: 24px;
        background: none;
        border: none;
        cursor: pointer;
      }
    `}</style>
  </button>
);

