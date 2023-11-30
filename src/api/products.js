import { PRODUCTS_URL } from "../config";
import axios from "./http";
export const GetAllProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_URL);
    // console.log(response);
    return {
      products: response.data,
    };
  } catch (error) {
    console.log(error.message);
  }
};
