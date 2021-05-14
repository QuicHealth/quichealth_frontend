import React from 'react'
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/LockOutlined';
import {Plan} from './Pricings'
import {Container, IconBox, DocAppointment ,ViewMore, Margin, Button} from "./SelectAppointment";
import { InputNameContainer, Input, InputLabel, InputTypeBox} from "./RegisterBody"

export const PaymentDetail = ({bold, left, right}) => {
    return (
        <PDetailBox className={bold?bold:""}>
            <Left>{left}</Left>
            <Left>{right}</Left>
        </PDetailBox>
    )
}

export const PaySys = ({name, amount, total}) => {
    return(
        <Pay>
            <DocAppointment name={name} NoIcon={true} />
            <br />
            <Margin />
            <PaymentDetail left={"Service fee"} right={amount}/>
            <Margin />
            <PaymentDetail bold="bold" left="Total" right={total}/>
        </Pay>
    )
}

export const Lock = () => {
    return(
        <Warning>
            <p>If you can’t make your appointment, you will need to cancel or reschedule at least 2 hours 
                in advance of your appointment start time to avoid a fee.</p>
            <p><LockIcon/>QuicHealth is secure & your details are protected</p>
        </Warning>
    )
}

function Payment() {
    return (
        <Containers>
            <IconBox><MenuIcon /></IconBox>
            <div>
                <PaySys name="Dr Alice Walton" amount="N2000" total="N2000"/>

                <Paymnt>Enter payment details</Paymnt>
                <PImg><img src="./images/cards.svg" alt="" /></PImg>

                <Form>
                    <InputNameContainer >
                        <Input type="text" placeholder="Card Number"/>
                    </InputNameContainer>
                    <br/>
                    <InputLabel htmlFor="Dob"> Expiry Date </InputLabel>
                    <InputTypeBox style={{gridTemplateColumns: "1fr 1fr 1fr", columnGap: "1em"}}> 
                        <Input type="text" placeholder="MM"/>
                        <Input type="text" placeholder="YY"/>
                        <Input type="text" placeholder="CVV"/>
                    </InputTypeBox>

                    <ViewMore><Button>Book Appointment</Button></ViewMore>
                </Form>

                <Lock />
            </div>
            
        </Containers>
    )
}

export default Payment

export const Containers = styled(Container)`
    display: grid;
    grid-template-columns: 10% 90%;
`;

const Pay = styled(Plan)`
    width: fit-content;
    padding: 2em;
    text-align: left;
    background-color: #FEFEFF;
    &:hover{
        width: fit-content;
        padding: 2em;
        cursor: default;
    }
    > div{
        justify-content: flex-start;
    }

`;

const PDetailBox = styled.span`
    display: flex;
    justify-content: space-between;
    padding: .5em 1em;
    color: #000;

    &.bold{
        font-weight: bold;
    }
`

const Left = styled.p`
    font-size: 1.1em;
`;

const Paymnt = styled.p`
    font-size: .1.5em;
    font-weight: bold;
    text-align: center;
    color: #000000;
    margin-top: 1.5em;
`

const PImg = styled.div`
    display: grid;
    justify-content: space-around;
    margin-top:.5em;
`;

const Form = styled.form`
    width: 20em;
    margin: 0 auto;
    margin-top:2em;

    div>input{
        border: 0;
        border-bottom: 1px solid #2fa5a9;
        border-radius: 0;
        /* text-align: left; */
        width: 100%;
        background-color: inherit;
    }
    >label{
        font-size: .6em;
        color: #A4A4A4;
        margin-bottom: -.8em;
        font-weight: 200;
    }

`;

const Warning = styled.div`
    
    >p{
        font-size: 11px;
        color: #000;
        text-align:center;
        display: flex;
        justify-content: center;
        align-items: center;

        >.MuiSvgIcon-root{
            font-size:1.3em;
        }
    }
`;