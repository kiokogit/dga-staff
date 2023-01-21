import { get_all_packages_url, get_packages_counts_url, get_package_details, search_packages } from "../api/general_endpoints"

export const get_all_packages_list = async(page) => (await get_all_packages_url(page)).data

export const get_package_detail_view = async(id) => await get_package_details(id).then(res=>res.data).catch(e=>e.message)

export const get_packages_counts = async(tag, page) => await get_packages_counts_url(tag, page).then(res=>res.data).catch((e)=>e.message)

export const search_packages_action= async(search, page) => await search_packages(search, page).then(res=>res.data).catch(e=>e.message)

