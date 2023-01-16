import { Navigate, Route, Routes } from "react-router-dom";
import { AdminRouter } from "./AdminRouter";
// import { Error404 } from "../components/application_components/error_boundary/Error404"

export const RoutingMain = () => {

  return (
    <div>
      <Routes>
        <Route path='/staff/*' element={<AdminRouter />} />
        {/* not found route */}
        <Route path='*' element={<Rerouter />} />
      </Routes>
    </div>
  )
}

const Rerouter = () => {

  return (
    <Navigate to={"/staff/login"} />
  )
}

