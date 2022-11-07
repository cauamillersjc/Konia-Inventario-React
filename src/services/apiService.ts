import { IResponse } from '../types/response';
import axios from 'axios'

const urlApi = process.env.REACT_APP_API_URL;

// Metódo genérico para chamada do metodo GET na API
export const apiGet = (uri: string) => {
    return axios.get(urlApi + uri)
        .then((response) => {
            let apiResponse = {} as IResponse;
            apiResponse.data = response.data;
            apiResponse.status = response.status;

            return apiResponse;
        })
        .catch(err => {
            console.error(err);
        })
}

// Metódo genérico para chamada do metodo POST na API
export const apiPost = (uri: string, payload: any) => {
    return axios.post(urlApi + uri, payload)
        .then((response) => {
            let apiResponse = {} as IResponse;
            apiResponse.data = response.data;
            apiResponse.status = response.status;

            return apiResponse;
        })
        .catch(err => {
            console.error(err);
        })
}