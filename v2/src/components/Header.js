import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "./../assets/logo.png";

function Header() {
  const [click, setClick] = useState(false);
  return (
    <Headers>
      <Logo>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </Logo>
      <Nav>
        <a href="#howitwork">How it works</a>
        <a href="#contact">Contact us</a>
        <a href="#faq">FAQ</a>
      </Nav>
      <Nav>
        <NavLink className="btn" to="/signin">
          <Button className="signIn">Sign in</Button>
        </NavLink>
        <NavLink className="btn" to="/signup">
          <Button>Sign up</Button>
        </NavLink>
      </Nav>

      <HamburgerBtn onClick={() => setClick(!click)} clicked={click}>
        <span />
      </HamburgerBtn>

      <MobileMenu clicked={click}>
        <a href="#howitwork">How it works</a>
        <a href="#contact">Contact us</a>
        <a href="/#faq">FAQ</a>

        <NavLink className="btn" to="/signin">
          Sign in
        </NavLink>
        <NavLink className="btn" to="/signup">
          Sign Up
        </NavLink>
      </MobileMenu>
    </Headers>
  );
}

export default Header;

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 5rem;
  position: relative;
  z-index: 500;

  @media only Screen and (max-width: 64em) {
    padding: 2rem 3rem;
  }
  @media only Screen and (max-width: 40em) {
    padding: 2rem 1.5rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: calc(7rem + 5vw);
  height: auto;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  a {
    /* font-weight: 600; */
    color: var(--grey);
    line-height: 1.5;
    padding-left: 1.5rem;

    &::after {
      content: "";
      display: block;
      height: 3px;
      width: 3px;
      background: transparent;
      transition: width 0.5s;
    }

    &:not(.btn):hover::after {
      width: 100%;
      background: var(--lightGreen);
    }
  }

  @media only Screen and (max-width: 750px) {
    display: none;
  }
`;

export const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 10px;
  color: var(--white);
  background: var(--lightGreen);
  border: 1px solid var(--lightGreen);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  &.signIn {
    border: 1px solid var(--lightGreen);
    background: transparent;
    color: var(--lightGreen);
  }
  &.faq {
    margin-top: 3em;
    font-size: 1.3em;
    background: var(--white);
    color: var(--lightGreen);

    @media only Screen and (max-width: 768px) {
      font-size: 1em;
      padding: 1em;
      margin-top: 2em;
    }
  }
  @media only Screen and (max-width: 820px) {
    padding: 0.5rem 1rem;
  }
`;

export const HamburgerBtn = styled.button`
  position: relative;
  background-color: ${(props) =>
    props.clicked ? "transparent" : "var(--darkGreen)"};
  height: 2px;
  width: 2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: none;

  @media only Screen and (max-width: 768px) {
    display: inline-block;
  }

  &::before,
  &::after {
    content: "";
    background-color: var(--darkGreen);
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    cursor: pointer;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  &.dashboard {
    z-index: ${(props) => (props.clicked ? "7" : "7")};
    &::before,
    &::after {
      background-color: ${(props) =>
        props.clicked ? "var(--white)" : "var(--darkGreen)"};
    }
  }

  @media only Screen and (max-width: 350px) {
    &.dashboard {
      height: 2px;
      width: 1.5rem;

      &::before,
      &::after {
        width: 1.5rem;
        height: 2px;
      }
    }
  }
`;

const MobileMenu = styled.nav`
  display: none;

  @media only Screen and (max-width: 48em) {
    display: ${(props) => (props.clicked ? "flex" : "none")};
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.clicked ? "1" : 0)};
  visibility: ${(props) => (props.clicked ? "1" : 0)};
  background: var(--lightGreen);
  border-radius: 10px;
  margin: 0.5rem;
  overflow-x: hidden;
  transition: all 0.7s ease;

  a {
    color: var(--white);
    font-weight: 500;
    font-size: 1.2rem;
    margin: 1.5rem;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;
