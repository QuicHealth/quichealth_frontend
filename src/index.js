import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import DashboardOverview from './pages/DasboardOverview';
import DashboardHealthProfile from './pages/DashboardHealthProfile';
import DashboardHelp from './pages/DashboardHelp';
import DashboardAppointments from './pages/DashboardAppointments';
import DashboardNotification from './pages/DashboardNotification';
import DashboardSettings from './pages/DashboardSetting';
import DashboardHistory from './pages/DashboardHistory';
import Register from './pages/Register';
import Resetpassword from './pages/ResetPassword';
import Signin from './pages/Signin';
import HomePage from './pages/HomePage';
import AboutServices from './pages/AboutServices';
import SelectAppointment from './pages/SelectAppointment';
import Pricing from './pages/Pricing';
import Meeting from './pages/Meeting';
import ChatBotPage from './pages/ChatBotPage'
import PaymentPage from './pages/PaymentPage'
import BookedPage from './pages/BookedPage';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/about-us' component={AboutServices} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/reset-password' component={Resetpassword} />
        <Route exact path='/dashboard-overview' component={DashboardOverview} />
        <Route exact path='/appointments' component={DashboardAppointments} />
        <Route exact path='/notifications' component={DashboardNotification} />
        <Route exact path='/history' component={DashboardHistory} />
        <Route exact path='/health-profile' component={DashboardHealthProfile} />
        <Route exact path='/settings' component={DashboardSettings} />
        <Route exact path='/help' component={DashboardHelp} />
        <Route exact path='/select-appointment' component={SelectAppointment} />
        <Route exact path='/pricings' component={Pricing} />
        <Route exact path='/meeting' component={Meeting} />
        <Route exact path='/chatbot' component={ChatBotPage} />
        <Route exact path='/payment' component={PaymentPage} />
        <Route exact path='/booked' component={BookedPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals