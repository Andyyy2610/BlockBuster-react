import { useState } from 'react';

export const Navbar = ({ search, setSearch, favCount, showFavoritesOnly, setShowFavoritesOnly }) => {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary sticky-top px-3 py-2">
      <div className="container-fluid">
        <a 
          className="navbar-brand d-flex align-items-center gap-2 fw-bold text-warning" 
          href="#!"
          onClick={(e) => { 
            e.preventDefault(); 
            setShowFavoritesOnly(false); 
          }}
        >
          <i className="bi bi-film fs-3"></i>
          <span>BLOCKBUSTER<span className="text-light">BOX</span></span>
        </a>

        <button
          className="navbar-toggler border-secondary"
          type="button"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleToggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarContent">
          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-3 ms-auto mt-3 mt-lg-0">
            <div className="input-group" style={{ minWidth: '240px' }}>
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Buscar película o elenco..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setSearch('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>

            <button
              className={`btn ${showFavoritesOnly ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning'} d-flex align-items-center justify-content-center gap-2`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <i className="bi bi-bookmark-star-fill"></i>
              <span>{showFavoritesOnly ? 'Ver Todas' : 'Mis Favoritos'}</span>
              {favCount > 0 && (
                <span className="badge bg-danger rounded-pill">{favCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};