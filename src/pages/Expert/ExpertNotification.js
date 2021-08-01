import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import Notification from '../../components/Notification';

function ExpertNotification() {
    return (
        <div>
            <DashboardNav />
            <Notification expert={true} />
        </div>
    )
}

export default ExpertNotification
