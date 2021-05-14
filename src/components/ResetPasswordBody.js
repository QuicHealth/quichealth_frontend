import React from 'react'
import styled from 'styled-components'

function ResetPasswordBody() {
    return (
        <Container>
            <RegisterMinContainer >
                <h1>Password Reset</h1>
                <FormContainer>
                    <InputContainer>

                                <InputLabel htmlFor="email"> Email</InputLabel>
                                <div style={{display: "grid"}}> 
                                    <Input type="email" placeholder="example@xxx.com"/> 
                                </div>
                                <br />

                                <InputLabel htmlFor="password"> New Password</InputLabel>
                                <div style={{display: "grid"}}> 
                                    <Input type="password" placeholder=""/> 
                                </div>
                                <br />
                                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                                <div style={{display: "grid"}}> 
                                    <Input type="password" placeholder=""/> 
                                </div>
                                <br />
                                <br />

                                    <submit type="submit"> Continue </submit>
                                <br />
    
                    
                    </InputContainer>
                </FormContainer>
            </RegisterMinContainer>

            
        </Container>
    )
}

export default ResetPasswordBody

const Container = styled.div`
    background-color: #fafafb;
    margin: 0 .8em;
    border-radius: 15px;
    height: 100vh;
    width: 98%;
`;

const RegisterMinContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    color: #070647;
    text-align: center;
    padding-top: 1.5em;
    
    >h1{
        letter-spacing: -2.7px;
        font-size: 1.7em;
        margin-bottom: 1em;
    }
`;
const FormContainer = styled.div`
    width: 30em;
    margin: 0 auto;

    @media (max-width: ${700}px) {
       width:auto;
    }
    
`;
const InputContainer = styled.form`

    >Submit{
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
const InputLabel = styled.label`
    text-align: left;
    display: flex;
    font-weight: 700;
    margin-bottom: .3em;
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

