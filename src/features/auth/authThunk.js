import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, LOGIN_URL, REFRESHTOKEN_URL } from "../../config";
// import { api } from "../../api";
import axios from "axios";
// *****************
const api = axios.create({ baseURL: BASE_URL });

//data= username:string password:string
export const loginUser = createAsyncThunk(`auth/login`, async (data) => {
  const response = await api.post(`${LOGIN_URL}`, data);
  return response.data;
});

//data= refreshToken:string
export const refreshTokenThunk = createAsyncThunk(
  `auth/token`,
  async (data) => {
    const response = await api.post(`${REFRESHTOKEN_URL}`, data);
    return response.data;
  }
);
