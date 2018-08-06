import axios from "axios";
import axiosInstance from "../../config/axios.config.js";

export function registerUser(formData) {
  const config = {
    method: "POST",
    data: formData
  };
  axios
    .create(`/api/register-user`, config)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      throw new Error(err);
    });
}
