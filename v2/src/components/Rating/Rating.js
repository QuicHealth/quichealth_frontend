import React, { useContext, useEffect, useState } from "react";
import { Container } from "../Appointments/Appointmentlayout";
import { Sidebar } from "../ViewProfile/ViewProfile";
import { Layout as L } from "../Notifications/NotificationLayout";
import Star from "@material-ui/icons/StarRate";
import { InputContainer } from "../Signup";
import { Button as B, ButtonBox, Input } from "../HealthProfile/HealthProfile";
import styled from "styled-components";
import { SidebarCollapseContext } from "../../context/SidebarCollapseContext";
import { useNavigate } from "react-router-dom";

function Rating() {
  const { collapse, setCollapse } = useContext(SidebarCollapseContext);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setCollapse(true);
  }, []);
  return (
    <Container collapse={collapse}>
      <Sidebar></Sidebar>
      <Layout>
        <Section>
          <h2>How was the call?</h2>
          <h6>Rate your experience and leave a comment.</h6>
          <RatingBox>
            <Rates>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                    />

                    <Star
                      className="star"
                      size={50}
                      style={{
                        color:
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9",
                      }}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </Rates>
            <RateNames>
              <p>Very poor</p>
              <p>Excellent</p>
            </RateNames>
          </RatingBox>

          <Form>
            <InputContainer>
              <Input
                type="text"
                name="comment"
                placeholder="Leave a comment..."
              />
            </InputContainer>
            <ButtonBox>
              <p onClick={() => navigate("/meeting-ended")}>Skip</p>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/meeting-ended");
                }}
              >
                Submit
              </Button>
            </ButtonBox>
          </Form>
        </Section>
      </Layout>
    </Container>
  );
}

export default Rating;

const Layout = styled(L)`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  background: white;
  padding: 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--grey);
  width: 25em;
  h2 {
  }

  h6 {
    margin: 1.5em 0;
    font-size: 16px;
    line-height: 21.6px;
    font-weight: 500;
  }

  @media only Screen and (max-width: 768px) {
    margin: 1em;
    width: 100%;
    padding: 1em;

    h2 {
      font-size: 1.2em;
    }

    h6 {
      font-size: 13px;
    }
  }
`;

const RatingBox = styled.div`
  width: 80%;
  //display: flex;
  //justify-content: space-evenly;
`;
const Rates = styled.div`
  display: flex;

  justify-content: space-around;
  > .MuiSvgIcon-root,
  .MuiSvgIcon-root {
    font-size: 1.5em;
  }

  input[type="radio"] {
    display: none;
  }

  > label .star {
    cursor: pointer;
  }
`;

const RateNames = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 12px;
    padding: 0.5em 0;
  }
`;

const Form = styled.form`
  width: 100%;
  margin-top: 1em;
`;

const Button = styled(B)`
  // padding: 1em 0;
