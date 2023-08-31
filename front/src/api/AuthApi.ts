// authService.js

import instance from "../http/axiosApi"; // Make sure the import path is correct

export const login = async (username: any, password: any) => {
  try {
    const response = await instance.post(`/users/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const data = response.data; // Assuming the response data contains user information
      return { success: true, user: data.user, token: data.token };
    } else {
      const errorData = response.data; // Assuming the response data contains error information
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred during login.' };
  }
};
