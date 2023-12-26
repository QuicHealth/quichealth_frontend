import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import cancel from "./../../assets/cancel.png";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";

function Logout({ expert }) {
  const { setLogout } = useContext(SidebarCollapseContext);
  const handleLogout = () => {
    setLogout(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <BackdropContainer>
      <ModalContent>
        <ModalHeader>
          <h1>Log out</h1>
          <img src={cancel} alt="cancel" onClick={() => setLogout(false)} />
        </ModalHeader>
        <ModalBody>Are you sure you want to log out?</ModalBody>
        <ModalFooter>
          <p onClick={() => setLogout(false)}>Cancel</p>
          <NavLink to={expert ? "/expert-signin" : "/signin"}>
            <button onClick={handleLogout}>Log out</button>
          </NavLink>
        </ModalFooter>
      </ModalContent>
    </BackdropContainer>
  );
}

export default Logout;

export const BackdropContainer = styled.div`
  position: fixed;
  z-index: 1004;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex; //flex to display
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1em 1em 1em 1em;
  width: 30em;

  @media only Screen and (max-width: 768px) {
    margin: 0 1em;
    width: 25em;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    color: var(--grey);
  }
  img {
    width: 1.5em;
    height: 1.5em;
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2em;
  padding-top: 1em;
  border-top: 1px solid #d5d5d5;
  p {
    transition: all 0.2s;
    color: var(--grey);

    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      transform: scale(0.9);
    }
  }

  button {
    font-size: 17px;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    background-color: #ff3333;
    color: white;
    display: flex;
    align-items: center;
    gap: 1em;
    transition: all 0.2s;
  }
`;
export const ModalBody = styled.div`
  color: var(--grey);
  margin-top: 2em;
  margin-bottom: 5em;
`;
