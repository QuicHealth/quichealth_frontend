import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import Settings from '../../components/Setting';

function ExpertSetting() {
    return (
        <div>
            <DashboardNav expert={true} />
            <Settings expert={true}/>
        </div>
    )
}

export default ExpertSetting
