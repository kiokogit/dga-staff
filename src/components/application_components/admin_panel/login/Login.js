import { Button, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"

import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from "react-router-dom"
import { login_staff_user } from "../../../../actions/admin/account_actions"
import { COMPANY_NAME } from "../../../../settings/constants"

import './style.css'


export const Loginform = ({user_is_logged_in}) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [credentials, setCredentials] = useState({
        user_type:"PUBLIC USER",
        email:"",
        password:""
    })

    const login_user = (e) => {
        e.preventDefault()
        dispatch(login_staff_user(credentials))
    }

    if(user_is_logged_in){
        if(location.state?.next_url){
            return (
                <Navigate to={location.state.next_url} />
            )
        }
        return (
            <Navigate to={'/staff/dashboard'}/>
        )
    }

    return (
        <div className="main_body">
            <div className="center_div">
                <Paper className={"paper login_card"}>
                    <Typography className="typography company_name">
                        {COMPANY_NAME}
                    </Typography>
                    <form autocomplete="off" noValidate={false} className={`${"root"} ${"form_"}`} onSubmit={e=>login_user(e)}>
                        <Typography className={"typography"} variant="h6">
                        { "Staff Login" } 
                        </Typography>
                        <div className="textfield">
                            <TextField required name="username" variant="outlined" type={"email"} label="Username or Email" size="small" fullWidth value={credentials.email}  onChange={(e)=> setCredentials({...credentials,email : e.target.value})}/>
                        </div>
                        <div className="textfield">
                            <TextField required name="password" type={"password"} variant="outlined" label="Password" size="small" fullWidth  value={credentials.password}  onChange={(e)=> setCredentials({...credentials,password : e.target.value})}/>
                        </div>
                        {/* <div className={"fileInput textfield"}>
                            <FileBase
                            type="file"
                            className={"fileInput"}
                            multiple={false}
                            onDone={({base64})=>setPostData({...postData, selectedFile: base64 })}
                            />
                        </div> */}
                        <Button className={"buttonSubmit"} style={{marginBottom:'10px'}} variant="contained" color="success" type="submit" size="large" fullWidth>Login </Button>
                        {/* <Button variant="contained" color="info" size="small" onClick={{}} style={{marginBottom:'10px'}} fullWidth> Clear </Button> */}
                        <div className="align_right">
                            {/* <FormHelperText>{"or proceed to public portal"} <a href="/public">here</a></FormHelperText> */}
                        </div>
                    </form>
                </Paper> 
            </div>
        </div>
    )
}