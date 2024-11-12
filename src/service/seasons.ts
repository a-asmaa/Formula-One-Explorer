const BASE_URL = 'https://ergast.com'; // TODO: add to env variables

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