import { post_new_package_api } from "../../api/admin_api/packages_endpoints"
import { set_loading } from "../component_actions"

export const post_new_package = (new_package) => async(dispatch) => {

    try{
        dispatch(set_loading(true, "Processing..."))
        const {data} = await post_new_package_api(new_package)
        dispatch(set_loading(false, ""))
        dispatch({type:'SHORT_SUCCESS_ALERT', payload:data.details})

    }catch(e){
        dispatch(set_loading(false, ""))
        dispatch({type:'SHORT_ERROR_ALERT', payload:"Not added"})
    }

}