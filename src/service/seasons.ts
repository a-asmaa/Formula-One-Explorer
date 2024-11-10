import { BASE_URL } from "../utils/fetchUtils";
import { getToken } from "../utils/storage";


const token = getToken();

export const createFlight = async (payload: string | FormData, withImage: boolean) => {

    const url = `${BASE_URL}/flights`.concat('', withImage ? '/withPhoto' : '');        

    const response = await fetch(url, {
        method: 'POST',
        body: payload,
        headers: {
            "Authorization": `Bearer ${token}`
          }
    });

    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }
    return response.json();

};


export const updateFlight = async (flightId: string, payload: string | FormData, withImage: boolean) => {

    const url = `${BASE_URL}/flights/${flightId}`.concat('', withImage ? '/withPhoto' : '');        

    const response = await fetch(url, {
        method: 'PUT',
        body: payload,
        headers: {
            "Authorization": `Bearer ${token}`
          }
    });
    return response.json();

};

export const getSeasons = async () => {

    const url = `${BASE_URL}/api/f1/seasons.json`

    const response = await fetch(url, {
        headers: {
            'accept': 'application/json',
        }
    });
    return response.json();
};

export const getSeasonRace = async (season: number) => {

    const url = `${BASE_URL}/api/f1/${season}.json`

    const response = await fetch(url, {
        headers: {
            'accept': 'application/json',
        }
    });
    return response.json();
};


export const getRaceDetails = async (season: number, round: number) => {

    const url = `${BASE_URL}/api/f1/${season}/${round}/results.json`

    const response = await fetch(url, {
        headers: {
            'accept': 'application/json',
        }
    });
    return response.json();
};


