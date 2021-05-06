import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
           localStorage.setItem('username', username);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  changePassword(username,newpassword,password){
    //  alert(`after incrementiname ${email}.`);
    return axios.post(API_URL + "profile/change_password",
        {
        username,
            newpassword,
        password,
    })

  }
}

export default new AuthService();
