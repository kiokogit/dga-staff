import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { get_logged_in_user_profile } from "../actions/admin/account_actions"
import { clear_short_error_action } from "../actions/error_actions"
import { AdminDashboard } from "../components/application_components/admin_panel/dashboard/dash_home"
import { Loginform } from "../components/application_components/admin_panel/login/Login"
import { ErrorSuccessBar } from "../components/sharable_components/small_components/alerts/fail_success_bars"
import LoadingSpinner from "../components/sharable_components/small_components/alerts/loading"

export const AdminRouter = () => {
    const dispatch = useDispatch()
    const user_is_logged_in = useSelector(state =>state.logged_in_user_status)
    // get if user is logged in or not
    const logged_in_user_details = useSelector(state=> state.logged_in_user_details)
    const loading = useSelector(state=>state.loading_state)

    const short_alert = useSelector(state => state.short_alert)
    if(short_alert){
        setTimeout(() => {
            dispatch(clear_short_error_action())
        }, 6000);
    }
 
    // get user details if logged in
    useEffect(()=>{

        if (user_is_logged_in){
            dispatch(get_logged_in_user_profile())
        }
    }, [dispatch, user_is_logged_in])


    return (
        <div>
            {/* alert messages */}
            {short_alert && <ErrorSuccessBar message={short_alert.message} alert_type={short_alert.alert_type}/>}
            {/* Loading spinner */}
            {loading.loading_state && <LoadingSpinner message={loading.message} />}
            <Routes>
                <Route path="login" element={<Loginform user_is_logged_in={user_is_logged_in} />} />
                <Route path="dashboard/*" element={<AdminDashboard user_is_logged_in={user_is_logged_in} />} />
            </Routes>
        </div>
    )
}