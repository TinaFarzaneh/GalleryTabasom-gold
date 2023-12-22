import { PRODUCTS_URL } from "../config";
import api from "./http";
export const GetAllProducts = async () => {
  try {
    const response = await api.get(PRODUCTS_URL);
    return {
      products: response.data,
    };
  } catch (error) {
    console.log(error.message);
  }
};
