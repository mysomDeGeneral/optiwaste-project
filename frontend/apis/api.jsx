import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/logout`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
  
}

export const registerCollector = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/collectors/register`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const loginCollector = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/collectors/login`, data);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const getCollectors = async () => {
    try {
        const response = await axios.get(`${API_URL}/collectors`);
        return response.data;
    } catch (error) {
        return error.response;
    }
} 

export const getRequests = async () => {
    try {
        const response = await axios.get(`${API_URL}/requests`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const getLocation = async (address) => {
    try {
      const response = await axios.post(`${API_URL}/location/get-location`, {address});
      return response.data;
    } catch (error) {
      return error.response;
    }
}

export const getAddress = async (longitude, latitude) => {
    try {
      console.log(longitude, latitude);
      const response = await axios.post(`${API_URL}/location/get-address`, {longitude,latitude});
      return response.data;
      console.log("api",response);
    } catch (error) {
      return error.response;
    }
}

