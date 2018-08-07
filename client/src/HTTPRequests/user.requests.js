import axios from "axios";

export function registerUser(formData) {
  const config = {
    method: "post",
    url: `api/users/register`,
    data: formData
  };
  axios(config)
    .then(result => {
      console.log(result.data);
    })
    .catch(err => {
      throw new Error(err);
    });
}
