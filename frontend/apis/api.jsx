import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

export const registerUser = async (data) => {
  try {
    const response = await api.post('/users/register', data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response;
  } catch (error) {
    return error.response;
  }
}

export const logoutUser = async () => {
  try {
    const response = await api.post('users/logout');
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getUserProfile = async (token) => {
  try {
    const response = await api.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
  
}

export const updateUserProfile = async (token, data) => {
  try {
      const response = await api.put('/users/profile', data, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      console.log("update",response);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

export const registerCollector = async (data) => {
  try {
    const response = await axios.post('/collectors/register', data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const loginCollector = async (credentials) => {
    try {
        const response = await api.post('/collectors/login', credentials);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const getCollectors = async () => {
    try {
        const response = await api.get('/collectors');
        return response.data;
    } catch (error) {
        return error.response;
    }
} 

export const getCollectorProfile = async (token) => {
    try {
        const response = await api.get('/collectors/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('collector response:' , response)
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const updateCollectorProfile = async (token, data) => {
    try {
        const response = await api.put('/collectors/profile', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("update",response);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const getRequests = async (token) => {
    try {
        const response = await api.get('/requests', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const createRequest = async (data, token) => {
  try {
    const response = await axios.post('/requests', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export const getRequest = async (id, token) => {
  try {
    const response = await api.get(`/requests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const updateRequest = async (id, data, token) => {
  try {
    const response = await api.put(`/requests/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const deleteRequest = async (id, token) => {
  try {
    const response = await api.delete(`/requests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const acceptRequest = async (id, token) => {
  try {
    const response = await api.post(`/requests/${id}/accept`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const rejectRequest = async (id, token) => {
  try {
    const response = await api.post(`/requests/${id}/reject`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}


export const getLocation = async (address) => {
    try {
      const response = await api.post('/location/get-location', {address});
      return response.data;
    } catch (error) {
      return error.response;
    }
}

export const getAddress = async (longitude, latitude) => {
    try {
      console.log(longitude, latitude);
      const response = await api.post('/location/get-address', {longitude,latitude});
      return response.data;
    } catch (error) {
      return error.response;
    }
}

