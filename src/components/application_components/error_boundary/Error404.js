import { useNavigate } from "react-router-dom"

import './error.css'

export const Error404 = () => {
    const navigate = useNavigate()

    return(
        <div className="center_error">
            <div className="error_title">
                Oh Snap! 😥
            </div>
            <div>
                The page you are looking for is not available. 
                <p>It is (probably) one of the great features we are working on that will be out soon.</p>
            </div>
        </div>
    )
}