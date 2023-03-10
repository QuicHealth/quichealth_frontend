import React from 'react'
import DashboardNav from '../../components/DashboardNav';
import ExpertHealthProfile from '../../components/Expert/ExpertHealthProfile';

function ExpertHealthProfilePage() {
    return (
        <div>
            <DashboardNav expert={true} />
            <ExpertHealthProfile />
        </div>
    )
}

export default ExpertHealthProfilePage
