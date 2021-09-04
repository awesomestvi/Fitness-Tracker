const API_KEY = "AIzaSyB_2wgqRItdldgisoCUgbCWg7-zFGBcvvY";
const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";

export const LOGIN_URL = `${BASE_URL}signInWithPassword?key=${API_KEY}`;
export const SIGNUP_URL = `${BASE_URL}signUp?key=${API_KEY}`;
export const API_ENDPOINT = "https://vishals-fitness-tracker-api.herokuapp.com";
// export const API_ENDPOINT = "https://localhost:9000";
