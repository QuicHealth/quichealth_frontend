import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import ExpertAppointment from '../../components/Expert/ExpertAppointment';

function ExpertAppointmentPage() {
    return (
        <div>
            <DashboardNav />
           {/* // <Appointments expert={true}/>  */}
           <ExpertAppointment />
        </div>
    )
}

export default ExpertAppointmentPage
