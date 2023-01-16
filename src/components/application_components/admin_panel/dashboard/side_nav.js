import { Link, useLocation } from "react-router-dom"
import { InvisibleBtn2 } from "../../../sharable_components/small_components/buttons/buttons"

import './header.css'

export const SideNav = () => {

    const {pathname} = useLocation()

    return (
        <div className="side_nav_staff">
           <div className='flex_column'>
                <div className='logo_staff'>
                    <img alt="" src={""}/>
                </div>
                <Link to={""} className={`nav_link ${pathname.endsWith("dashboard") && 'current_nav'}`}>
                    <InvisibleBtn2 className={'menu_btn side_bar_btn'} value='Dashboard'/>
                </Link>
                <Link to={"analytics"} className={`nav_link ${pathname.includes("analytics") && 'current_nav'}`}>
                    <InvisibleBtn2 className={'menu_btn side_bar_btn'} value='Analytics' />
                </Link>
                <Link to={"ingestion"} className={`nav_link ${pathname.includes("ingestion") && 'current_nav'}`}>
                    <InvisibleBtn2 className={'menu_btn side_bar_btn'} value='Ingestion' />
                </Link>
                <Link to={"account"} className={`nav_link ${pathname.includes("account") && 'current_nav'}`}>
                    <InvisibleBtn2 className={'menu_btn side_bar_btn'} value='Manage Account' />
                </Link>
                {/* <Link to={"human_resource"} className={`nav_link ${pathname.startsWith("") && 'current_nav'}`}>
                    <InvisibleBtn2 className={'menu_btn side_bar_btn'} value='Human Resource' />
                </Link>
                <Link to={"careers"} className={`nav_link ${pathname.startsWith("CONTACT_ROUTE") && 'current_nav'}`} >
                    <InvisibleBtn2 value={'Careers'} className={'menu_btn side_bar_btn'}/> */}
                {/* </Link> */}
                
            </div>
        </div>
    )
}