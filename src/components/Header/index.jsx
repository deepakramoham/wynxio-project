const Header = ({ menu }) => {
  return (
    <header className="header">
      <nav className="navbar bg-body-tertiary" style={{ minHeight: "3rem" }}>
        {menu}
      </nav>
    </header>
  );
};

export default Header;
