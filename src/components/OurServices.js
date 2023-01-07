import React from "react";
import styled ,{ keyframes } from "styled-components";
import { AnimateBtn } from "./LandingSection";

export const Subsection = ({ Title, Body }) => {
  return (
    <>
      <SectionSplit></SectionSplit>
      <SectionName>{Title}</SectionName>
      <SectionBody>{Body}</SectionBody>
    </>
  );
};
export const SectionChild = ({ ImgUrl, Split, SplitStyle, Title, Body }) => {
  return (
    <>
      <ImgBox>
        <img src={ImgUrl} alt="" />
      </ImgBox>
      <ServiceChild>
        <h4>{Title}</h4>
        {Split ? <SectionSplit style={SplitStyle}></SectionSplit> : ""}
        <p>{Body}</p>
      </ServiceChild>
    </>
  );
};

function OurServices() {
  return (
    <Box className="fadeIn">
        <Subsection Title={"Our Services"} Body={""} />
        <SectionContainer>
          <Left>
            <ServiceBody>
              <SectionChild
                ImgUrl={"./images/service1.png"}
                Title={"Infection Diseases Management"}
                Body={
                  "Via our specialized healthcare approach, our ID specialists can help you manage infectious conditions."
                }
              />
            </ServiceBody>
          </Left>
          <Left>
            <ServiceBody>
              <SectionChild
                ImgUrl={"./images/service2.png"}
                Title={"Schedule an appointment with ID specialists."}
                Body={
                  "Schedule/terminate online or offline appointment with out league of specialists at any convenient timethat works best for you."
                }
              />
            </ServiceBody>
          </Left>
        </SectionContainer>
        <SectionContainer>
          <Left>
            <ServiceBody>
              <SectionChild
                ImgUrl={"./images/service3.png"}
                Title={"Online Consultation"}
                Body={
                  "QuicHealth has easy-to-use features that provide a worthwhile experience via an online consultation with our specialists"
                }
              />
            </ServiceBody>
          </Left>
          <Left>
            <ServiceBody>
              <SectionChild
                ImgUrl={"./images/service4.png"}
                Title={"Physical consultation"}
                Body={
                  "Our platform provides access to ID specialists physically for consulation if they need arise."
                }
              />
            </ServiceBody>
          </Left>
        </SectionContainer>
    </Box>
  );
}

export default OurServices;


export const Slideup = keyframes`
  0%{
    transform: scaley(0);
    opacity: 0;
    
  }
  100%{
    transform: scaley(1);
    opacity: 1;
  }
`

export const Box = styled.section`
  height: 100vh;
  //animation: ${Slideup} 2s ease-in-out;
  transform-origin: bottom;
  position: relative;
`;

export const SectionSplit = styled.div`
  width: 4em;
  height: 4px;
  margin: 0 auto;
  border: 4px solid #070647;
  background-color: #070647;
  @media (max-width: ${500}px) {
       border:2px solid #070647;
       width: 3em;
      
    }
`;

const SectionName = styled.h1`
  width: 100%;
  margin: 0 auto;
  color: #070647;
  text-align: center;
  padding-top: 0.2em;
  font-size: 3.1em;
  margin-bottom: 1em;
  @media (max-width: ${500}px) {
       font-size: 24px;
       line-height: 36px;
       font-weight: 700;
      
    }

`;
const SectionBody = styled.p`
  width: 80%;
  padding: 1em 0;
  font-size: 1.2em;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  color: #0706474f;
`;

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 1em 2em;
  //column-gap: 1em;
  //width: 0em;
  margin: 2em auto;
  @media (max-width: ${500}px) {
       grid-template-columns: 100%;
       padding:  0;
       margin: 0 auto;
      
    }
`;

const Left = styled.div`
  width: 95%;
  //height: 16em;
  border-radius: 20px;
  border: 1px solid #9c9c9c4a;
  padding: 1em;
  margin: 0 auto;
  box-shadow: 3px 4px 14px 12px #0000000d;
  -webkit-box-shadow: 3px 4px 14px 12px #0000000d;
  -moz-box-shadow: 3px 4px 14px 12px #0000000d;
  animation: ${AnimateBtn} 2s 1s ease backwards;
  @media (max-width: ${500}px) {
    //width: 95%;
    padding: 1em 0.5em;
    margin-bottom: 2em;
    width: 91%;
    height: unset;
    box-shadow: 0px 0px 47px 1px rgba(0, 0, 0, 0.12);
    border-radius: 33px;
    }
`;

const ServiceBody = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  column-gap: 1em;
  @media (max-width: ${400}px) {
    grid-template-columns: 35% 65%;
    }

`;

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1em;
  @media (max-width: ${500}px) {
    align-items: flex-end;
    }
  > img {
    width: 10em;
    height: fit-content;
    @media (max-width: ${500}px) {
       width:8em;
       height: 7em;
      
    }
  }
`;

export const ServiceChild = styled.div`
  > h4 {
    font-size: 1.5em;
    padding: 1em 0;
    @media (max-width: ${500}px) {
       font-size: 14px;
       font-weight: 700;
       line-height: 21px;
       padding-right: 1em;
       padding-bottom: .5em;
    }
    @media (max-width: ${400}px) {
       padding-right: 2em;
       padding-bottom: .5em;
    }
  }
  > p {
    color: #070647;
    font-size: 1.2em;
    //font-weight: 600;
    line-height: 1.7em;
    padding-bottom: 1em;
    padding-right: 2em;
    color: #07064766;
    @media (max-width: ${500}px) {
       font-size: 13px;
       line-height: 23px;
    }
    @media (max-width: ${390}px) {
       font-size: 11px;
       line-height: unset;
    }
  }
`;
