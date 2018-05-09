import axiosInstance from "../config/axios.config";

const baseUrl = process.env.REACT_BASEPATH;

export function create(user) {
  const config = {
    method: "POST",
    headers: {},
    data: user
  };
  return axiosInstance("http://localhost:3050/", config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function readAll() {
  const config = {
    method: "GET",
    headers: {}
  };
  return axiosInstance("http://localhost:3050/", config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(id, userData) {
  const config = {
    method: "PUT",
    headers: {},
    data: userData
  };
  return axiosInstance(`http://localhost:3050/${id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function deleteUser(id) {
  const config = {
    method: "DELETE",
    headers: {}
  };
  return axiosInstance(`http://localhost:3050/${id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  return Promise.reject(error);
};
