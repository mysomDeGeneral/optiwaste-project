import axios from "axios";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";

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

