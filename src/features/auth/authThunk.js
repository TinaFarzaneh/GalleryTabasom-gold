import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../api/http";
import { LOGIN_URL, REFRESHTOKEN_URL } from "../../config";
import axios from "axios";
import { BASE_URL } from "../../config";
// *****************
export const api = axios.create({ baseURL: BASE_URL, timeout: 80000 });
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
