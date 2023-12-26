import React from "react";
import styled from "styled-components";
import Hero from "../components/HomePage/Hero";
import HowItWorks from "../components/HomePage/HowItWorks";
import WhyUs from "../components/HomePage/WhyUs";
import FAQ from "../components/HomePage/FAQ";
import GetStarted from "../components/HomePage/GetStarted";
import Footer from "../components/HomePage/Footer";

function Homepage() {
  return (
    <Container>
      <Hero />
      <HowItWorks />
      <WhyUs />
      <FAQ />
      <GetStarted />
      <Footer />
    </Container>
  );
}

export default Homepage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
