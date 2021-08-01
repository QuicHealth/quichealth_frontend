import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import Help from '../../components/Help';

function ExpertHelp() {
    return (
        <div>
            <DashboardNav />
            <Help expert={true}/>
        </div>
    )
}

export default ExpertHelp
