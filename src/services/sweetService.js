import axios from "axios";

const API_URL = "https://sweet-backend-1q7h51buw-shinats-projects.vercel.app/api/sweets";

export const getSweets = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
