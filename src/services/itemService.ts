import { IItem } from '../types/item';
import { apiGet, apiPost } from "./apiService";

const itemsUri = '/v1/items';

export const listItems = () => {
    return apiGet(itemsUri);
}

export const createItem = (item: IItem) => {
    return apiPost(itemsUri, item);
}