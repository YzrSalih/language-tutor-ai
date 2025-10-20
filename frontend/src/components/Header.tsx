import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MessageCircle, BookOpen, Home } from 'lucide-react';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.$isActive ? '#fff' : 'rgba(255, 255, 255, 0.8)'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <MessageCircle size={28} />
          Language Tutor AI
        </Logo>
        <NavLinks>
          <NavLink to="/" $isActive={location.pathname === '/'}>
            <Home size={20} />
            Ana Sayfa
          </NavLink>
          <NavLink to="/chat" $isActive={location.pathname === '/chat'}>
            <MessageCircle size={20} />
            Sohbet
          </NavLink>
          <NavLink to="/lessons" $isActive={location.pathname === '/lessons'}>
            <BookOpen size={20} />
            Dersler
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
