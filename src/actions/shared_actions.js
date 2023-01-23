// import emailjs from '@emailjs/browser';
import { get_countries_list_api } from '../api/general_endpoints';

export const get_countries_list = async() => (await get_countries_list_api()).data
