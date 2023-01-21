import {API} from "../api_settings";


export const post_new_package_api = (data) => API.post('packages/ingestion/create_new_package', data)

export const activate_package_api = (id) => API.post(`packages/ingestion/activate_deactivate_package?package_id=${id}`)

export const get_all_packages_api = (page) => API.get(`/packages/views/packages_list_staff?page=${page}`)
