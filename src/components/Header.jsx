/* src/components/Header.jsx */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHome, FaList, FaFire, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Ajou Campus Foodmap
      </h1>
      <Nav>
        <NavLink to="/" className={isActive('/')}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/list" className={isActive('/list')}>
          <FaList /> List
        </NavLink>
        <NavLink to="/popular" className={isActive('/popular')}>
          <FaFire /> Popular Top 3
        </NavLink>
        <NavLink to="/submit" className={isActive('/submit')}>
          <FaPlus /> Submit New restaurant
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;