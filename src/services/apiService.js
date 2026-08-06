import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const apiService = async ({
  method,
  url,
  data = null,
  params = null,
}) => {
  try {
    let response;

    switch (method.toUpperCase()) {
      case "GET":
        response = await api.get(url, { params });
        break;

      case "POST":
        response = await api.post(url, data);
        break;

      case "PUT":
        response = await api.put(url, data);
        break;

      case "PATCH":
        response = await api.patch(url, data);
        break;

      case "DELETE":
        response = await api.delete(url);
        break;

      default:
        return {
          success: false,
          status: 0,
          message: `Unsupported HTTP method: ${method}`,
          data: null,
        };
    }

    return {
      success: true,
      status: response.status,
      message: "Success",
      data: response.data,
    };

  } catch (error) {

    if (error.response) {
      const { status, data } = error.response;

      let message = "Something went wrong";

      switch (status) {
        case 400:
          message = data?.message || "Bad Request";
          break;

        case 401:
          message = data?.message || "Unauthorized";
          break;

        case 403:
          message = data?.message || "Access Denied";
          break;

        case 404:
          message = data?.message || "Resource Not Found";
          break;

        case 500:
          message = data?.message || "Internal Server Error";
          break;
      }

      return {
        success: false,
        status,
        message,
        data: data || null,
      };
    }

    if (error.request) {
      return {
        success: false,
        status: 0,
        message: "Unable to connect to server.",
        data: null,
      };
    }

    return {
      success: false,
      status: 0,
      message: error.message,
      data: null,
    };
  }
};