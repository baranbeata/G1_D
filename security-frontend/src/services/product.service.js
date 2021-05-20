import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class ProductService {

  getProducts() {
    return axios.get(API_URL + 'products');
  }

  getProductDetails() {
    return axios.get(API_URL + 'products/:productId');
  }

}

export default new ProductService();
