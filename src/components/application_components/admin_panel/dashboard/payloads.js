// program to generate random strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateString(length) {
    let result = 'PCKG23/';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


export const new_package_payload = {
    "package": {
        "title": "",
        "description": "",
        "package_particulars": "",
        "requirements": "",
        "cover_image": "",
        "tie_to_event": false,
        "expire_after_event": false,
        "country": "Kenya",
        "county": "",
        "city_town": "",
        "lat": null,
        "lng": null,
        "package_from":  null,
        "package_to": null,
        "no_of_days": null,
        "no_of_nights": null,
        "event_name": "",
        "event_from": null,
        "event_to": null
    },
    "images": [],
    "price": [],
    "tags":[]
}