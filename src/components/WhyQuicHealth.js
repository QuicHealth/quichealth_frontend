import React from 'react';
import styled from 'styled-components';
import { Subsection,SectionChild } from './OurServices'

function WhyQuicHealth({sectionRef}) {
   const alignLeft = {margin: "1em auto 2em auto"};
    return (
        <Container   className="fadeIn" >
            <div>
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
            </div>

        </Container>
    )
}

export default WhyQuicHealth;

export const Container = styled.div`
    margin-top:10em;
`;

const SubsectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3em;
    width: 80%;
    margin: 0 auto;
    position: relative;
`;
const Segment = styled.div`
    width: 90%;
    margin:1em;
    text-align:center;

    >div{
        justify-content: center;

        >img{
            width: 9em;
            height: 8em;
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
    }
`;
