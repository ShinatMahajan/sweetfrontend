import axios from "axios";

const API_URL = "http://localhost:3000/api/sweets";

export const getSweets = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
