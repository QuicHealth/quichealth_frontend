import React from "react";
import {
  Button,
  Cards,
  CardsSection,
  DocImg,
  MobileCategory,
  MobileTitle,
  Time,
} from "./Upcoming";
import timer from "./../../assets/timer.png";
import { useOutletContext } from "react-router-dom";
import AvatarImage from "../../utils/AvatarImage";
import { addAMPMToTime, formatDate } from "../../utils/MonthAndDate";

function Cancelled() {
 
  const { expert, data } = useOutletContext();
  const totalCancelledAppointments = data?.Appointments.filter(
    (app) => app?.status === "cancelled"
  );

  if (!totalCancelledAppointments?.length)
    return <div>You have no cancelled appointment</div>;
  return (
    <CardsSection>
      {data?.Appointments?.filter((apps) => apps.status === "cancelled")?.map(
        (app, id) => {
          return (
            <Cards key={id}>
              <MobileCategory>
                <MobileCategory className="pix">
                  <DocImg>
                    {!expert ? (
                      app?.doctor?.profile_pic_link ? (
                        <img src={app?.doctor?.profile_pic_link} alt="pix" />
                      ) : (
                        <AvatarImage name={app?.doctor?.name} />
                      )
                    ) : app?.user?.profile_pic_link ? (
                      <img src={app?.user?.profile_pic_link} alt="pix" />
                    ) : (
                      <AvatarImage
                        name={`${app?.user?.firstname} ${app?.user?.lastname}`}
                      />
                    )}
                  </DocImg>

                  <h3>
                    {!expert
                      ? app?.doctor.name
                      : `${app?.user?.firstname} ${app?.user?.lastname}`}
                  </h3>
                </MobileCategory>
                <MobileCategory className="timer">
                  <img src={timer} alt="timer" />
                  <p>Starts in now</p>
                </MobileCategory>
              </MobileCategory>

              {!expert && (
                <MobileCategory>
                  <MobileTitle>Speciality</MobileTitle>
                  <p>Pediatrician</p>
                </MobileCategory>
              )}

              <MobileCategory>
                <MobileTitle>Date</MobileTitle>

                <h4>{formatDate(app.date)}</h4>
              </MobileCategory>

              <h4>{app.date}</h4>
              <MobileCategory className="last">
                <MobileTitle>Time</MobileTitle>
                <Time>
                  <p>
                    {addAMPMToTime(app.start)} - {addAMPMToTime(app.end)}
                  </p>
                </Time>
              </MobileCategory>

              <Button className="completed" disabled={true} status={app.status}>
                "Completed"
              </Button>
            </Cards>
          );
        }
      )}
    </CardsSection>
  );
}

export default Cancelled;
