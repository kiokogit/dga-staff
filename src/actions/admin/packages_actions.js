import { activate_package_api, get_all_packages_api, post_new_package_api } from "../../api/admin_api/packages_endpoints"

export const post_new_package = async(new_package) =>  (await post_new_package_api(new_package)).data

export const activate_package = async(id) => (await activate_package_api(id)).data

export const get_all_packages_all = async(page) => (await get_all_packages_api(page)).data