import React from 'react'
import styled from 'styled-components';

function DashboardNav() {
    return (
        <Container>
            <LogoImg>                    
                <img style={{height: "5em"}} src="https://dashboard.quichealth.com.ng/assets/Images/logo.png" alt="" />
            </LogoImg>
            <UserName>
                 <Image>
                    <img src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg" alt=""/>
                </Image>
                <Name> Oluwatobi, Jemima
                </Name>
            </UserName>
        </Container>
    )
}

export default DashboardNav;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
   padding:0 2em;
`;

const LogoImg =styled.div`
 width: 4em;
`;

const UserName = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1em 2em;
    align-items: center;
`;

const Image = styled.div`

    padding-right: 1em;
   >img{
        width: 1.5em;
      //  height:3em;
        border-radius: 100%;
        object-fit: contain;
   }
`;
const Name = styled.h3`
    font-size: 14px;
`;