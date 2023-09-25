import axios from "axios";

export const checkLoginStatus = () => {
  const token = localStorage.getItem("token");
  console.log(token)
    return axios
        .get("http://localhost:3001/api/users/status", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Server response:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

export const loginUser = (email, password) => {
    return axios
        .post("/api/users/login", {
            email,
            password,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw error;
        });
};
