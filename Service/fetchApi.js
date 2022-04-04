import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";
export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      "X-RapidAPI-Key": "88fab3b810msh235b215a573b532p100b2cjsn87d4f82611b8",
    },
  });
  return data;
};
