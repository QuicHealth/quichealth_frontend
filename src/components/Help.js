import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import { connect } from "react-redux";
import { AppointmentContainerWrapper, Container, HeadSection, MainBody } from "./Appointments";
import { NotificationSearchIcon, SearchInput, Search } from "./Notification";
import { SaveChanges } from "./HealthProfile";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SendIcon from "@material-ui/icons/Send";
import CallIcon from "@material-ui/icons/Call";
import { ProfileImage } from "./Overview";
import ExpertSidebar from "./Expert/ExpertSidebar";

function Help({ expert, openSidebar }) {
  const [isDown, setIsDown] = useState(true);
  const toggleDown = () => setIsDown(!isDown);

  return (
    <Container sidebar={openSidebar}>
      {expert ? <ExpertSidebar />: <SideBar />}
      <MainBody sidebar={openSidebar}>
        <HeadSection sidebar={openSidebar}>
          <h1>Help</h1>
          <ProfileImage sidebar={openSidebar} className="noTopPadding">
            <img
              src="https://i.pinimg.com/564x/09/1e/51/091e51bc9eca2ba4a868113e5c26f6a7.jpg"
              alt=""
            />
          </ProfileImage>
        </HeadSection>
        <AppointmentContainerWrapper sidebar={openSidebar}>
          <HelpSearchBox>
            <HelpTitle>
              Ask about a topic before trying to contact for support
            </HelpTitle>
            <Search className="help">
              <NotificationSearchIcon />
              <HelpSearch placeholder="Type here to search" />
              <SearchButton>Search</SearchButton>
            </Search>
          </HelpSearchBox>

          <SelectSection>
            <div>
              <SelectBox>
                <Select>How do I contact QuicHealth customer service? </Select>{" "}
                {isDown ? (
                  <IconDown onClick={toggleDown} />
                ) : (
                  <IconUp onClick={toggleDown} />
                )}
                <Option
                  style={isDown ? { display: "none" } : { display: "block" }}
                >
                  We have healthcare professionals that provide a wide variety
                  of services. From Gynecology & Obstetrics to Infectious
                  diseases. Our network also offers Naturopath medicine.
                </Option>
              </SelectBox>
              <br />
              <SelectBox>
                <Select>
                  How do I schedule an appointment with a specialist?{" "}
                </Select>{" "}
                <IconDown />
              </SelectBox>
              <br />
              <SelectBox>
                <Select>Can I cancel an already made appointment? </Select>
                <IconDown />
              </SelectBox>
              <br />
              <SelectBox>
                <Select>How much do I need to pay for consulation? </Select>{" "}
                <IconDown />
              </SelectBox>
              <br />
              <SelectBox>
                <Select>
                  How much do I need pay for offline consulation?{" "}
                </Select>{" "}
                <IconDown />
              </SelectBox>
            </div>

            <Contact>
              <ContactSection>
                <div></div>
                <ContactTitle>Still need help?</ContactTitle>
              </ContactSection>
              <ContactSection>
                <div>
                  <SendIcon />
                </div>
                <ContactInfo>
                  <ContactBody className="bold"> Email us at</ContactBody>
                  <ContactBody>QuicHealth@gmail.com</ContactBody>
                </ContactInfo>
              </ContactSection>
              <ContactSection>
                <div>
                  <CallIcon />
                </div>
                <ContactInfo>
                  <ContactBody className="bold"> Call us at</ContactBody>
                  <ContactBody>+234 810 000 0000</ContactBody>
                  <ContactBody>+234 815 555 5555</ContactBody>
                </ContactInfo>
              </ContactSection>
            </Contact>
          </SelectSection>
        </AppointmentContainerWrapper>
      </MainBody>
    </Container>
  );
}

const mapStateProps = (state) => ({
  openSidebar: state.utils.openSidebar,
});

export default Help = connect(mapStateProps)(Help);

