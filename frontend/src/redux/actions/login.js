import axios from "axios";

const login = async (userInfo) => {
    const endpoint = axios.defaults.baseURL + "user/login";

    console.log(userInfo);

    try {
        const response = await axios.post(endpoint, { userInfo });

        const token = response.data.token;
        const currentUser = response.data.user;

        console.log(response);

        localStorage.setItem('authToken', JSON.stringify(token));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Add this line to trigger a global event
        window.dispatchEvent(new Event('storage'));

        const loginStatus = {
            status: "Success",
            message: "¡Welcome!"
        };

        return loginStatus;
    } catch (error) {
        console.log(error);
    }

};

export default login;
