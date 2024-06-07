import axios from "axios";

const baseURL = "http://192.168.1.116:3000";

const fetchDataFromAPI = async (method, apiEndpoint, data, id) => {
  try {
    const url = `${baseURL}/${apiEndpoint}`;
    let response;

    switch (method) {
      case "GET":
        response = await axios.get(url);
        return response.data;
      case "POST":
        response = await axios.post(url, data);
        return response;
      case "PUT":
        response = await axios.put(`${url}/${data.id}`, data);
        return response.data;
      case "DELETE":
        try {
          await axios.delete(`${url}/${data.id}`, id);
          return;
        } catch (error) {
          console.error("Error on delete route:", error, data.id);
          throw error;
        }

      default:
        throw new Error("Invalid HTTP method");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchDataFromAPI;
