export const clear_short_error_action = () =>dispatch => {

    dispatch({type:'CLEAR_SHORT_ERROR_ALERT', payload:false})
}

export const post_short_alert_message = (message) => dispatch => {

    if (message.error) dispatch({type:"SHORT_ERROR_ALERT", payload:message.error})
    else dispatch({type:"SHORT_SUCCESS_ALERT", payload:message.success})
}