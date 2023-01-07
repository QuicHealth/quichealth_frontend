import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import ExpertAppointment from '../../components/Expert/ExpertAppointment';

function ExpertAppointmentPage() {
    return (
        <div>
            <DashboardNav expert={true}/>
           {/* // <Appointments expert={true}/>  */}
           <ExpertAppointment />
        </div>
    )
}

export default ExpertAppointmentPage
