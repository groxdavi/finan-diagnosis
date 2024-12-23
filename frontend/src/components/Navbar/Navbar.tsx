import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import "./Navbar.css"


const Navbar: React.FC = () => {
  const { logout,user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <nav>
      <ul>
      {!user ? (
        <>
        <li>
          <button><Link to="/">Inicio</Link></button>
        </li>
        <li>
          <button><Link to="/diagnosis">Diagnóstico</Link></button>
        </li>
            <li>
              <button><Link to="/login">Iniciar sesión</Link></button>
            </li>
            <li>
              <button><Link to="/register">Crear cuenta</Link></button>
            </li>
          </>
        ) : (
          <>
          <li>
          <button><Link to="/">Inicio</Link></button>
        </li>
        <li>
          <button><Link to="/diagnosis">Diagnóstico</Link></button>
        </li>
          <li>
          <Link to="/profile" ><button>Mi perfil</button></Link>
        </li>
        <li>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </li></>
          
        )}
      </ul>
    </nav>
  );
};

export default Navbar;