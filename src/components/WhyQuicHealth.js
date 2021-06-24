import React from 'react';
import styled from 'styled-components';
import { Subsection,SectionChild } from './OurServices'

function WhyQuicHealth() {
   const alignLeft = {margin: "1em auto 2em auto"};
    return (
        <Container className="fadeIn">
                <div> <Subsection Title={"Why use Quichealth?"} Body={""}/></div>
               
                <Waves>
                    <img src="./images/wave_why.png" alt="" />
                </Waves>
                <SubsectionContainer >
                    <Segment>
                        <SectionChild 
                        ImgUrl={"./images/why1.png"}
                        Title={"Quick Medical Appointment"} 
                        Split={true} 
                        SplitStyle={alignLeft}
                        Body={"Your health is important to us, so is your time. Schedule and terminate appointments via our user friendly platform or any time"}
                        />
                    </Segment>
                    <Segment>
                        <SectionChild 
                        ImgUrl={"./images/why2.png"}
                        Title={"Affordable Medical Bills"} 
                        Split={true} 
                        SplitStyle={alignLeft}
                        Body={"Time is Money. Save both via QuicHealth. Our payment plans have been tailored to suit your wallet"}
                        />
                    </Segment>
                    <Segment>
                        <SectionChild 
                        ImgUrl={"./images/why3.png"}
                        Title={"Geo-location feature"} 
                        Split={true} 
                        SplitStyle={alignLeft}
                        Body={"Schedule an appointmet at your comfort with the nearest specialist around you"}
                        />
                    </Segment>
                </SubsectionContainer>

        </Container>
    )
}

export default WhyQuicHealth;

export const Container = styled.section`
    //adding-top:10em;
    position: relative;
    padding: 10em 0;
    height: 100vh;
    margin-bottom: 10em;
    @media (max-width: ${500}px) {
        padding: 19em 0 0 0;
      
    }

`;

const SubsectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3em;
    //width: 80%;
    margin: 0 auto;
    position: relative;
    padding: 0 5em;
    @media (max-width: ${500}px) {
       grid-template-columns:100%;
       padding: 0 4em;
    }
`;
const Segment = styled.div`
    width: 90%;
    margin:1em;
    text-align:center;
    @media (max-width: ${500}px) {
       margin-bottom:5em;
      
    }

    >div{
        justify-content: center;
        height: 10em;
        >img{
            width: fit-content;
            //height: 8em;
            @media (max-width: ${500}px) {
                width: unset;
            }
        }
    }
    p{
        @media (max-width: ${500}px) {
            padding-right: 0;
            width: 90%;
            margin: 0 auto;
      
    }
    }

`;

const Waves = styled.div`
    position: absolute;
    right: 1em;
    height: 60%;
    width: fit-content;
    /* overflow: hidden; */
    display: flex;
    justify-content: flex-end;
    >img{
        width: 80%;
        height:30em;
        position: relative;
        right: -1em;
    }
`;
