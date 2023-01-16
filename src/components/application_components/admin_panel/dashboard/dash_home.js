import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { SideNav } from "./side_nav"
import { TopHeader } from "./top_header"

import './dash_staff.css'
import { Card, Paper, Typography } from "@mui/material"
import { Ingestion } from "./ingestion"

export const AdminDashboard = ({user_is_logged_in}) => {

    if(!user_is_logged_in){
        return(
            <Navigate to={'/staff/login'}/>
        )
    }

    return (
        <div className="admin_content">
            <div className="dash_headers">
                <SideNav />
            </div>
            <div className="dash_body">
                <TopHeader />
                <Routes>
                    <Route path="" element={<DashHome />} />
                    <Route path="ingestion/*" element={<Ingestion />} />
                </Routes>
            </div>
        </div>
    )
}

const DashHome = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Paper className="dash_welcome">
                    </Paper>
                    <div className="dash_cards_box">
                        <Paper className="paper margin_around">
                            <div className="flexrow">
                                <Typography variant="h6" className="typography">
                                    Ingestion
                                </Typography>
                                <Typography variant="subtitle2" className="link_typo" onClick={e=> navigate('ingestion')}>
                                    View all
                                </Typography>
                            </div>
                            <Card className="dash_cards"  onClick={e=> navigate('ingestion/packages/new')}>
                                Add new Package
                            </Card>
                            {/* <Card className="dash_cards"  onClick={e=> navigate('ingestion/packages/edit')}>
                                Show all Packages
                            </Card>
                            <Card className="dash_cards"  onClick={e=> navigate('ingestion/packages/delete')}>
                                Remove Package
                            </Card> */}
                        </Paper>
                        {/* <Paper className="paper margin_around">
                            <div className="flexrow">
                                <Typography variant="h6" className="typography">
                                    Staff
                                </Typography>
                                <Typography variant="subtitle2" className="link_typo" onClick={e=> navigate('staff')}>
                                    View all
                                </Typography>
                            </div>
                            <Card className="dash_cards"  onClick={e=> navigate('staff/new')}>
                                Add Staff Member
                            </Card>
                            <Card className="dash_cards"  onClick={e=> navigate('staff/all')}>
                                View all Staff Members
                            </Card>
                        </Paper> */}
                        {/* <Paper className="paper margin_around">
                            <div className="flexrow">
                                <Typography variant="h6" className="typography">
                                    Analytics
                                </Typography>
                                <Typography variant="subtitle2" className="link_typo" onClick={e=> navigate('ingestion')}>
                                    View all
                                </Typography>
                            </div>
                            <Card className="dash_cards"  onClick={e=> navigate('analytics/activity')}>
                                Recent Site Visits
                            </Card>
                            <Card className="dash_cards"  onClick={e=> navigate('analytics/packages')}>
                                Package likes
                            </Card>
                            <Card className="dash_cards"  onClick={e=> navigate('analytics/emails')}>
                                Emails Sent
                            </Card>
                        </Paper> */}
                        {/* <Card className="dash_cards"  onClick={e=> navigate('account/settings')}>
                            Account Settings
                        </Card>
                        <Card className="dash_cards" onClick={e=> navigate('account/profile')}>
                            My Profile
                        </Card> */}
                    </div>
        </div>
    )
}

