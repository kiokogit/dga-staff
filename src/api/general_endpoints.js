import {API} from "./api_settings";

// get all packages
export const get_all_packages_url = (page) => API.get(`/packages/views/packages_list?page=${page}`)

// search for related packages
export const search_packages = (search_value, page) => API.get(`/packages/views/packages_search?SEARCH=${search_value}&&page=${page}`)

// get detailed view of a package
export const get_package_details = (package_id) => API.get(`/packages/views/package_detail_view?package_id=${package_id}`)

export const get_packages_counts_url = (tags, page) => API.get(`/packages/views/package_by_tags?filter=${tags}&&page=${page}`)


export const get_countries_list_api = () => API.get(`/utils/countries/get_countries_data`)

