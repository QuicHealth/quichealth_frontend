import React from "react";
import styled from "styled-components";
import logo from "./../../assets/logo.png";
import linkedIn from "./../../assets/linkedIn.svg";
import twitter from "./../../assets/Twitter.svg";
import fb from "./../../assets/FB.svg";
import cp from "./../../assets/cp.svg";

function Footer() {
  return (
    <Container>
      <SubContainer>
        <Moto>
          <img src={logo} alt="logo" />
          <p>
            Healthcare Made Simple: Get Quality Medical Care at Your Fingertips
          </p>
          <SM>
            <img src={linkedIn} alt="linkIn" />
            <img src={twitter} alt="twitter" />
            <img src={fb} alt="fb" />
          </SM>
        </Moto>

        <Links>
          <Company>
            <Title>Company</Title>
            <Subtitle>About Us</Subtitle>
            <Subtitle>Team</Subtitle>
            <Subtitle>Board</Subtitle>
            <Subtitle>Careers</Subtitle>
          </Company>
          <Resources>
            <Title>Resources</Title>
            <Subtitle>Pricing</Subtitle>
            <Subtitle>FAQs</Subtitle>
            <Subtitle>Terms of Use</Subtitle>
            <Subtitle>Privacy Policy</Subtitle>
          </Resources>
          <Contact>
            <Title>Contact</Title>
            <Subtitle>Lagos, Nigeria</Subtitle>
            <Subtitle>+234 801 234 567</Subtitle>
            <Subtitle>Quichealth@gmail.com</Subtitle>
          </Contact>
        </Links>
      </SubContainer>
      <CopyRight>
        <img src={cp} alt="cp" />
        <p>2023 QuicHealth | All Rights Reserved</p>
      </CopyRight>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  width: 100%;
`;

const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  position: relative;
  width: 100%;
  padding: 3rem 5rem;
  align-items: center;

  @media only Screen and (max-width: 64em) {
    padding: 2rem 3rem;
    display: block;
  }
  @media only Screen and (max-width: 40em) {
    padding: 2rem 1.5rem;
  }
`;

const Moto = styled.div`
  display: flex;
  flex-direction: column;
  width: 10em;
  //padding: 2rem 5rem;

  img {
    width: 10em;
  }

  p {
    padding: 1.5em 0;
    color: var(--grey);
    line-height: 17.55px;
    font-size: 14px;
  }

  @media only Screen and (max-width: 64em) {
    padding: 2em 0;
    width: 100%;
  }
`;
const Resources = styled.div``;
const Company = styled.div``;
const Contact = styled.div``;
const SM = styled.div`
  img {
    width: 1.5em;
    height: 1.3em;
    margin-right: 1em;
  }
`;
const Title = styled.h4`
  color: var(--darkGreen);
  margin-bottom: 1em;
  font-size: 16px;
`;
const Subtitle = styled.p`
  color: var(--grey);
  padding: 0.5em;
  line-height: 17.55px;
  font-size: 13px;
`;

const CopyRight = styled.div`
  padding: 2em 5em;
  display: flex;
  border-top: 1px solid #e5e5e5;

  img {
    width: 2em;
    padding-right: 1em;
  }

  @media only Screen and (max-width: 64em) {
    padding: 2em 2em;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
`;
