import React from "react";
import styled from "styled-components";

function DashboardNav() {
  let user;
  user = localStorage.getItem("user");
  return (
    <Container>
      <LogoImg>
        <img src="./images/QuicHealth-1.png" alt="" />
      </LogoImg>
      <UserName>
        <Image>
          <img
            src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
            alt=""
          />
        </Image>
        <Name> {user}</Name>
      </UserName>
    </Container>
  );
}

export default DashboardNav;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  @media (max-width: ${700}px) {
    padding: 0.5em 1em;
    //padding-top: 1em;
  }
`;

const LogoImg = styled.div`
  width: 4em;
  position: relative;
  img {
    position: absolute;
    margin-top: -1.5em;
    width: 170px;
    @media (max-width: ${500}px) {
      //height: 11em;
      width: 170px;
      //height: 72px;
      position: absolute;
      margin-top: -2.5em;
      //width: 10em;
    }
  }
  @media (max-width: ${700}px) {
    width: 2em;
  }
`;

const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  align-items: center;
  height: unset;
  @media (max-width: ${500}px) {
    height: 5.8em;
  }
`;

const Image = styled.div`
  padding-right: 1em;
  > img {
    width: 1.5em;
    border-radius: 100%;
    object-fit: contain;
  }
  @media (max-width: ${500}px) {
    display: none;
  }
`;
const Name = styled.h3`
  font-size: 18px;
  @media (max-width: ${500}px) {
    font-size: 13px;
    display: none;
  }
`;
