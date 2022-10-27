import React from 'react'
import DashboardNav from '../../components/DashboardNav'
import ExpertEMR from '../../components/Expert/ExpertEMR'

function ExpertEMRPage() {
  return (
    <div>
    <DashboardNav expert={true} />
    <ExpertEMR />
</div>
  )
}

export default ExpertEMRPage