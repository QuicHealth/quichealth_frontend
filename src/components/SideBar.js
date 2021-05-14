import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import BackIcon from '@material-ui/icons/ArrowBack'
import DateIcon from '@material-ui/icons/DateRange';
import Notification from '@material-ui/icons/NotificationsOutlined'
import HistoryIcon from '@material-ui/icons/BusinessCenterOutlined'
import UserIcon from '@material-ui/icons/PermIdentityOutlined'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import InfoIcon from '@material-ui/icons/InfoOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined'


function SideBar() {

    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => setIsOpen(!isOpen);
    localStorage.setItem('open', isOpen)
    return (
        <Container style={isOpen? {backgroundColor:" #fafafb"}:  {backgroundColor:" #fff"}}>
                <IconBox style= {isOpen ? { transform: "perspective(1200px) rotateX(0deg)", opacity:1}: {transform: "perspective(1200px) rotateY(90deg)", opacity:0}}><IconButton >{isOpen ? <MenuIcon onClick={toggleOpen} />: ""}</IconButton></IconBox>
                <List style= {isOpen ? { transform: "perspective(1200px) rotateX(90deg)"}: {transform: "perspective(1200px) rotateX(0deg)"}}>
                    <BackArrow><IconButton>{!isOpen ? <BackIcon onClick={toggleOpen} />: ""}</IconButton></BackArrow>
                    <StyledLink to = "dashboard-overview" activeClassName="active">
                        <ListIcon><HomeIcon /></ListIcon>
                        <ListName>Overview</ListName>
                    </StyledLink>

                    <StyledLink to ="/appointments" activeClassName="active">
                        <ListIcon>
                            <DateIcon />
                        </ListIcon>
                        <ListName>Appointments</ListName>
                    </StyledLink>

                    <StyledLink to ="/notifications" activeClassName="active">
                        <ListIcon><Notification /></ListIcon>
                        <ListName>Notifications</ListName>
                    </StyledLink>

                    <StyledLink to ="/history" activeClassName="active">
                        <ListIcon><HistoryIcon /></ListIcon>
                        <ListName>History</ListName>
                    </StyledLink>
                    <StyledLink to ="/health-profile" activeClassName="active">
                        <ListIcon><UserIcon /></ListIcon>
                        <ListName>Health Profile</ListName>
                    </StyledLink>
                    <StyledLink to ="/settings" activeClassName="active">
                        <ListIcon><SettingsIcon /></ListIcon>
                        <ListName>Settings</ListName>
                    </StyledLink>
                    <StyledLink to ="/help" activeClassName="active">
                        <ListIcon><InfoIcon /></ListIcon>
                        <ListName>Help</ListName>
                    </StyledLink>
                    <ListItem>
                        <ListIcon><LogoutIcon/></ListIcon>
                        <ListName>Signout</ListName>
                    </ListItem>
                </List>
        </Container>
    )
}

export default SideBar

const Container = styled.div`
//padding: 1em;
   // width: 15em;
   position:relative;
   transition: all 400ms ease;
`;
const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    transform-origin: left;
    transform:perspective(1200px) rotateX(90deg);
    transition: all 400ms ease;
    &.active{
            transform: perspective(1200px) rotateY(0deg);
        }
   
`;
const IconBox = styled.div`
    position: absolute;
    left: 0;
    padding-left: 2em;
    cursor: pointer;
    transform-origin: left;
    transform: perspective(1200px) rotateX(0deg);
    opacity:1;
    transition: all 600ms  ease;
    
    >button>span>.MuiSvgIcon-root{
        font-size: 2em;
        color: #070647;
    }
    &:hover{
       // opacity: .6;
    }
`;
const StyledLink = styled(NavLink)`
    opacity: .4;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: baseline;
    padding-bottom: .5em;
    font-weight: 600;
    text-decoration: none;
    color: #000000;
    &:hover{
        cursor: pointer;
        opacity: .8;
    }

    &.active{
        padding-left: 1em;
        opacity: 1;
        background-color: #fafafb;
        border-left: 10px solid #070647;
        color: #070647;
        @media (max-width: ${800}px) {
                padding-left: .5em;
                border-left: 5px solid #050445
            }
        @media (max-width: ${500}px) {
            padding-left: 0em;
        }
        }
`;

const ListItem = styled.li`
    opacity: .4;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: baseline;
    padding-bottom: .5em;
    font-weight: 600;

    &:hover{
        cursor: pointer;
        opacity: .8;
    }

    &.active{
        padding-left: 1em;
        opacity: 1;
        background-color: #fafafb;
        border-left: 10px solid #050445;
            @media (max-width: ${800}px) {
                padding-left: .5em;
                border-left: 5px solid #050445;
            }
    
        }
`;
const BackArrow = styled.li`
        opacity: 1 !important;
        text-align: right;
        padding-right: 1em;
        width: 100%;

        &:hover{
        cursor: pointer;
        opacity: .8;
    }
`;
const ListIcon = styled.span`
    position: relative;
    top: .5em;
    padding-right :.5em;
    padding-left: 2em;

    @media (max-width: ${800}px) {
            padding-left: 1.5em;
        }
    
    .MuiSvgIcon-root{
        font-size:2em;
        @media (max-width: ${700}px) {
            font-size: 1.5em;
        }
    
    }
`;
const ListName = styled.span`

    @media (max-width: ${700}px) {
        display: none;
        }
    @media (max-width: ${800}px) {
       font-size: 13px;
    }

`;