`;

// const getDays = (number) => {
//   switch (number) {
//     case 0:
//       return "sunday";
//     case 1:
//       return "monday";

//     case 2:
//       return "tuesday";

//     case 3:
//       return "wednesday";
//     case 4:
//       return "thursday";
//     case 5:
//       return "friday";
//     case 6:
//       return "saturday";
//     default:
//       break;
//   }
// };


// const getCheckedState = (timeSlots) => {
//   checkedState.forEach((currentCheckedState, id) => {
//     if (currentCheckedState === true) {
//       const slot = {
//         ...TimeSelections[id],
//         checkedState,
//       };
//       timeSlots?.push(slot);
//     }
//   });

//   setAvailability({
//     ...availability,
//     doctor_id: 1,
//     day: getDays(activeDayTab),
//     time_slots: timeSlots,
//   });
//   //setSelectedTimeSlots(timeSlots);
// };

// const handleSelectedTime = (position, checkedState, setCheckedState) => {
//   const updatedCheckedState = checkedState.map((item, index) =>
//     index === position ? !item : item
//   );

//   setCheckedState(updatedCheckedState);
// };

// console.log(checkedState, availability, timeSlots.length, "tesfd");

// useEffect(() => {
//   getCheckedState(timeSlots);
//   // eslint-disable-next-line
// }, []);

// useEffect(() => {
//   if (!availability[activeDayTab]) {
//     setCheckedState(new Array(TimeSelections.length).fill(false));
//   } else if (availability[activeDayTab][0]) {
//     setCheckedState(availability[activeDayTab][0].checkedState);
//   }
// }, [activeDayTab, availability]);

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log(availability, timeSlots.length, "available");
//   //  setAvailables(availability)
//   // setModal(false);
// };

// return (
//   <BackdropContainer>
//     <ModalContent>
//       <ModalHeader>
//         <h4>Set availability</h4>
//         <div className="patient" onClick={() => setModal(false)}>
//           <img src={cancel} alt="cancel" />
//         </div>
//       </ModalHeader>
//       <ModalBody>
//         <form>
//           <SetAvailable>
//             <Availability>
//               <Days>
//                 <DaysTitle>Day</DaysTitle>
//                 <Day
//                   className={activeDayTab === 1 ? "activeDayTab" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveDayTab(1);
//                   }}
//                 >
//                   <p>Monday</p>
//                   <Arrow />
//                 </Day>
//                 <Day
//                   className={activeDayTab === 2 ? "activeDayTab" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveDayTab(2);
//                   }}
//                 >
//                   <p>Tuesday</p>
//                   <Arrow />
//                 </Day>
//                 <Day
//                   className={activeDayTab === 3 ? "activeDayTab" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveDayTab(3);
//                   }}
//                 >
//                   <p>Wednesday</p>
//                   <Arrow />
//                 </Day>

//                 <Day
//                   className={activeDayTab === 4 ? "activeDayTab" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveDayTab(4);
//                   }}
//                 >
//                   <p>Thursday</p>
//                   <Arrow />
//                 </Day>

//                 <Day
//                   className={activeDayTab === 5 ? "activeDayTab" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveDayTab(5);
//                   }}
//                 >
//                   <p>Friday</p>
//                   <Arrow />
//                 </Day>

//                 <Day
//                   className={activeDayTab === 6 ? "activeDayTab" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveDayTab(6);
//                   }}
//                 >
//                   <p>Saturday</p>
//                   <Arrow />
//                 </Day>
//                 <Day
//                   className={activeDayTab === 7 ? "activeDayTab" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveDayTab(7);
//                   }}
//                 >
//                   <p>Sunday</p>
//                   <Arrow />
//                 </Day>
//               </Days>
//               <Times>
//                 <DaysTitle>Time</DaysTitle>
//                 <TimeInputBox>
//                   <TimeInput className="patient">
//                     {TimeSelections.map((timeSlots, id) => {
//                       return (
//                         <Time key={id}>
//                           <input
//                             key={id}
//                             type="checkbox"
//                             checked={checkedState[id]}
//                             value={timeSlots.name}
//                             name={timeSlots.value}
//                             onChange={() => {
//                               handleSelectedTime(
//                                 id,
//                                 checkedState,
//                                 setCheckedState,
//                                 setSelectedTimeSlots,
//                                 TimeSelections,
//                                 activeDayTab,
//                                 setAvailability
//                               );
//                             }}
//                           />
//                           &nbsp; &nbsp;
//                           <label htmlFor="">{timeSlots.value}</label>
//                         </Time>
//                       );
//                     })}
//                   </TimeInput>
//                 </TimeInputBox>
//               </Times>
//             </Availability>
//           </SetAvailable>

//           <ButtonBox>
//             <p>Clear</p>
//             <Button onClick={handleSubmit}>Save Changes</Button>
//           </ButtonBox>
//         </form>
//       </ModalBody>
//     </ModalContent>
//   </BackdropContainer>
// );
// }

// export default SetAppointment;

