import axios from "axios";
import { BASE_URL } from "../config";

export default axios.create({ baseURL: BASE_URL });
axios.defaults.baseURL = BASE_URL;
