import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      <Link className="navbar-brand" to="/">Mon App</Link>
        <div className="navbar-nav">
      <Link className="nav-link" to="/users">Users</Link>
      <Link className="nav-link" to="/form">Form</Link>
          <Link className="nav-link" to="/">Accueil</Link>
          <Link className="nav-link" to="/about">À propos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
