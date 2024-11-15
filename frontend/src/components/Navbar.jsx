import React, { useState } from 'react'
import styled from 'styled-components' ;
import {Link as LinkR,  } from 'react-router-dom';
import { MenuRounded} from '@mui/icons-material' ;
 
const Nav = styled.div`
    background-color: inherit;
    height:80px;
    display: flex; 
    align-items : center; 
    justify-content: center; 
    position: sticky ;
    top:0 ;
    z-index:10;
    color:red ;
`;


const NavbarContainer = styled.div`
    width : 100% ;
    max-width : 1200px;
    display: flex; 
    padding: 0 24px ;
    align-items : center; 
    justify-content: space-between; 
    font-size: 1rem ;
`;
 
 
const NavItems = styled.ul`
    display: flex; 
    align-items : center; 
    justify-content: center;
    width: 100% ;
    gap : 32px ;
    padding : 0 6px ;
    list-style: none ;
    @media screen and (max-width: 760px){
    display: none ;
    }
`;

const NavLink = styled.a`
  color :white ;
  font-weight : 500 ;
  cursor: pointer ;
  transition: all 0.2s ease-in-out ;
  text-decoration: none; 
  &:hover{
 
      color: red ;
  }
`;
 
 

const MobileIcon = styled.div`
    height: 100% ;
    color : white ;
    display: flex ;
    align-items: center; 
    display : none  ;
    @media screen and (max-width : 760px){
        display: block;
    }
    cursor: pointer; 
`;

const MobileMenu = styled.ul`
    display: flex; 
    align-items : start; 
    flex-direction: column ;
    width: 100% ;
    gap : 16px ;
    padding : 0 6px ;
    list-style: none ;
    width: 100%;
    padding: 12px 40px 24px 40px ;
    background : #191924 + 99 ;
    display : none;
    @media screen and (max-width : 760px){
            display: inherit;
        }
    position : absolute ;
    top:80px ;
    right : 0 ;

    transition: all 0.6s ease-in-out ;
    transform : ${({isOpen}) => 
        isOpen ? "translateY(0)" : "translateY(-100%)"} ;
        border-radius: 0 0 20px 20px ;
        box-shadow: 0 0 10px 0 rgba(0 , 0 , 0 , 0.2); 
        opacity:${({isOpen}) => (isOpen ? "100%" : "0")};
        z-index: ${({isOpen}) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = () => {
    const [isOpen , setIsOpen] = useState(false) ;

  return (
    <Nav>
    <NavbarContainer>
   
        <MobileIcon  onClick={() => setIsOpen(!isOpen)}>
            <MenuRounded style={{color: 'inherit'}}/>
        </MobileIcon>

        <NavItems>
            <NavLink href = "#About">About</NavLink>
            <NavLink href = "#About">About</NavLink>
            <NavLink href = "#about">about</NavLink>
            <NavLink href = "#About">About</NavLink>
            <NavLink href = "#Contact">Contact</NavLink>
        </NavItems>


        {
            isOpen &&   <MobileMenu isOpen= {isOpen}>
                                <NavLink href = "#About">About</NavLink>
                                <NavLink href = "#About">About</NavLink>
                                <NavLink href = "#about">about</NavLink>
                                <NavLink href = "#About">About</NavLink>
                                <NavLink href = "#Contact">Contact</NavLink>
                        </MobileMenu>          
        }
 
    </NavbarContainer>
    </Nav>
  )
}

export default Navbar
