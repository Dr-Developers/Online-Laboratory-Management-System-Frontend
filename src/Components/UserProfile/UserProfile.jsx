/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../Notification/index";
import "antd/dist/antd.min.css";

const UserProfile = () => {
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const malebtn = document.getElementById("radio-Male");
	const femalebtn = document.getElementById("radio-Female");

	const removeDisable = () => {
		document.getElementById("floating_first_name").disabled = false;
		document.getElementById("floating_last_name").disabled = false;
		document.getElementById("floating_phone").disabled = false;
		document.getElementById("floating_address").disabled = false;
		document.getElementById("radio-Male").disabled = false;
		document.getElementById("radio-Female").disabled = false;
		document.getElementById("floating_password").disabled = false;
	};

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [nic, setNic] = useState("");
	const [address, setAddress] = useState("");
	const [date, setDate] = useState(new Date());
	const [dateOfBirth, setDateOfBirth] = useState(new Date(date));
	const [gender, setGender] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	console.log("firstName: ", firstName);

	const id = localStorage.getItem("id");

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get("api/patient/" + id);
			console.log("Profile: ", res);
			setFirstName(res.data.firstName);
			setLastName(res.data.lastName);
			setEmail(res.data.email);
			setPhoneNumber(res.data.phoneNumber);
			setNic(res.data.nic);
			setAddress(res.data.address);
			setDate(res.data.dateOfBirth);
			setDateOfBirth(res.data.dateOfBirth);
			setGender(res.data.gender);
			setUsername(res.data.username);
			setPassword(res.data.password);

			console.log(date);

			if (gender === "male") {
				malebtn.checked = true;
				femalebtn.checked = false;
			} else if (gender === "female") {
				malebtn.checked = false;
				femalebtn.checked = true;
			}
		};
		getData();
	}, []);

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

	const onUpdate = async () => {
		const updateData = {
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

		try {
			await axios
				.put(
					"api/patient/update/" + id,
					// {
					// headers: {
					// 	authentication:
					// 		localStorage.getItem("authentication"),
					// },
					updateData,
					// }
				)
				.then((res) => {
					console.log(res);
					setNotify({
						isOpen: true,
						message: "Patient Update Successfull!",
						type: "success",
					});
				})
				.catch((err) => {
					console.log(err);
					setNotify({
						isOpen: true,
						message: "Patient Update Failed!",
						type: "error",
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="ml-20">
			<div className="w-fit mb-5 mt-10">
				<h1 className="text-button-blue font-semibold text-3xl text-center">
					User Profile
				</h1>
				<button
					type="button"
					onClick={removeDisable}
					class="text-white bg-button-blue hover:underline focus:outline-none font-medium rounded-full text-sm sm:w-auto px-10 py-2.5 text-center dark:bg-button-blue mt-5">
					Edit
				</button>
			</div>
			<form
				onSubmit={onUpdate}
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
								value={firstName}
								name="floating_first_name"
								id="floating_first_name"
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
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
								value={lastName}
								name="floating_last_name"
								id="floating_last_name"
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
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
								value={email}
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) => setEmail(e.target.value)}
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
								value={phoneNumber}
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
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
								value={nic}
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) => setNic(e.target.value)}
							/>
							<label
								for="floating_NIC"
								class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								NIC
							</label>
						</div>
						<div class="relative z-0 mb-6 w-[100%] group">
							<input
								type="text"
								value={address}
								name="floating_floating_address"
								id="floating_address"
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
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
											disabled={true}
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
											onChange={(e) =>
												setGender(e.target.value)
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
											disabled={true}
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
											onChange={(e) =>
												setGender(e.target.value)
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
								value={username}
								disabled={true}
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
								value={password}
								disabled={true}
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
					</div>
					<div class="grid md:grid-cols-2 md:gap-6">
						<div class="relative z-0 mb-6 w-full mt-11 group">
							<button
								type="button"
								onClick={onUpdate}
								class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-sm w-full sm:w-auto px-[234px] py-2.5 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-5">
								Update
							</button>
						</div>
					</div>
				</div>
			</form>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};

export default UserProfile;
