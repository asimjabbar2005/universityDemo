import http from "./http-common";

const getAll = () => {
  return http.get("/universities");
};

const get = (id) => {
  return http.get(`/universities/${id}`);
};

const create = (data) => {
  return http.post(`/universities/`, data);
};

const update = (id, data) => {
  return http.put(`/universities/${id}`, data);
};

const searchByCountry = (country) => {
  return http.get(`/universities/search?country=${country}`);
};

const UniversityService = {
  getAll,
  get,
  create,
  update,
  searchByCountry,
};

export default UniversityService;
