import React, { useEffect, useState } from "react";
//import './App.css';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
//import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import axios from "axios";
import "antd/dist/antd.min.css";
import Footer from "./../../../Components/Footer/footer";
import NavBar from "./../../../Components/NavBar/navbar2";
//import Notification from "../Notification/index";
import { useLocation, useNavigate } from "react-router-dom";

import { DatePicker, Space } from "antd";

function ViewReport() {
	const [inputFields, setInputFields] = useState([[
		{ test: "", result: "", normalValues: "", id:"" },
	]]);

	// const handleSubmit = (e) => {
	//   e.preventDefault();
	//   console.log("InputFields", inputFields);
	// };

	const handleChangeInput = (index, event) => {
		const values = [...inputFields];
		values[index][event.target.name] = event.target.value;
		setInputFields(values);
	};

	const handleAddFields = () => {
		setInputFields([
			...inputFields,
			{ test: "", result: "", normalValues: "" },
		]);
	};

	const handleRemoveFields = (index) => {
		const values = [...inputFields];
		values.splice(index, 1);
		setInputFields(values);
	};

	const [isOpen, setIsOpen] = useState(false);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	let navigate = useNavigate();
	

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [date, setDate] = useState("");
	const [age, setAge] = useState("");
	const [nic, setNic] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [testName, setTestName] = useState("");

	const error = document.getElementById("errorMessage");

	const location = useLocation();

	// error handling
	// const errorhandling = () => {
	// 	if (
	// 		firstName === "" ||
	// 		lastName === "" ||
	// 		Gender === "" ||
	// 		date === "" ||
	// 		age === "" ||
	// 		nic === "" ||
	// 		phoneNumber === "" ||
	// 		testName === ""
	// 	) {
	// 		error.innerHTML =
	// 			"* Fill out all the fields. (All the fields are required)";
	// 	} else {
	// 		error.innerHTML = "";
	// 	}
	// };
	const id = window.location.pathname.split("/")[3];
	console.log(id);
	//  const getData = async () => {
	// 	const response = await axios.get(`/api/report/${id}`)
	// 	console.log(response.firstName)

	// setFirstName(location.state.firstName);
	// setLastName(location.state.lastName);
	// setGender(location.state.Gender);
	// setDate(location.state.testDate);
	// setAge(location.state.age);
	// setNic(location.state.nic);
	// setPhoneNumber(location.state.phoneNumber);
	// setTestName(location.state.testName);
	// };
	// getData();

	useEffect(() => {
		const getData = async () => {
			// const response = await axios.get(`/api/report/${id}`)
			console.log("hh");

			setFirstName(location.state.firstName);
			setLastName(location.state.lastName);
			setGender(location.state.Gender);
			setDate(location.state.testDate);
			setAge(location.state.age);
			setNic(location.state.nic);
			setPhoneNumber(location.state.phoneNumber);
			setTestName(location.state.testName);
			setInputFields(location.state.testData);
		};
		getData();
	}, [location]);

	//console.log(firstName,lastName,Gender, date, age, nic, phoneNumber, testName);
	const inputf = inputFields[0];
	console.log(inputf);
	// on submit function
	const submit = async (e) => {
		e.preventDefault();
		console.log("InputFields", inputFields);
		//const inputs = []
		//result.push(inputFields)
		//console.log("InputFields", result);
		// errorhandling();
		console.log(localStorage.getItem("authentication"));
		//setResult(inputFields)

		const data = {
			firstName: firstName,
			lastName: lastName,
			Gender: gender,
			date: date,
			age: age,
			nic: nic,
			phoneNumber: phoneNumber,
			testName: testName,
			testData: inputFields,
		};

		console.log("result", data.result);

		try {
			await axios
				.put(`api/report/update/${id}`, {
					headers: {
						authentication:
							localStorage.getItem("authentication"),
					},
					data,
				})
				.then((res) => {
					console.log("updated" + res.data);
					//window.location.href = "/patient/report/all";
					setNotify({
						isOpen: true,
						message: "Medical Report Updated Successfull!",
						type: "success",
					});
					setFirstName("");
					setLastName("");
					setGender("");
					setDate("");
					setAge("");
					setNic("");
					setPhoneNumber("");
					setTestName("");
					setInterval(() => {
						navigate("/patientReport/all");
					}, 2500);
				})

				.catch((err) => {
					console.log(err);
					setNotify({
						isOpen: true,
						message: "Medical Report Update Failed!",
						type: "error",
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
		<NavBar />
		<div className="bg-main-blue w-[100%] h-full">
			<div class="overflow-x-auto">
				<div className="flex justify-center item-center">
					<div class="min-w-screen min-h-fit flex justify-center font-sans overflow-hidden">
						<div class="w-full lg:w-5/6 h-fit">
							<div className="w-[100%] mt-10">
								<h1 className="text-center text-3xl font-semibold text-button-blue">
									Portal For Report Submission
								</h1>
							</div>
							<form
								onSubmit={submit}
								className=" w-[100%] h-auto rounded-xl p-5">
								<p
									className="text-red-600 mb-10 text-sm"
									id="errorMessage"
								/>

								<div class="bg-white shadow-md py-10 rounded-2xl ">
									{/*---------------------------*/}
									<div class="grid md:grid-cols-2 md:gap-6 px-20 py-5">
										<div class="relative z-0 mb-6 w-full group">
											<input
												disabled
												type="text"
												name="firstName"
												id="firstName"
												class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
												placeholder=" "
												required=""
												value={firstName}
	
											/>
											<label
												for="floating_email"
												class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
												First Name
											</label>
										</div>
										<div class="relative z-0 mb-6 w-full group">
											 <input
												disabled
												type="text"
												name="lastName"
												id="lastName"
												class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
												placeholder=" "
												required=""
												
												value={lastName}
											/> 
											<label
												for="lastName"
												class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
												Last Name
											</label>
										</div>
									</div>
									<div class="grid md:grid-cols-2 md:gap-6 px-20">
										<div class="relative z-0 mb-6 w-full group">
											<h3 class="mb-4 font-regular text-sm text-button-blue">
												Select Gender
											</h3>
											<ul class="items-center w-full text-sm font-medium rounded-xl border sm:flex text-white bg-cyan-800">
												<li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-white">
													<div class="flex items-center pl-3">
														<input
															disabled={gender !== "male"}
															checked={gender === "male"}
															id="radio-Male"
															type="radio"
															value="male"
															name="list-radio"

															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
															onChange={(
																e,
															) =>
																setGender(
																	e
																		.target
																		.value,
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
														disabled={gender !== "female"}
														checked={gender === "female"}
															id="radio-Female"
															type="radio"
															value="female"
															name="list-radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setGender(
																	e
																		.target
																		.value,
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
										<div class="relative z-0 mt-6 w-full group">
											<input
											disabled
												type="text"
												value={date.split("T")[0]}
											/>

											<Space
												direction="vertical"
												style={{ width: "100%" }}>
												<DatePicker
													placeholder="Select Date"
													style={{
														background:
															"transparent",
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
									<div class="grid md:grid-cols-2 md:gap-6 px-20">
										<div class="relative z-0 mb-6 w-full group">
											<input
											disabled
												type="text"
												name="nic"
												id="nic"
												class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
												placeholder=" "
												required=""
												// onChange={(e) =>
												// 	setNic(e.target.value,)
												// }
												value={nic}
												
											/>
											
											<label
												for="nic"
												class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
												NIC
											</label>
										</div>
										<div class="relative z-0 mb-6 w-full group">
											<input
											disabled
												type="text"
												name="age"
												id="age"
												class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
												placeholder=" "
												required=""
												// onChange={(e) =>
												// 	setAge(e.target.value)
												// }
												value={age}
											/>
											<label
												for="age"
												class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
												Age
											</label>
										</div>
									</div>
									<div class="grid md:grid-cols-1 md:gap-6 px-20">
										<div class="relative z-0 mb-6 w-full group">
											<input
											disabled
												type="text"
												name="phone"
												id="phone"
												class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
												placeholder=" "
												pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
												title="Enter phone number in this format ex: 077-456-7890"
												required="true"
												onChange={(e) =>
													setPhoneNumber(
														e.target.value,
													)
												}
												value={phoneNumber}
											/>
											<label
												for="phone"
												class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
												Phone
											</label>
										</div>
									</div>
									<hr className="h-1 bg-button-blue mb-5 mt-5" />
									<div class="grid md:grid-cols-1 md:gap-6 px-20">
										<div class="relative z-0 mb-6 w-full group">
											<h3 class="mb-4 font-regular text-sm text-button-blue">
												Test Name
											</h3>
											<ul class="items-center w-full text-sm font-medium rounded-xl border sm:flex text-white bg-cyan-800">
												<li class="w-full border-none border-gray-200 sm:border-b-0 sm:border-r dark:border-white">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "bloodSugar"}
														checked={testName === "bloodSugar"}
															id="bloodSugar"
															type="radio"
															value="bloodSugar"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-license"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Blood Sugar
														</label>
													</div>
												</li>
												<li class="w-full border-none border-white sm:border-b-0 sm:border-">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "psa"}
														checked={testName === "psa"}
															id="psa"
															type="radio"
															value="psa"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-id"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															PSA
														</label>
													</div>
												</li>
												<li class="w-full border-none border-white sm:border-b-0 sm:border-">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "fab"}
														checked={testName === "fab"}
															id="fab"
															type="radio"
															value="fab"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-id"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Sputin-For-FAB
														</label>
													</div>
												</li>
												<li class="w-full border-none border-white sm:border-b-0 sm:border-">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "CardiacP"}
														checked={testName === "CardiacP"}
															id="CardiacP"
															type="radio"
															value="CardiacP"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-id"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Cardiac-Profile
														</label>
													</div>
												</li>
												<li class="w-full border-none border-white sm:border-b-0 sm:border-">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "esr"}
														checked={testName === "esr"}
															id="esr"
															type="radio"
															value="esr"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-id"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															ESR
														</label>
													</div>
												</li>
												<li class="w-full border-none border-white sm:border-b-0 sm:border-">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "ggt"}
														checked={testName === "ggt"}
															id="ggt"
															type="radio"
															value="ggt"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-id"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															GGT
														</label>
													</div>
												</li>
											</ul>
											<ul class="items-center w-full text-sm font-medium rounded-xl border sm:flex text-white bg-cyan-800">
												<li class="w-full border-none border-white sm:border-b-0 sm:border-">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "ironS"}
														checked={testName === "ironS"}
															id="ironS"
															type="radio"
															value="ironS"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-id"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Iron Study
														</label>
													</div>
												</li>
												<li class="w-full border-none border-white sm:border-b-0 sm:border-">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "plateCount"}
														checked={testName === "plateCount"}
															id="plateCount"
															type="radio"
															value="plateCount"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-id"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Platelet Count
														</label>
													</div>
												</li>
												<li class="w-full border-none border-gray-200 sm:border-b-0 sm:border-r dark:border-white">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "rProfile"}
														checked={testName === "rProfile"}
															id="rProfile"
															type="radio"
															value="rProfile"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-license"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Renai Profile
														</label>
													</div>
												</li>
												<li class="w-full border-none border-gray-200 sm:border-b-0 sm:border-r dark:border-white">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "urineRoutine"}
														checked={testName === "urineRoutine"}
															id="urineRoutine"
															type="radio"
															value="urineRoutine"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-license"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Urine Routine
														</label>
													</div>
												</li>
												<li class="w-full border-none border-gray-200 sm:border-b-0 sm:border-r dark:border-white">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "sChemistry"}
														checked={testName === "sChemistry"}
															id="sChemistry"
															type="radio"
															value="sChemistry"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-license"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															Serum Chemistry
														</label>
													</div>
												</li>
												<li class="w-full border-none border-gray-200 sm:border-b-0 sm:border-r dark:border-white">
													<div class="flex items-center pl-3">
														<input
														disabled={testName !== "hcv"}
														checked={testName === "hcv"}
															id="hcv"
															type="radio"
															value="hcv"
															name="radio"
															class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
															onChange={(
																e,
															) =>
																setTestName(
																	e
																		.target
																		.value,
																)
															}
														/>
														<label
															for="horizontal-list-radio-license"
															class="py-3 ml-2 w-full text-sm font-medium text-white">
															HCV
														</label>
													</div>
												</li>
											</ul>
										</div>
									</div>
									<hr className="h-1 bg-button-blue mb-5 mt-5" />
									<div class="grid md:grid-cols-0 md:gap-6 px-20">
										<div className="grid md:grid-colspan-4">
											{inputFields?.map(
												(ifields, index) => {
													const dd = ifields[0];
													console.log(ifields)
													
													return(
														
													<div key={index}>
														<TextField
															style={{
																marginRight:
																	"15px",
																width: "145px",
															}}
															name="test"
															label="Test"
															variant="filled"
															value={
																dd.test
															}
															// onChange={(
															// 	event,
															// ) =>
															// 	handleChangeInput(
															// 		index,
															// 		event,
															// 	)
															// }
														/>
														
														{/* <input type="text" value={dd.test}/> */}
														
														<TextField
															style={{
																marginRight:
																	"15px",
																width: "145px",
															}}
															name="result"
															label="Result"
															variant="filled"
															value={
																dd.result
															}
															// onChange={(
															// 	event,
															// ) =>
															// 	handleChangeInput(
															// 		index,
															// 		event,
															// 	)
															// }
														/>
														<TextField
															style={{
																marginRight:
																	"15px",
																width: "145px",
															}}
															name="normalValues"
															label="Normal Values"
															variant="filled"
															value={
																dd.normalValues
															}
															// onChange={(
															// 	event,
															// ) =>
															// 	handleChangeInput(
															// 		index,
															// 		event,
															// 	)
															// }
														/>
														<IconButton
															onClick={() =>
																handleRemoveFields(
																	index,
																)
															}>
															<RemoveIcon />
														</IconButton>
														<IconButton
															onClick={() =>
																handleAddFields()
															}>
															<AddIcon />
														</IconButton>
													</div>)
												},
											)}
										</div>
										{/* <Button
											varient="contained"
											color="primary"
											type="submit"
											endIcon={<Icon>send</Icon>}
											onClick={submit}>
											Update Report
										</Button> */}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/* <Notification notify={notify} setNotify={setNotify} /> */}
			<Footer />
			</div>
		</>
	);
}

export default ViewReport;
