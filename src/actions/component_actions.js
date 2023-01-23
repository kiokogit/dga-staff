

export const set_loading = (loading_state, message) =>async(dispatch) => {
        
        await dispatch({type:'SET_LOADING', payload:{loading_state, message}})
}