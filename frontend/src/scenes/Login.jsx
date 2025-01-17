import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "./validation";
import login from "../redux/actions/login";
import illustration from "../assets/login.svg"

function Login() {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loginStatus, setLoginStatus] = useState({
        status: null,
        message: null
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
    });

    const handleChange = (event) => {
        setLoginInfo({
            ...loginInfo,
            [event.target.name]: event.target.value
        });
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validation(loginInfo, 'all');
        setErrors(validationErrors);

        if (
            !loginInfo.email ||
            !loginInfo.password
        ) {
            setLoginStatus({
                status: "Fail",
                message: "Please fill out all required fields"
            });
        } else {
            if (!errors.email &&
                !errors.password
            ) {
                try {
                    const loginStatus = await login(loginInfo);

                    setLoginStatus(loginStatus);

                    if (loginStatus.status === "Success") {
                        navigate("/notes");
                    }
                } catch (error) {
                    setLoginStatus({
                        status: "Fail",
                        message: "Wrong email or password"
                    });
                };
            }
        };
    };

    return (
        <div className={styles.login}>
            <div className={styles.containerLeft}>
                <img className={styles.illustration} src={illustration} alt="ilustración"></img>
            </div>
            <div className={styles.containerRight}>
                <h1 className="roboto-bold-32-black">Login</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.vertical}>
                        <label className="roboto-medium-16-purple">EMAIL</label>
                        <input
                            className={styles.input}
                            name="email"
                            type="text"
                            placeholder="Enter your email..."
                            onChange={handleChange}
                            value={loginInfo.email}
                        />
                        {errors.email ? <p className={styles.txtError}>{errors.email}</p> : null}
                    </div>
                    <div className={styles.vertical}>
                        <label className="roboto-medium-16-purple">PASSWORD</label>
                        <div className={styles.containerPassword}>
                            <input
                                className={styles.input}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password..."
                                onChange={handleChange}
                                value={loginInfo.password}
                            />
                            <button
                                className={styles.btnEye}
                                type="button"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? (
                                    <svg
                                        className={styles.icn}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className={styles.icn}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password ? <p className={styles.txtError}>{errors.password}</p> : null}
                    </div>
                    <button className={styles.btnLogin}>Login</button>
                    {loginStatus.status ? <p className={loginStatus.status === "Success" ? styles.txtSemiBold16Green : styles.txtError16}>{loginStatus.message}</p> : null}
                </form>
            </div>
        </div>
    );
};


export default Login;