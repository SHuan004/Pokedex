import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/outline'; // Asegúrate de tener esta librería instalada

const Header = () => {
  return (
    <Navbar color="danger" dark expand="lg" className="px-4 lg:px-6 h-14">
      <Link to="/"  className="navbar-brand d-flex align-items-center">
        <PlayIcon className="h-6 w-6" />
        <span className="sr-only">Poke Explorer</span>
      </Link>
      <Nav className="ml-auto d-flex gap-4 sm:gap-6" navbar>
        <NavItem>
          <NavLink tag={Link} to="/" className="text-sm font-medium hover:underline underline-offset-4 text-white">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/index" className="text-sm font-medium hover:underline underline-offset-4 text-white">
            Index
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/favorites" className="text-sm font-medium hover:underline underline-offset-4 text-white">
            Favorites
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
