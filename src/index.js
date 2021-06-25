import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify'
import jwt from 'jsonwebtoken';


//pages
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
import { setAuthorizationToken } from './redux/setToken';
import { setCurrentUser } from './redux/actions';
import history from './history';
import { ProtectedRoute } from './components/ProtectedRoute';

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

class Main extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/about-us' component={AboutServices} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/reset-password' component={Resetpassword} />
            <ProtectedRoute exact path='/dashboard-overview' component={DashboardOverview} />
            <ProtectedRoute exact path='/appointments' component={DashboardAppointments} />
            <ProtectedRoute exact path='/notifications' component={DashboardNotification} />
            <ProtectedRoute exact path='/history' component={DashboardHistory} />
            <ProtectedRoute exact path='/health-profile' component={DashboardHealthProfile} />
            <ProtectedRoute exact path='/settings' component={DashboardSettings} />
            <ProtectedRoute exact path='/help' component={DashboardHelp} />
            <ProtectedRoute exact path='/select-appointment' component={SelectAppointment} />
            <ProtectedRoute exact path='/pricings' component={Pricing} />
            <ProtectedRoute exact path='/meeting' component={Meeting} />
            <ProtectedRoute exact path='/chatbot' component={ChatBotPage} />
            <ProtectedRoute exact path='/payment' component={PaymentPage} />
            <ProtectedRoute exact path='/booked' component={BookedPage} />
            {/* <Route exact path='/404' component={} /> */}
            <Redirect to='/404' />
          </Switch>
        </Router>
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar transition={Slide}/>
    </React.StrictMode>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals