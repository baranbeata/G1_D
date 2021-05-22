import axios from 'axios';

const API_URL = 'http://localhost:8080/';


class ShopService {

    getShops() {
        return axios.get(API_URL + 'shops');
    }

    getShopDetails() {
        return axios.get(API_URL + 'shops/{id}');

    }

}

export default new ShopService();