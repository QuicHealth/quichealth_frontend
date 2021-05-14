import React from 'react';
import styled from 'styled-components';
import { Waves } from './LandingSection'

function Footer() {
    return (
            <Contain>
            <Waves style={{position: "relative", marginBottom: "-3em"}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#413c98" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,176C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </Waves>
            <Container>
                <LeftBox>
                        <img style={{height: "3em"}} src="./images/QuicHealth2.png" alt="" />
                        <p>QuicHealth@gmail.coom</p>
                </LeftBox>
                <RightBox>
                    <Section>
                        <h3>Useful link</h3>
                        <p>Home</p>
                        <p>About Us</p>
                        <p>Our Services</p>
                        <p>How It Works</p>
                        <p>Contact </p>
                    </Section>
                    <Section style={{marginRight: "5em"}}>
                        <h3 className="center">Need help?</h3>
                        <p className="center">FAQs</p>
                        <p className="center">Privacy Policy</p>
                        <p className="center">Policy</p>
                        <p className="center">Support</p>
                        <p className="center">Terms & Conditions</p>
                    </Section>
                    <Section>
                        <h3 className="center">Follow Us</h3>
                        <p className="center"><i class="fab fa-facebook-square"></i></p>
                        <p className="center"><i class="fab fa-instagram"></i></p>
                        <p className="center"><i class="fab fa-twitter"></i></p>
                        <p className="center"><i class="fab fa-linkedin"></i></p>
                    </Section>
                </RightBox>
            </Container>
            <CopyRight>&#169; 2021 QuicHealths.All righta reserved</CopyRight>
        </Contain>
    )
}

export default Footer

const Contain = styled.div`
    margin-top: -11em;
`;
const Container = styled.div`
    display: grid;
    grid-template-columns:30% 70%;
    width: 100%;
    letter-spacing: -.5px;
    padding: 0 5em 3em 5em;
    margin: 0em auto 0 auto;
    background-color: #413c98;
    position: relative;

`;
const LeftBox = styled.div`
    display: grid;
    color: #e7e7f2;
    align-content: center;
    >img{
        height: 4em;
    }
    >p {
        font-size: .8em;
        font-weight: 600;
    }
`;
const RightBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap:1em;
    width: 100%;
    color: #e7e7f2;
    font-size: .7em;
`;

const Section = styled.div`

    >h3{
        &.center{
           // width:100%;
            text-align:center;
        }
        &.end{
           // width:100%;
            text-align:end;
        }
    }

    > p{
        padding: .5em 0;
        font-weight: 100;
        color: #e7e7f2eb;
        transition: all .5s;

            &.center{
           // width:100%;
            text-align:center;
        }
        &.end{
           // width:100%;
            text-align:end;
        }
        >i{
            font-size: 1.5em;
            padding-top: .3em;
        }
        &:hover{
            cursor: pointer;
            opacity:.6;
        }
    }
`;

const CopyRight = styled.span`
    position: relative;
    width: 100%;
    text-align: center;
    display: grid;
    color: #e7e7f2eb;
    font-size: 12px;
    background-color: #413c98;
    padding-bottom: 2em;
`;
