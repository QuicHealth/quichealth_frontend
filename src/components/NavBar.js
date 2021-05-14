import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from '@material-ui/core';
import {StyledLink } from "./../components/RegisterBody"

function NavBar() {

    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => setIsOpen(!isOpen);
    const  mobileListRef = useRef();
    
    //remove dropdown if escape is pressed or other element from the dropdown
    const keyPress = useCallback(
        (event) => {
            if(event.key ==="Escape" && mobileListRef.current){
                setIsOpen(true);
            }
        },
        [mobileListRef],
    )

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return ()=> document.removeEventListener('keydown', keyPress);
      }, [keyPress]
    )

    useEffect(() => {
        document.addEventListener('click', (event)=>{
            if(event.target.children.length >1){
                setIsOpen(true)
            }
        })
       
      }, []
    )

    return (
        <Container>
            <LogoImg>
                <div>
                    <img src="./images/QuicHealth 1.png" alt="" />
                </div>
                <NavbarIcon>
                    <IconButton>
                       {isOpen? <MenuIcon onClick={toggleOpen}/>: <CloseIcon onClick={toggleOpen} /> } 
                    </IconButton>
                </NavbarIcon>
            </LogoImg>
                <List>
                    <div style={{display: "flex"}}> 
                    {/* Normal Navbar */}
                    <ListItem>About Us</ListItem>
                    <ListItem>Our Services</ListItem>
                    <ListItem>Pricing</ListItem>
                    <ListItem>Contact</ListItem>
                    </div>
                    <div style={{display: "flex"}}>
                        <ListItem><SignUpSpan><StyledLink to="/register" style={{color: "#ffffffd9"}}>Sign up</StyledLink></SignUpSpan></ListItem>
                    </div>
                </List>
                {/* DropDown Navbar  */}
                <MobileList  ref={mobileListRef} style= {isOpen ? {display: "none"}: {display: "grid"}}>
                    <ListItem>About Us</ListItem>
                    <ListItem>Our Services</ListItem>
                    <ListItem>Pricing</ListItem>
                    <ListItem>Contact</ListItem>
                        <ListItem><StyledLink to="/register">Sign up</StyledLink></ListItem>
                </MobileList>
                <DashboardNav></DashboardNav>
            
        </Container>
    )
}

export default NavBar;

const Container = styled.div`
    padding: 0 2em;
    display: flex;
    width: 100%;
    background-color: #f3f3f6;

    @media (max-width: ${700}px) {
        display: grid;
        grid-template-columns: 1fr;
        padding: 0;
    }
    
`;

const LogoImg = styled.div`
    display: flex;
    min-width: 7em;
    height: 5em;
    flex: 1;
    background-color:transparent;
    @media (max-width: ${700}px) {
        display: flex;
        flex: 0;
        justify-content: space-between;
        padding: 0 2em;
    }
    >div>img{
        width: 11em;
        margin-top: -1em;
    }
`;

const SignUpSpan=styled.span`
    background-color: #2fa5a9;
    color: #fff !important;
    padding: .5em 1.5em;
    border-radius: 20px;
    margin-left: 1em;
`;

const List = styled.ul`
    list-style: none;
    display: flex;
    padding: 2em 0 2em;
    justify-content: space-between;
    font-weight: 600;
    @media (max-width: ${700}px) {
        display: none;
    }

`;

const MobileList = styled.ul`
    display: none;
    @media (max-width: ${700}px) {
            display: grid;
            width: 100%;
            text-align: center;
            list-style: none;
            position: absolute;
            margin-top: 5em;
            padding: 0;
            background-color: white;
            transition: display 0.3s;
            }

`;

const ListItem =styled.li`
    padding-left: 3em;
    color: #070647;
    transition:all .5ms;

    &:hover{
        opacity: .4;
        cursor: pointer;
        transition: all .5s ;
    }
    @media (max-width: ${1016}px) {
        padding-left: 1rem;
    }

    @media (max-width: ${787}px) {
        padding-left: .5rem;
    }
    @media (max-width: ${700}px) {
        padding-bottom: 2em;
        padding-left: 0;
    }

`;

const NavbarIcon = styled.div`
    display: none;
  @media (max-width: ${700}px) {
        display: block;
        padding-top: 1em;
            > button {
                color: #020143 !important;
            }
    }
`;

const DashboardNav = styled.div``;
    