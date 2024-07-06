import axios from "axios";
const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";

export const login = async (data) => {
    try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    return response.data;
    } catch(error) {
        console.log("login failed(auth):", error);
    }
};

export const logout = async () => {
    const response = await axios.post(`${API_URL}/users/logout`);
    return response.data;
}


export const register = async (data) => {
    try {
    const response = await axios.post(`${API_URL}/users/register`, data);
    return response.data;
    } catch(error) {
        console.log("registration failed:",  error);
    }
};

export const getUserProfile = async (token) => {
    try {
    const response = await axios.get(`${API_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
    } catch(error) {
        console.log("getProfile failed:", error);
    }
}

export const updateUserProfile = async (token, data) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  
  export const deleteUserProfile = async (token) => {
    try {
      const response = await axios.delete(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  };