const HelpSearchBox = styled.div`
  width: 40em;
  margin: 3em auto;
  font-size: 1.2em;
  @media (max-width: ${900}px) {
    width: 100%;
    font-size: 12px;
  }

  @media (max-width: ${700}px) {
    width: 100%;
    font-size: 9px;
  }
`;
const HelpTitle = styled.p`
  text-align: center;
  margin-right: 8em;
  font-size: 20px;
  opacity: 0.4;
  color: #4c5059;
  display: block;
  //font-weight: 600;
  @media (max-width: ${500}px) {
    display: none;
  }
`;
const HelpSearch = styled(SearchInput)`
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  font-size: 1.3em;
  //font-weight: 600;

  &::placeholder {
    opacity: 0.5;
  }
`;
const SearchButton = styled(SaveChanges)`
  width: 8em;
  margin-left: 1em;
  font-size: 1.2em;
  font-weight: 600;
  color: #ffffffc7;
  display: block;

  @media (max-width: ${500}px) {
    display: none;
  }
`;

const SelectSection = styled.div`
  //width: 45em;
  margin: 3em auto;
  padding: 0 2em;
  font-size: 1.2em;
  display: grid;
  grid-template-columns: 60% 40%;
  align-items: center;

  @media (max-width: ${500}px) {
    grid-template-columns: 100%;
    width: 100%;
    padding: 0;
    font-size: 14px;;
  }
`;
const SelectBox = styled.div`
  margin-bottom: 0em;
  display: block;

  @media (max-width: ${700}px) {
  }
`;

const Select = styled.span`
  width: 100%;
  padding: 1em;
  display: inline-flex;
  padding-right: 3em;
  border: 1px solid #dbdbdb;
  background: #fafafb;
  box-shadow: 1px 2px #2e302f4a;
  outline: none;
  font-weight: 600;
  //font-size: 1.2em;
  @media (max-width: ${500}px) {
    font-size: 13px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    background: unset;
  }
`;

const IconDown = styled(ArrowDownIcon)`
  position: absolute;
  margin-left: -1em;
  margin-top: 0.7em;
  @media (max-width: ${800}px) {
    font-size: 9px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const IconUp = styled(ArrowUpIcon)`
  position: absolute;
  margin-left: -1em;
  margin-top: 0.7em;
  &:hover {
    cursor: pointer;
  }
  .MuiSvgIcon-root {
    @media (max-width: ${700}px) {
      font-size: 1.3em;
    }
  }
`;
const Contact = styled.div`
  width: 100%;
  padding: 1em;
  background-color: white;
  box-shadow: 1px 2px #2e302f4a;
  height: 15em;
  margin-left: 2em;
  font-size: 1.2em;
  //top: 20%;
  position: relative;
  display: block;
  @media (max-width: ${800}px) {
    //padding: 1em;
  }

  @media (max-width: ${700}px) {
    display: none;
  }
`;
const Option = styled.span`
  text-align-last: left;
  font-size: 1.1em;
  font-weight: 500;
  box-shadow: 1px 2px #2e302f4a;
  width: 100%;
  padding: 0.2em 0.5em;
  border: 1px solid #dbdbdb;
  background: #fff;
  //margin-top: 1em;
  display: block;
  position: relative;
  display: none;

  @media (max-width: ${500}px) {
    font-size: 10px;
  }

  @media (max-width: ${500}px) {
    font-size: 9px;
  }
`;

const ContactTitle = styled.h3`
  text-align: center;
  font-weight: 600;
  width: 100%;
  display: flex;
  font-size: 1.1em;

  @media (max-width: ${800}px) {
    font-size: 10px;
  }
`;
const ContactSection = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  margin-top: 1em;
  align-items: center;

  > div > .MuiSvgIcon-root {
    width: 2em;
    height: 2em;
  }
`;
const ContactInfo = styled.span``;

const ContactBody = styled.p`
  font-size: 1em;
  @media (max-width: ${900}px) {
    font-size: 10px;
  }
  @media (max-width: ${700}px) {
    font-size: 9px;
  }

  &.bold {
    font-weight: 600;
  }
`;
