import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { BiUserCircle , BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";
import { FaHamburger } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

const Nav = () => {  

  let navigate = useNavigate();
  const [menuIcon, setMenuIcon] = useState(false);

  return (
  <Wrapper> 
    <div className='bod'> 
      <div>  
        <ul>
          <li>
            <div id="search-bar">
              <input type="text" placeholder="Search.."></input>
            </div>
          </li>
          <li className='search-icon'><BiSearchAlt2 /></li>
          <li className='right'>
            <div>
              <BiUserCircle />
            </div>
          </li>
          <li>
            <NavLink to="/cart">
                <AiOutlineShoppingCart />
            </NavLink>
          </li>
        </ul>
      </div>

      <hr/>
      <div className='wrap-class1'>
        <ul>
          <li>
            <NavLink to="/electronics">Electronics</NavLink>
          </li>
          <li>
            <NavLink to="/sports">Sports</NavLink>
          </li>
          <li>
            <NavLink to="/outdoor">Outdoor</NavLink>
          </li>
          <li>
            <NavLink to="/travel">Travel</NavLink>
          </li>
          <li>
            <NavLink to="/health">Health</NavLink>
          </li>
        </ul>
      </div>
      <hr/> 

      <div className='wrap-class2'>
        <label onClick={ ()=> navigate('/') }>Home</label> | <label onClick={ ()=> navigate('/cart') }>Shopping Cart</label>
      </div>
    </div>
    
    <div className={menuIcon ? "mobile_view" : "mobile_display"}>
      <ul style={{display: "contents"}} >
        <li>
          <NavLink to="/electronics" onClick={ ()=> {setMenuIcon(false);} }>Electronics</NavLink>  
        </li>
        <li>
          <NavLink to="/sports" onClick={ ()=> {setMenuIcon(false);}}>Sports</NavLink>
        </li>
        <li>
          <NavLink to="/outdoor" onClick={ ()=> {setMenuIcon(false);}}>Outdoor</NavLink>
        </li>
        <li>
          <NavLink to="/travel" onClick={ ()=> {setMenuIcon(false);} }>Travel</NavLink>
        </li>
        <li>
          <NavLink to="/health" onClick={ ()=> {setMenuIcon(false);} }>Health</NavLink>
        </li>
        <li className='right'>
          <div onClick={ ()=> {setMenuIcon(false);} }>
            <BiUserCircle />
          </div>
        </li>
        <li>
          <NavLink to="/cart" onClick={ ()=> {setMenuIcon(false);} }>
              <AiOutlineShoppingCart />
          </NavLink>
        </li>
      </ul>
    </div>

    <div className='icondiv'>
      <div className={menuIcon ? "mobile_display" : "navbar-icon hamburger"}>
        <FaHamburger  onClick={ () => { setMenuIcon(true) }}/>
      </div>
      <div className={menuIcon ? "navbar-icon close" : "mobile_display"}>          
        <AiOutlineCloseCircle onClick={ () => { setMenuIcon(false) }}/>
      </div>
    </div>
  </Wrapper>
 )}

const Wrapper = styled.section`
  .bod{
    margin-top: 15px;
  }
  .wrap-class1{
    width: 900px;
    margin : 0 auto;
  }
  .wrap-class2{
    width: 900px;
    margin : 0 auto;
    padding: 0 0 10px 18px;
    font-size : 11px;
  }
  ul {
    display: flex;
    padding: 0;
  }
  li {
    list-style-type: none;
    margin: 0 1rem;
  }
  #search-bar {
    display : flex;
    margin-left: 200px;
  }
  li.search-icon{
    margin-left: -35px;
  }
  .navbar-icon{
    display: none;
  }
  .mobile_view {
    display: none;
  }
  .mobile_display {
    display: none;
  }
  .active .navbar-icon {
    display: none;
    font-size: 4.2rem;
    position: absolute;
    top: 30%;
    right: 10%;
    color: black;
    z-index: 9999;
  }
  @media screen and (max-width: 768px) {
    li.search-icon{
      background-color: lightgreen;
    }
    .bod{
      display: none;
    }
    .navbar-icon.hamburger,
    .navbar-icon.close {
      display: block;
      position : absolute;
      top: 0;
      right: 0;
      padding-right: 15px;
      font-size: 1.5rem;
    } 
    .navbar-icon.close {
      z-index : 1;
      position : fixed;
    }
    .mobile_view{
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      position: fixed;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 2rem;
    }
    .mobile_display{
      display: none;
    }
  }

`;


export default Nav