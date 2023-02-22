import React from "react";
import styled from "styled-components";
import { SectionChild } from "./OurServices";

function AboutUs() {
  return (
    <Container>
      <SectionWrapper>
        <Section>
          <SectionChild
            Title={"About Us"}
            Body={
              "QuicHealth is a unique digital healthcare platform whose objectives is to bridge the gap between patients and doctors. We bring you affordable, quality healthcare services at the comfort of your home"
            }
          />
          <SectionBody></SectionBody>
        </Section>

        <Section>
          <SectionChild
            Title={"Our Mission"}
            Body={
              "We provide timely access to services when it is needed in the most cost-effective way leveraging on technology to satisfy the adult men and wommen, lactating mothers, pregnant women and people willing to get treated through Naturopathic approach (natural medicine) "
            }
          />
        </Section>
        <Section>
          <SectionChild
            Title={"Our Vision"}
            Body={
              "Our vision is to bring quality, trusted and smooth healthcare service to the comfort of every Nigerian home, to promote safety and good health across the nation. We aim to improve the welllbeing of men and women in the 36 states of Nigeria."
            }
          />
        </Section>
        <Section>
          <SectionChild
            Title={"Our Values"}
            Body={
              "Our care values are empathy, security, reliability,, quality and integrity. We believe that patients always come first and are commited to giving them the best at all time. We also aim to improve the satisfaction of the patient expericence"
            }
          />
        </Section>
      </SectionWrapper>
      <SectionTitle></SectionTitle>

      <SectionBody></SectionBody>
    </Container>
  );
}

export default AboutUs;

const Container = styled.div``;

const SectionWrapper = styled.div`
  width: 100%;
  background-color: #f3f3f6;
  padding-bottom: 8em;
`;
const Section = styled.div`
  position: relative;
  text-align: center;
  width: 60%;
  margin: 0 auto;

  &:nth-child(1) {
    > div > h4 {
      font-size: 1.7rem;
      padding: 0;
      text-transform: uppercase;
    }
  }

  > div > h4 {
    font-size: 1.3em;
    padding: 0;
  }
`;
const SectionTitle = styled.h1``;
const SectionBody = styled.p``;
