import React from 'react';
import styled from 'styled-components';
import {Container, Subsection,SectionChild } from './OurServices'
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

    const detail= <>Get started and consult with an ID specialist for as low as <br /> <span style={{fontSize:"2em"}}>N1000</span></>
    return (
        <Container>
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

const SectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 1em;
    width: 80%;
    margin: 0 auto;
    position: relative;
`;

const WaveImg = styled.img`
    position: absolute;
    left: -8em;
    top: -4em;
    width: 60% !important;
    height: 30em !important;
`;
const StartImg = styled.div`
    display: flex;
    align-items: flex-end;

    >img{
        width: 80%;
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
    padding-bottom: 16em;
    position: relative;
    >div >h1{
        font-size: 1.5em;
    }

    >div>div>div{
        border-radius: 20px;
        text-align: center;
        margin-top: 0em !important;
        width: 15em;
    }

`;