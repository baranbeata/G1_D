import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class ShopsService {

  getShops() {
    return axios.get(API_URL + 'shops');
  }
 

}

export default new ShopsService();