import React from 'react';
import styled from 'styled-components';
import { AnimateBtn } from './LandingSection';

export const Subsection = ({Title, Body}) => {
    return (
        <>
            <SectionSplit></SectionSplit>
            <SectionName>{Title}</SectionName>
            <SectionBody>{Body}</SectionBody>
        </>
        )
    }
export const SectionChild = ({ImgUrl, Split,SplitStyle,Title, Body}) => {
    return (
        <>
            <ImgBox><img src={ImgUrl} alt="" /></ImgBox>
            <ServiceChild>
                <h4>{Title}</h4>
                { Split ?( <SectionSplit style={SplitStyle}></SectionSplit>): "" }
                <p>{Body}</p>
            </ServiceChild>
        </>
    )
}

function OurServices({sectRef}) {
    console.log(sectRef)
    return (
        <Container  ref={sectRef} className="fadeIn" > 
        <div >
        <Subsection  Title={"Our Services"} Body={""}/>
            <SectionContainer >
                <Left>
                    <ServiceBody>
                        <SectionChild
                            ImgUrl={"./images/service1.png"}
                            Title={"Infection Diseases Management"} 
                            Body={"Via our specialized healthcare approach, our ID specialists can help you manage infectious conditions."}
                        />
                    </ServiceBody>
                </Left>
                <Left>
                    <ServiceBody>
                        <SectionChild
                            ImgUrl={"./images/service2.png"}
                            Title={"Schedule an appointment "} 
                            Body={"Schedule/terminate online or offline appointment with out league of specialists at any convenient timethat works best for you."}
                        />
                    </ServiceBody>
                </Left>
            </SectionContainer>
            <SectionContainer >
                <Left>
                    <ServiceBody>
                        <SectionChild
                                ImgUrl={"./images/service3.png"}
                                Title={"Online Consultation"} 
                                Body={"QuicHealth has easy-to-use features that provide a worthwhile experience via an online consultation with our specialists"}
                            />
                    </ServiceBody>
                </Left>
                <Left>
                    <ServiceBody>
                        <SectionChild
                                ImgUrl={"./images/service4.png"}
                                Title={"Physical consultation"} 
                                Body={"Our platform provides access to ID specialists physically for consulation if they need arise."}
                            />
                    </ServiceBody>
                </Left>
            </SectionContainer>
        </div>
        </Container>
    )
}

export default OurServices

export const Container = styled.div`
    margin-top:7em;
    //animation: ${AnimateBtn} 2s 2s ease backwards;
  // height: 500px;
   //position: relative;
`;

export const SectionSplit = styled.div`
    width: 3em;
    height: 4px;
    margin: 0 auto;
    background-color: #070647;
`;
const SectionName = styled.h1`
    width: 100%;
    margin: 0 auto;
    color: #070647;
    text-align: center;
    padding-top: .2em;
    font-size: 2.5em;
`;
const SectionBody = styled.p`
    width: 60%;
    padding: 1em 0;
    margin: 0 auto;
    text-align: center;
    font-weight: 600;
    color: #0706474f;
`;

const  SectionContainer= styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 1em 4em;
    width: 70em;
    margin: 0 auto;
`;

const Left = styled.div`
    width: 27em;
    height: 12em;
    border-radius: 20px;
    border: 1px solid #9c9c9c4a;
    padding: 1em;
    margin: 0 auto;
    box-shadow: 3px 4px 14px 12px #0000000d;
    -webkit-box-shadow: 3px 4px 14px 12px #0000000d;
    -moz-box-shadow: 3px 4px 14px 12px #0000000d;    
    animation: ${AnimateBtn} 2s 1s ease backwards;
`;

const ServiceBody = styled.div`
    display: grid;
    grid-template-columns:30% 70%;
`;


const ImgBox = styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 1em;
    >img{
        width: 7em;
        height: fit-content;
    }
`;

export const ServiceChild = styled.div`

    > h4{
        font-size:900;
        padding: 1em 0;

    }
    >p {
        color: #070647;
        font-size: .8em;
        font-weight: 600;
        line-height: 1.7em;
        padding-bottom: 1em;
        color: #07064766;
    }
`;



