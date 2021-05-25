import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import {TermsParagraph, AlreadyHaveAccount, InputLabel, RegisterMinContainer,FormContainer, InputContainer} from "./RegisterBody";
import {Slidein} from './RegisterBody'

function SigninBody() {
    return (
        <Container>
            <RegisterMinContainer >
                <h1>Sign in</h1>
                <FormContainer>
                    <InputContainer>
                        <InputLabel htmlFor="email"> Email</InputLabel>
                        <div style={{display: "grid"}}> 
                            <Input type="email" placeholder="example@xxx.com"/> 
                        </div>
                        <br />

                        <InputLabel htmlFor="password"> Password</InputLabel>
                        <div style={{display: "grid"}}> 
                            <Input type="password" placeholder=""/> 
                        </div>
                        <br />

                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <AlreadyHaveAccount style={{padding: 0}}><StyledLink to="/reset-password">Forgot password? </StyledLink></AlreadyHaveAccount>  
                        <AlreadyHaveAccount style={{padding: 0}}>Dont have an account? <StyledLink to="/signin"><b>CreateAccount</b></StyledLink> </AlreadyHaveAccount>
                        </div>
                        
                        <br />
                        <br />
                        <submit type="submit"> Continue </submit>
                        <br />
                    
                    </InputContainer>
                </FormContainer>
            </RegisterMinContainer>

            <TermsParagraph style={{paddingTop: "1em"}}> By Clicking <StyledLink to="/signin">"Continue"</StyledLink>, you are agreeing to the QuicHealth Terms of</TermsParagraph>
            <TermsParagraph> Use, Privacy Policy, and Telehealth Consent Policy</TermsParagraph> 
        </Container>
    )
}

export default SigninBody

const Container = styled.div`
    background-color: #fafafb;
    margin: 0em .8em;
    border-radius: 15px;
    height: 100vh;
    width: 98%;
    padding-top:3em;
    font-size: 1em;
    transform-origin: right;
    animation: ${Slidein} 500ms 0s ease-in-out;
`;

const Input = styled.input`
    padding: .6em 2em .6em 1em;
    border-radius: 14px;
    border: 1px solid #2fa5a9;
    outline: none;
    ::placeholder{
         color: #bdbdbe;
    }
`;

const StyledLink =styled(Link)`
    text-decoration: none;
    color: #070647;

    &:hover{
        cursor: pointer;
        opacity:.8;
        transition: all .3s;
    }
`;
