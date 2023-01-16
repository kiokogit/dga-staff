import { config_dev } from "./config.development";
import { config_prod } from "./config.production";

const env = process.env.NODE_ENV || "development"
let config;

if (env === 'production'){
    config = config_prod
} else{
    config = config_dev
}

export const API_ENDPOINT = config.apiEndpoint.base_url

