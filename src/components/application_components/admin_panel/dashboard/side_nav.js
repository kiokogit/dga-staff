import { Button } from "@mui/material"

import './header.css'

export const SideNav = () => {

    return (
        <div className="side_nav_staff">
           <div className='flex_column'>
                <div className='logo_staff'>
                    <img alt="" src={""}/>
                </div>
                <div className="nav_link">
                    <Button variant="contained" size="large" color="success" href="/staff/dashboard" fullWidth>Dashboard</Button>
                </div>
                <div className="nav_link">
                    <Button variant="contained" size="large" color="success" href="/staff/dashboard/ingestion" fullWidth>Ingestion</Button>
                </div>
                {/* <div className="nav_link">
                    <Button variant="contained" color="success" href="/staff/dashboard/account" fullWidth>Account</Button>
                </div> */}
            </div>
        </div>
    )
}