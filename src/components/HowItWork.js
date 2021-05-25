import React from 'react';
import styled from 'styled-components';
import { Subsection,SectionChild } from './OurServices'
import { GetStarted} from './LandingSection';

const Dots = () =>{
    return(
        <Elypsis>
            <img src="./images/Ellipse.png" alt="" />
            <img src="./images/Ellipse.png" alt="" />
            <img src="./images/Ellipse.png" alt="" />
            <img src="./images/Ellipse.png" alt="" />
        </Elypsis>
    )
}

function HowItWork() {

    const detail= <>Get started and book a consulation with a medical specialist for as low as <br /> <span style={{fontSize:"2em"}}>N1000</span></>
    return (
        <Container className="fadeIn">
             <Subsection Title={"How it Works"} Body={""}/>
             <SectionContainer>
                <Section>
                    <SectionChild 
                        ImgUrl={"./images/work1.png"}
                        Title={"Sign Up"} 
                        Body={"Set up your QuicHealth account profile including the required basic health information"}
                    />
                    <Dots />
                </Section>
                <Section>
                    <SectionChild 
                          ImgUrl={"./images/work2.png"}
                        Title={"Select Plan"} 
                        Body={"Purchase a scheduling plan that works with your wallet"}
                    />
                    <Dots />
                </Section>
                <Section>
                    <SectionChild 
                        ImgUrl={"./images/work3.png"}
                        Title={"Book appointment"} 
                        Body={"Search for the nearest QuicHealth partner hospital and bool an online or offline appointment with an ID specialist"}
                    />
                    <Dots />
                </Section>
                <Section>
                    <SectionChild 
                        ImgUrl={"./images/work4.png"}
                        Title={"Save Time, Save Money"} 
                        Body={"Time is Money, save both on QuicHealth"}
                    />
                </Section>
             </SectionContainer>
             <GetStartedBox>
                <StartImg>
                    <img src="./images/cons.png" alt="" />
                    <WaveImg src="./images/wave_con.png" alt="" />
                </StartImg>
                <GetStarted secondh1={detail} buttonName={"Let's Get Started"}/>
             </GetStartedBox>
        </Container>
    )
}

export default HowItWork;

const Container = styled.section`
  height: 100%;
  margin-bottom: 10em;

  @media (max-width: ${500}px) {
       padding-top: 45em;
      
    }
`;

const SectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 1em;
    width: 100%;
    padding: 0 5em;
    margin: 0 auto;
    position: relative;
    @media (max-width: ${500}px) {
       grid-template-columns: 100%;
    }
`;

const WaveImg = styled.img`
    position: absolute;
    left: -8em;
    top: -5em;
    width: 50% !important;
    height: 40em !important;
`;
const StartImg = styled.span`
    display: flex;
    align-items: flex-end;

    >img{
        width: 70%;
        height: fit-content;
    }
`;

const Elypsis = styled.span`
    position: absolute;
    top: 3em;
    right: -3em;
    >img{
        padding-left: .5em;
    }
`;

const Section = styled.div`
    width: 90%;
    margin:1em;
    text-align: center;
    position: relative;
    >div{
        justify-content: center;

        >img{
            width: 8em;
            height: 8em;
        }
    }
`;

const GetStartedBox = styled(SectionContainer)`
    grid-template-columns: 1fr 1fr;
    //padding-bottom: 22em;
    position: relative;
        >div{
            padding: 10em 0em 0em 0em;
            h1{
            font-size: 2em;
        }
    }

    >div>div>div{
        border-radius: 20px;
        text-align: center;
        margin-top: 0em !important;
        width: 15em;
    }

`;