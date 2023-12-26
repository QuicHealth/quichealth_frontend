import React, { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import { GlobalStyle } from "./globalStyles";
// import Layout from "./components/Layout";
// import SignUp from "./pages/SignupPage";
// import SigninPage from "./pages/SigninPage";
import { SidebarCollapseContext } from "./context/SidebarCollapseContext";
import { Spin } from "./utils/Spinners";
//import Dashboard from "./pages/Dashboard";
//import Appointmentlayout from "./components/Appointments/Appointmentlayout";
//import Upcoming from "./components/Appointments/Upcoming";
//import Completed from "./components/Appointments/Completed";
//import Cancelled from "./components/Appointments/Cancelled";
//import NotificationLayout from "./components/Notifications/NotificationLayout";
//import AllMessages from "./components/Notifications/AllMessages";
//import DashboardLayout from "./components/Dashboard/DashboardLyout";
//import HistoryListing from "./components/History/HistoryListing";
//import HistoryDetails from "./components/History/HistoryDetails";
//import HealthProfile from "./components/HealthProfile/HealthProfile";

//import ExpertHealthProfile from "./components/Expert/ExpertHealthProfile";
import Settings from "./components/Settings/Settings";
import GoogleSSO from "./utils/GoogleSSO";
import RequireAuth from "./components/RequireAuth";
//import Help from "./components/Help/Help";
//import BookAppointment from "./components/BookAppointment/BookAppointment";
//import ViewProfile from "./components/ViewProfile/ViewProfile";
//import Questionaire from "./components/Questionaire/Questionaire";
//import AppointmentConfirmed from "./components/AppointmentConfirmed/AppointmentConfirmed";
//import MeetEnded from "./components/MeetingEnded/MeetEnded";
//import Rating from "./components/Rating/Rating";
// import ExpertDashboardLayout from "./components/Dashboard/ExpertDashboardLayout";
//import DashboardSection from "./components/Expert/DashboardSection";
//import ExpertDetailsLayout from "./components/Expert/Details/ExpertDetailsLayout";
//import Report from "./components/Expert/Details/Report";
//import Prescription from "./components/Expert/Details/Prescription";

//import Meeting from "./components/Meeting";
//import SettingLayout from "./components/Settings/SettingLayout";
//import LoginDetails from "./components/Settings/LoginDetails";
// import Account from "./components/Settings/Account";
//import ExpertMeeting from "./components/Expert/Meeting/ExpertMeeting";

const SigninPage = lazy(() => import("./pages/SigninPage"));
const SignUp = lazy(() => import("./pages/SignupPage"));

const Appointmentlayout = lazy(() =>
  import("./components/Appointments/Appointmentlayout")
);

const Layout = lazy(() => import("./components/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Upcoming = lazy(() => import("./components/Appointments/Upcoming"));
const Completed = lazy(() => import("./components/Appointments/Completed"));
const Cancelled = lazy(() => import("./components/Appointments/Cancelled"));
const NotificationLayout = lazy(() =>
  import("./components/Notifications/NotificationLayout")
);
const AllMessages = lazy(() =>
  import("./components/Notifications/AllMessages")
);
const DashboardLayout = lazy(() =>
  import("./components/Dashboard/DashboardLyout")
);
const HistoryListing = lazy(() =>
  import("./components/History/HistoryListing")
);
const HistoryDetails = lazy(() =>
  import("./components/History/HistoryDetails")
);
const HealthProfile = lazy(() =>
  import("./components/HealthProfile/HealthProfile")
);
const ExpertHealthProfile = lazy(() =>
  import("./components/Expert/ExpertHealthProfile")
);
const Help = lazy(() => import("./components/Help/Help"));
const BookAppointment = lazy(() =>
  import("./components/BookAppointment/BookAppointment")
);
const ViewProfile = lazy(() => import("./components/ViewProfile/ViewProfile"));
const Questionaire = lazy(() =>
  import("./components/Questionaire/Questionaire")
);
const AppointmentConfirmed = lazy(() =>
  import("./components/AppointmentConfirmed/AppointmentConfirmed")
);
const MeetEnded = lazy(() => import("./components/MeetingEnded/MeetEnded"));
const Rating = lazy(() => import("./components/Rating/Rating"));
const ExpertDashboardLayout = lazy(() =>
  import("./components/Dashboard/ExpertDashboardLayout")
);
const DashboardSection = lazy(() =>
  import("./components/Expert/DashboardSection")
);
const ExpertDetailsLayout = lazy(() =>
  import("./components/Expert/Details/ExpertDetailsLayout")
);

const ExpertAppointmentDetailsLayout = lazy(() =>
  import("./components/Expert/AppointmentDetails/AppDetailsLayout")
);
const Report = lazy(() => import("./components/Expert/Details/Report"));

const HealthProfileDetails = lazy(() =>
  import("./components/Expert/AppointmentDetails/HealthProfileDetails")
);

const Prescription = lazy(() =>
  import("./components/Expert/Details/Prescription")
);
const Meeting = lazy(() => import("./components/Meeting"));
const SettingLayout = lazy(() => import("./components/Settings/SettingLayout"));
const LoginDetails = lazy(() => import("./components/Settings/LoginDetails"));
const Account = lazy(() => import("./components/Settings/Account"));
const ExpertMeeting = lazy(() =>
  import("./components/Expert/Meeting/ExpertMeeting")
);

function App() {
  const [collapse, setCollapse] = useState(false);
  const [isHover, setHover] = useState(false);
  const [isLogout, setLogout] = useState(false);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT", response);
    const userObject = jwt_decode(response.credential);
    console.log("Encoded JWTt", userObject);
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <GlobalStyle />
        <SidebarCollapseContext.Provider
          value={{
            collapse,
            setCollapse,
            setHover,
            isHover,
            setLogout,
            isLogout,
          }}
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Homepage />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route
              path="/expert-signin"
              element={<SigninPage expert={true} />}
            />

            {/* Protected Routes */}

            {/* Expert Paths */}

            <Route element={<RequireAuth />}>
              <Route path="" element={<ExpertDashboardLayout />}>
                <Route path="expert-dashboard/">
                  <Route index element={<DashboardSection />}></Route>
                  <Route
                    path="appointment/:id"
                    element={<ExpertAppointmentDetailsLayout />}
                  >
                    <Route index element={<Report />} />
                    <Route
                      path="health-profile"
                      element={<HealthProfileDetails />}
                    />
                  </Route>
                </Route>

                <Route
                  path="expert-appointment"
                  element={<Appointmentlayout expert={true} />}
                >
                  <Route index element={<Upcoming />} />
                  <Route path="completed" element={<Completed />} />
                  <Route path="cancelled" element={<Cancelled />} />
                </Route>
                <Route
                  path="expert-notifications"
                  element={<NotificationLayout expert={true} />}
                >
                  <Route index element={<AllMessages />} />
                  <Route path="unread" element={<AllMessages />} />
                </Route>

                <Route path="expert-history/">
                  <Route
                    index
                    element={<HistoryListing expert={true} />}
                  ></Route>
                  <Route path=":id" element={<ExpertDetailsLayout />}>
                    <Route index element={<Report />} />
                    <Route path="prescription" element={<Prescription />} />
                  </Route>
                </Route>
                {/* <Route path="expert-settings" element={<Settings />} /> */}

                <Route
                  path="expert-settings"
                  element={<SettingLayout expert={true} />}
                >
                  <Route index element={<Account />} />
                  <Route path="updateLoginDetails" element={<LoginDetails />} />
                </Route>

                <Route
                  path="expert-healthprofile"
                  element={<ExpertHealthProfile />}
                />

                <Route path="expert-help" element={<Help />} />
              </Route>

              {/* Patient Paths */}
              <Route path="" element={<DashboardLayout />}>
                <Route path="/dashboard/" element={<Dashboard />}></Route>

                <Route path="/book-appointment" element={<BookAppointment />} />

                <Route path="/view-profile/:id" element={<ViewProfile />} />
                <Route path="questionaire" element={<Questionaire />} />
                <Route
                  path="appointment-confirmed"
                  element={<AppointmentConfirmed />}
                />
                <Route path="meeting-ended" element={<MeetEnded />} />
                <Route path="rating" element={<Rating />} />

                <Route path="appointment" element={<Appointmentlayout />}>
                  <Route index element={<Upcoming />} />
                  <Route path="completed" element={<Completed />} />
                  <Route path="cancelled" element={<Cancelled />} />
                </Route>
                {/* /expert-notifications */}

                <Route path="settings" element={<SettingLayout />}>
                  <Route index element={<Account />} />
                  <Route path="updateLoginDetails" element={<LoginDetails />} />
                </Route>

                <Route path="notifications" element={<NotificationLayout />}>
                  <Route index element={<AllMessages />} />
                  <Route path="unread" element={<AllMessages />} />
                </Route>

                <Route path="history">
                  <Route index element={<HistoryListing />} />
                  <Route path=":id" element={<HistoryDetails />} />
                </Route>

                <Route path="health-profile" element={<HealthProfile />} />

                {/* <Route path="settings" element={<Settings />} /> */}

                <Route path="help" element={<Help />} />
              </Route>
              <Route path="meeting" element={<Meeting />} />
              <Route path="expert-meeting" element={<ExpertMeeting />} />
            </Route>
          </Routes>
        </SidebarCollapseContext.Provider>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          transition={Slide}
        />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
