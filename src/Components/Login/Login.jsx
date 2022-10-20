/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";

import LoginImage from "../../Assests/Mobile-loginUI.png";
import Logo from "../../Assests/Laboratories-logo-2.png";
import Notification from "../Notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const navigateRegister = () => {
		navigate("/patient/register");
	};

	if (isLoggedIn) {
		localStorage.setItem("loggedIn", true);
	}

	const onLogin = async (e) => {
		e.preventDefault();
		const data = {
			username: username,
			password: password,
		};
		try {
			await axios
				.post("api/login", data)
				.then((result) => {
					console.log({ result });
					setNotify({
						isOpen: true,
						message: "Successfully logged in",
						type: "success",
					});
					localStorage.setItem(
						"authentication",
						result.data.authentication,
					);
					setIsLoggedIn(true);
					localStorage.setItem("isLoggedIn", true);
					localStorage.setItem("roleData", result.data.roleData);
					localStorage.setItem("id", result.data.roleData._id);

					localStorage.setItem("role", result.data.role);

					localStorage.setItem(
						"fname",
						result.data.roleData.firstName,
					);
					localStorage.setItem(
						"lname",
						result.data.roleData.lastName,
					);
					setInterval(() => {
						if (result.data.roleData.isPatient === true) {
							navigate("/");
							window.location.reload();
						} else {
							navigate("/labassistant/dashboard");
							window.location.reload();
						}
					}, 1500);
				})
				.catch((err) => {
					console.log(err);
					setNotify({
						isOpen: true,
						message: "Failed to Login",
						type: "error",
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<section class="h-full gradient-form bg-transparent md:h-screen">
				<div class="container py-12 px-6 h-full">
					<div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
						<div class="xl:w-12/12">
							<div class="block rounded-lg">
								<div class="lg:flex lg:flex-wrap g-0">
									<div class="lg:w-6/12 px-4 md:px-0">
										<div class="md:p-8 md:mx-6 bg-white shadow-lg rounded-2xl">
											<div class="text-center">
												<h4 class="text-xl text-button-blue font-semibold mt-1 mb-1 pb-2">
													User Login Portal
												</h4>
												<img
													class="mx-auto w-36"
													src={Logo}
													alt="logo"
												/>

												<h4 class="text-xl text-button-blue font-semibold mt-2 mb-12 pb-1">
													We are Care For You
												</h4>
											</div>
											<form method="POST">
												<p class="mb-4 text-center">
													Please login to your
													account
												</p>
												<div class="mb-4">
													<input
														type="text"
														class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
														id="exampleFormControlInput1"
														placeholder="Username"
														onChange={(e) =>
															setUsername(
																e.target
																	.value,
															)
														}
													/>
												</div>
												<div class="mb-4">
													<input
														type="password"
														class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
														id="exampleFormControlInput1"
														placeholder="Password"
														onChange={(e) =>
															setPassword(
																e.target
																	.value,
															)
														}
													/>
												</div>
												<div class="text-center pt-1 mb-12 pb-1">
													<button
														class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-button-blue hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
														type="button"
														onClick={onLogin}
														data-mdb-ripple="true"
														data-mdb-ripple-color="light">
														Log in
													</button>
													<a
														class="text-gray-500 hover:text-button-blue"
														href="#!">
														Forgot password?
													</a>
												</div>
												<div class="flex items-center justify-between pb-6">
													<p class="mb-0 mr-2">
														Don't have an
														account?
													</p>
													<button
														type="button"
														onClick={
															navigateRegister
														}
														class="inline-block px-24 py-2 border-2 border-button-blue text-button-blue font-medium text-xs leading-tight uppercase rounded hover:drop-shadow-xl focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
														data-mdb-ripple="true"
														data-mdb-ripple-color="light"
														// onSubmit={onLogin}
													>
														Register
													</button>
												</div>
											</form>
										</div>
									</div>
									<div class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-main-blue">
										<div class="text-white px-4 py-6 md:p-12 md:mx-6">
											<img
												src={LoginImage}
												alt="loginImage"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Notification notify={notify} setNotify={setNotify} />
		</>
	);
};

export default Login;
