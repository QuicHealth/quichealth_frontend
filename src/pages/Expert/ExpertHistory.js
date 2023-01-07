import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import History from '../../components/History';

function ExpertHistory() {
    return (
        <div>
            <DashboardNav expert={true}/>
            <History expert={true}/>
        </div>
    )
}

export default ExpertHistory
