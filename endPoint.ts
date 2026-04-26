import api from "./api";

export const API_ENDPOINTS = {
  CONTACT: {
    BASE: api,
    GET_ALL: `/contact/all`,
    GET_BY_ID: (id: any) => `/contact/${id}`,
    CREATE: "/contact/",
    UPDATE: (id: any) => `/contact/${id}`,
    
 
  },
  USER: {
    BASE: api,
    LOGIN: "/auth/login",
  },
};
