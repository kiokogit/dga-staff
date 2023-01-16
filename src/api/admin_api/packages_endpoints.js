import {API} from "../api_settings";


export const post_new_package_api = (data) => API.post('packages/ingestion/create_new_package', data)