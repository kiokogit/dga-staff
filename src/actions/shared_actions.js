import emailjs from '@emailjs/browser';
import { set_loading } from './component_actions';
import { post_short_alert_message } from './error_actions';

export const send_email_emailJs = emailBody => async(dispatch)=> {

    try{

        dispatch(set_loading(true, `Sending your ${emailBody.message_category}. Please wait...`))
        await emailjs.send("service_t5qbzac", "template_7ig1pc8", emailBody, "y5d3PYumwpQdaGx32")
        dispatch(set_loading(false))
        dispatch(post_short_alert_message({success:`Your ${emailBody.message_category} has been sent to customer care successfully.`}))

    }catch(e){
        dispatch(set_loading(false, ''))
        dispatch(post_short_alert_message({error:`There was an error submitting Your ${emailBody.message_category}. Try again later`})); 
    }
}

