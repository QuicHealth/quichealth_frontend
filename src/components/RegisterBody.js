import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
//import "./style.css";

function RegisterBody() {
    return (
        <Container>
            <RegisterMinContainer >
                <h1>Create Profile</h1>
                <FormContainer>
                    <InputContainer>
                            <InputLabel htmlFor="Name"> Name </InputLabel>
                                <InputNameContainer >
                                    <Input type="text" placeholder="First Name"/>
                                    <Input type="text" placeholder="Last Name"/>
                                </InputNameContainer>
                                <br/>

                                <InputLabel htmlFor="Dob"> Date of Birth </InputLabel>
                                <InputTypeBox> 
                                    <Input type="text" placeholder="Day"/>
                                    <Input type="text" placeholder="Month"/>
                                    <Input type="text" placeholder="Year"/>
                                </InputTypeBox>
                                <br />

                                <InputLabel htmlFor="gender"> Gender </InputLabel>
                                <div style={{textAlign: "left"}}> 
                                    <Input type="checkbox" /> &nbsp;<label htmlFor="male"> Male </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input type="checkbox" />&nbsp; <label htmlFor="female"> Female </label>
                                </div>
                                <br />

                                <InputLabel htmlFor="mobile"> Mobile</InputLabel>
                                <div style={{display: "grid"}}> 
                                    <Input type="text" placeholder="+234-3xxx-xxx-xxxx"/> 
                                </div>
                                <br />

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
                                <br />

                                <submit>Continue</submit>
                                <br />
                            <AlreadyHaveAccount>Already have an account? <StyledLink to="/signin">Signin</StyledLink> </AlreadyHaveAccount>
                    
                    </InputContainer>
                </FormContainer>
            </RegisterMinContainer>

            <TermsParagraph> By Clicking <StyledLink to="/signin">"Continue"</StyledLink>, you are agreeing to the QuicHealth Terms of</TermsParagraph>
            <TermsParagraph> Use, Privacy Policy, and Telehealth Consent Policy</TermsParagraph> 
            
        </Container>
    )
}

export default RegisterBody

export const Container = styled.div`
    background-color: #fafafb;
    margin: 0 .8em;
    border-radius: 15px;
    height: 100vh;
    width: 98%;
    padding-bottom: 2em;

    @media (max-width: ${700}px) {
        font-size: 13px;
    }
`;

export const InputTypeBox = styled.div`
     display: grid ;
    grid-template-columns:20% 35% 32%; 
    column-gap: 2em;
`;

export const InputNameContainer = styled.div`
   display: flex;
   justify-content:space-between;

    @media (max-width: ${700}px) {
        display: grid;
        grid-template-columns: 45% 47%;
        column-gap: 2em;
    }
    
`;

export const RegisterMinContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    color: #070647;
    text-align: center;
    padding-top: 1em;
    padding-bottom: 1em;
    
    >h1{
        //letter-spacing: -2.7px;
        font-size: 1.7em;
        margin-bottom: 1em;
    }
`;
export const FormContainer = styled.div`
    width: 30em;
    margin: 0 auto ;

    @media (max-width: ${700}px) {
       width:auto;
    }
    
`;
export const InputContainer = styled.form`

    >submit{
        padding: .5em 2.5em;
        border-radius: 20px;
        background-color: #2fa5a9;
        color: white;
        text-align: center;
        

        &:hover{
            cursor: pointer;
            opacity: .6;
            transition: all .5s;
        }
    }
`;

export const InputLabel = styled.label`
    text-align: left;
    display: flex;
    font-weight: 700;
    margin-bottom: .3em;
`;
export const Input = styled.input`
    padding: .6em 2em .6em 1em;
    border-radius: 14px;
    border: 1px solid #2fa5a9;
    outline: none;
    @media (max-width: ${500}px) {
        padding: .5em;
        font-size: 10px;
    }
    ::placeholder{
         color: #bdbdbe;
    }
`;

export const AlreadyHaveAccount = styled.p`
    font-size: 13px;
    padding-top: 2em;
    @media (max-width: ${700}px) {
        font-size: 12px;
    }

`;

export const StyledLink =styled(Link)`
    text-decoration: none;
    color: #070647;

    &:hover{
        cursor: pointer;
        opacity:.8;
        transition: all .3s;
    }
`;

export const TermsParagraph = styled.p`
    text-align: center;
    margin: 0 auto 0 auto;
    font-size: 13px;
    @media (max-width: ${700}px) {
        font-size: 12px;
    }
`;
