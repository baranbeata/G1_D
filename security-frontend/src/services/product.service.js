import axios from 'axios';

const API_URL = 'http://localhost:8080/';


class ProductService {

  getProducts() {
    return axios.get(API_URL + 'products');
  }

  getProductDetails() {
    return axios.get(API_URL + 'products/{id}');
  }

  addProduct(name, price, size, category, type) {
    return axios.post(API_URL + "add-product", JSON.stringify( {
      name,
      price,
      size,
      category,
      type,
    }), {headers: {
      // Accept: 'application/json',
       'Content-Type': 'application/json;charset=utf-8',
    //   'Access-Control-Allow-Origin': '*'
       }
     });
  }
}

export default new ProductService();
