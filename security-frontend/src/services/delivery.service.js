import axios from 'axios';

const API_URL = 'http://localhost:8080/';


class DeliveryService {

  getDeliveries() {
    return axios.get(API_URL + 'deliveries');
  }

  getDeliverDetails() {
    return axios.get(API_URL + 'deliveries/{id}');
  }

  addDelivery() {
    return axios.post(API_URL + "add-delivery", JSON.stringify( {
      
    }), {headers: {
      // Accept: 'application/json',
       'Content-Type': 'application/json;charset=utf-8',
    //   'Access-Control-Allow-Origin': '*'
       }
     });
  }
}

export default new DeliveryService();
