import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import Nav from './Nav';

const Header = () => {
  return (
    <MainHeader>
      <div className="aligned">
        <NavLink to="/">
            <img title="Cognizant Technology Solutions" alt="Cognizant Technology Solutions" width="200" height="30" src={logo} />
        </NavLink>
        <span>| Cheers</span>
      </div>
      <Nav />
    </MainHeader>
  );
}

const MainHeader = styled.section`
  .aligned{
    float: left;
    margin-left: 200px;
    text-align: center;
  }
  span {
    font-size: 20px; 
    float: right;
  }
  @media screen and (max-width: 768px) {
    .aligned{ 
      display: block;
      padding-top: 10px;
      margin-left: auto;
    }
    span{
      position: absolute;
    }
  }
`;

export default Header;
