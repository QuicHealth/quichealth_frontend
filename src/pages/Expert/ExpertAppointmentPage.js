import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import Appointments from '../../components/Appointments';

function ExpertAppointmentPage() {
    return (
        <div>
            <DashboardNav />
            <Appointments expert={true}/> 
        </div>
    )
}

export default ExpertAppointmentPage
