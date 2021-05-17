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

  register(username, email, password, role) {
    return axios.post(API_URL + "signup", JSON.stringify( {
      username,
      email,
      password,
      role,
    }), {headers: {
      // Accept: 'application/json',
       'Content-Type': 'application/json;charset=utf-8',
    //   'Access-Control-Allow-Origin': '*'
       }
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

  forgotpass(email) {
    return axios.post(API_URL + "forgot-password", {email});
  }

  infoedit(username, name, surname, pesel,tel)
  {
    return axios.post(API_URL + "profile/profile_form",
        {
        username,
        name,
        surname,
        pesel,
        tel
  }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user_info", JSON.stringify(response.data));
       localStorage.setItem('username', username);
    }

    return response.data;
  });

  }
}
export default new AuthService();
