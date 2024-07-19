import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const loginUser = async (credentials) => {
  try {
    console.log("login:", credentials);
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    console.log("login response:", response);
    return response;
  } catch (error) {
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
  } catch (error) {
    console.log("registration failed:", error);
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
  } catch (error) {
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

export const verifyUser = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/verify-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const loginCollector = async (credentials) => {
  try {
    console.log("loginCollector:", credentials);
    const response = await axios.post(`${API_URL}/collectors/login`, credentials);
    console.log("loginCollector response:", response);
    return response;
  } catch (error) {
    return error.response;
  }
}