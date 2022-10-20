/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from "react";
import { DatePicker, Space } from "antd";

import Footer from "../../../Components/Footer/footer";
import NavBar from "../../../Components/NavBar/navbar2";
import "antd/dist/antd.min.css";
import RegisterImage from "../../../Assests/register.png";
import Notification from "../../../Components/Notification/index";
import axios from "axios";

export default function PatientRegister() {
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [nic, setNic] = useState("");
	const [address, setAddress] = useState("");
	const [dateOfBirth, setDOB] = useState(new Date("2000/01/01"));
	const [gender, setGender] = useState("male");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	// console.log(email);

	const error = document.getElementById("errorMessage");

	// error handling
	const errorhandling = () => {
		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			address === "" ||
			password === "" ||
			confirmPass === "" ||
			phoneNumber === "" ||
			nic === "" ||
			dateOfBirth === "" ||
			username === "" ||
			gender === ""
		) {
			error.innerHTML =
				"* Fill out all the fields. (All the fields are required)";
			return true;
		} else {
			error.innerHTML = "";
			return false;
		}
	};

	// on submit function
	const submit = async (e) => {
		e.preventDefault();
		const bool = errorhandling();

		if (!bool) {
			if (password === confirmPass) {
				const data = {
					firstName: firstName,
					lastName: lastName,
					email: email,
					phoneNumber: phoneNumber,
					nic: nic,
					address: address,
					dateOfBirth: dateOfBirth,
					gender: gender,
					username: username,
					password: password,
				};

				console.log(data);

				try {
					await axios
						.post("api/patient/register", data)
						.then((res) => {
							console.log(res);
							setNotify({
								isOpen: true,
								message:
									"Patient Registration Successfull!",
								type: "success",
							});
						})
						.catch((err) => {
							console.log(err);
							setNotify({
								isOpen: true,
								message: "Patient Registration Failed!",
								type: "error",
							});
						});
				} catch (err) {
					console.log(err);
				}
			} else {
				error.innerHTML = "* Passwords you entered are different.";
			}
		}
	};

	// password show hide toggler
	const PasswordToggler = () => {
		const password = document.getElementById("floating_password");
		const label = document.getElementById("toggle_password");

		if (password.type === "password") {
			password.type = "text";
			label.innerHTML = "Hide";
		} else {
			password.type = "password";
			label.innerHTML = "Show";
		}

		password.focus();
	};

	// confirm passwor show hide toggler
	const ConfirmPasswordToggler = () => {
		const confirm_password = document.getElementById(
			"floating_repeat_password",
		);
		const confirm_label = document.getElementById("toggle_cpassword");

		if (confirm_password.type === "password") {
			confirm_password.type = "text";
			confirm_label.innerHTML = "Hide";
		} else {
			confirm_password.type = "password";
			confirm_label.innerHTML = "Show";
		}

		confirm_password.focus();
	};

	return (
		<>
			<div className="bg-main-blue w-[100%] h-full">
				{/* NavBar Holder */}
				<div>
					<NavBar />
				</div>

				{/* Form Holder */}
				<div className="ml-20">
					<div className="w-[65%] mb-10 mt-10">
						<h1 className="text-button-blue font-semibold text-3xl text-center">
							Patient Registration Portal
						</h1>
					</div>
					<form
						onSubmit={submit}
						className="bg-white w-[65%] h-auto p-14 mb-20 rounded-xl">
						<p
							className="text-red-600 mb-10 text-sm"
							id="errorMessage"
						/>
						<div>
							<div class="grid md:grid-cols-2 md:gap-6">
								<div class="relative z-0 mb-6 w-full group">
									<input
										type="text"
										name="floating_first_name"
										id="floating_first_name"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
										placeholder=" "
										required=""
										onChange={(e) =>
											setFirstName(e.target.value)
										}
									/>
									<label
										for="floating_first_name"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										First name
									</label>
								</div>
								<div class="relative z-0 mb-6 w-full group">
									<input
										type="text"
										name="floating_last_name"
										id="floating_last_name"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
										placeholder=" "
										required=""
										onChange={(e) =>
											setLastName(e.target.value)
										}
									/>
									<label
										for="floating_last_name"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Last name
									</label>
								</div>
							</div>
							<div class="grid md:grid-cols-2 md:gap-6">
								<div class="relative z-0 mb-6 w-full group">
									<input
										type="email"
										name="floating_email"
										id="floating_email"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
										placeholder=" "
										required=""
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
									<label
										for="floating_email"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Email address
									</label>
								</div>
								<div class="relative z-0 mb-6 w-full group">
									<input
										type="text"
										name="floating_phone"
										id="floating_phone"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
										placeholder=" "
										required=""
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
									/>
									<label
										for="floating_phone"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Phone Number
									</label>
								</div>
							</div>
							<div class="grid md:grid-cols-2 md:gap-6">
								<div class="relative z-0 mb-6 w-full group">
									<input
										type="text"
										name="floating_NIC"
										id="floating_NIC"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
										placeholder=" "
										required=""
										onChange={(e) =>
											setNic(e.target.value)
										}
									/>
									<label
										for="floating_NIC"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										NIC
									</label>
								</div>
								<div class="relative z-0 mb- w-full group">
									<Space
										direction="vertical"
										style={{ width: "100%" }}>
										<DatePicker
											placeholder="Select Date of Birth"
											onChange={(date) =>
												setDOB(date)
											}
											style={{
												background: "transparent",
												border: "none",
												borderBottom:
													"2px solid #265673",
												marginTop: "10px",
												width: "100%",
												color: "#265673",
											}}
										/>
									</Space>
								</div>
							</div>
							<div class="grid md:grid-cols-1 md:gap-6">
								<div class="relative z-0 mb-6 w-[100%] group">
									<input
										type="text"
										name="floating_floating_address"
										id="floating_address"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
										placeholder=" "
										required=""
										onChange={(e) =>
											setAddress(e.target.value)
										}
									/>
									<label
										for="floating_address"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Address
									</label>
								</div>
							</div>
							<div class="grid md:grid-cols-2 md:gap-6">
								<div class="relative z-0 mb-6 w-full group">
									<h3 class="mb-4 font-regular text-sm text-button-blue">
										Select Gender
									</h3>
									<ul class="items-center w-full text-sm font-medium rounded-xl border sm:flex text-white bg-cyan-800">
										<li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-white">
											<div class="flex items-center pl-3">
												<input
													id="radio-Male"
													type="radio"
													value="male"
													name="list-radio"
													checked="true"
													class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
													onChange={(e) =>
														setGender(
															e.target.value,
														)
													}
												/>
												<label
													for="horizontal-list-radio-license"
													class="py-3 ml-2 w-full text-sm font-medium text-white">
													Male
												</label>
											</div>
										</li>
										<li class="w-full border-b border-white sm:border-b-0 sm:border-">
											<div class="flex items-center pl-3">
												<input
													id="radio-Female"
													type="radio"
													value="female"
													name="list-radio"
													class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
													onChange={(e) =>
														setGender(
															e.target.value,
														)
													}
												/>
												<label
													for="horizontal-list-radio-id"
													class="py-3 ml-2 w-full text-sm font-medium text-white">
													Female
												</label>
											</div>
										</li>
									</ul>
								</div>
								<div class="relative z-0 mb-6 w-5/6 mt-8 group">
									<input
										type="text"
										name="floating_username"
										id="floating_username"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
										placeholder=" "
										required=""
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
									<label
										for="floating_username"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Username
									</label>
								</div>
							</div>
							<div class="grid md:grid-cols-2 md:gap-6">
								<div class="relative z-0 mb-6 w-full group">
									<input
										type="password"
										name="floating_password"
										id="floating_password"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer js-password"
										placeholder=" "
										required=""
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									<label
										for="floating_password"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Password
									</label>
									<div class="absolute inset-y-0 right-0 flex items-center px-2">
										<label
											class="bg-button-hover-blue hover:bg-button-blue rounded px-2 py-1 text-sm text-white font-mono cursor-pointer js-password-label"
											id="toggle_password"
											onClick={PasswordToggler}
											for="toggle">
											show
										</label>
									</div>
								</div>
								<div class="relative z-0 mb-6 w-5/6 group">
									<input
										type="password"
										name="repeat_password"
										id="floating_repeat_password"
										class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer js-cpassword"
										placeholder=" "
										required=""
										onChange={(e) =>
											setConfirmPass(e.target.value)
										}
									/>
									<label
										for="floating_repeat_password"
										class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Confirm password
									</label>
									<div class="absolute inset-y-0 right-0 flex items-center px-2">
										<label
											class="bg-button-hover-blue hover:bg-button-blue rounded px-2 py-1 text-sm text-white font-mono cursor-pointer js-password-label"
											id="toggle_cpassword"
											onClick={
												ConfirmPasswordToggler
											}
											for="toggle">
											show
										</label>
									</div>
								</div>
							</div>
							<div class="grid md:grid-cols-2 md:gap-6">
								<div class="relative z-0 mb-6 w-full mt-11 group">
									<button
										type="submit"
										class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-sm w-full sm:w-auto px-[234px] py-2.5 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-5">
										Register
									</button>
									<p className="text-center text-button-blue text-sm tracking-widest mt-5 font-medium">
										I Already Have an Account.{" "}
										<a
											href="/"
											className="font-semibold text-button-blue">
											Sign in
										</a>
									</p>
								</div>
							</div>
						</div>
					</form>
					<img
						src={RegisterImage}
						alt="image"
						className="w-[550px] absolute left-[1150px] top-[510px]"
					/>
				</div>
				<Footer />
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</>
	);
}
