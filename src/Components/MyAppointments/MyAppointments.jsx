import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import Notification from "../Notification/index";
import { useNavigate } from "react-router-dom";

function MyAppointments() {
	const [nic, setNIC] = useState("");
	const [testName, setTestName] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [textNull, setTextNull] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState(null);
	const [age, setAge] = useState("");
	const [id, setID] = useState("");


	
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const Navigation = useNavigate();
	const cancelAppointment = () => {
		Navigation("/patient/appointment/cancel", {
			state:{id:id,}
		});
	};

	//on submit function
	const Onsubmit = async (nic) => {
		try {
			axios.post(`/api/appointment`, { nic }).then((result) => {
				setTestName(result.data.testName);
				setDate(result.data.date);
				setTime(result.data.time);
				setFirstName(result.data.firstName);
				setLastName(result.data.lastName);
				setAge(result.data.age);
				setEmail(result.data.email);
				setGender(result.data.gender);
				setPhoneNumber(result.data.phoneNumber);
				setTextNull(result.statusText);
				setNIC(result.data.nic);
				setID(result.data._id);

				console.log("Status txt : " + result.statusText);

				console.log("status : ", result.status);
				if (result === null) {
					setTextNull(null);
				}
			});
		} catch (error) {
			console.log(error);
		}
	};


	const navigate = useNavigate();

    const UpdateAppointment = () => {
        navigate(`/patient/appointment/update/${id}`,{
			state: {
			firstName : firstName,
			lastName : lastName,
            date : date,
            time : time,
			age : age,
            testName : testName,
			email: email,
			phoneNumber:phoneNumber,
			gender: gender,
			nic: nic,
			},
		});
    };


	return (
		<>
			<div className="bg-main-blue w-[100%] h-full">
				<div className="flex justify-center items-center">
					<div className="ml-20 w-full">
						<div className="w-[100%] mb-10 mt-12">

							<h1 className="text-button-blue font-semibold text-4xl text-center">
								My Appointments
							</h1>
						</div>
						<div className="flex justify-center items-center">
							<div id="form">
								<input
									type="search"
									id="query"
									name="q"
									placeholder="🔍     Enter NIC Number to Search"
									onChange={(e) =>
										setNIC(e.target.value)
									}
									className="p-2 w-80 bg-white mb-4 rounded-full text-center focus:ring-0 focus:border-none"
								/>
								<button
									type="submit"
									onClick={() => {
										Onsubmit(nic);
									}}
									className="btn btn-info mx-2 relative z-0 mb-6 text-base bg-blue-400 text-white py-2 px-5 rounded-full hover:drop-shadow-lg">
									Search
								</button>
							</div>
						</div>
						<div className="flex justify-center items-center">
							<form className="bg-white w-[80%] h-auto p-4 rounded-xl mt-5 mb-10">
								<p
									className="text-red-600 mb-10 text-sm"
									id="errorMessage"
								/>
								{testName ? (
									<div className="flex justify-center items-center">
										<div className="bg-gray-200 w-[70%] h-auto p-4 rounded-xl mt-5 mb-10 ">
										<div className="flex justify-center items-center">
												<div className="text-lg font-bold">
													First Name :{" "}
												</div>											
												<span className="text-black-800 text-lg pl-10">
													{firstName}
												</span>
											</div>
											<br></br>
											<div className="flex justify-center items-center">
												<div className="text-lg font-bold">
													Last Name :{" "}
												</div>												
												<span className="text-black-800 text-lg pl-10">
													{lastName}
												</span>
											</div>
											<br></br>
											<div className="flex justify-center items-center">
												<div className="text-lg font-bold">
													Test Name :{" "}
												</div>
												<span className="text-black-800 text-lg pl-10">
													{testName}
												</span>
											</div>
											<br></br>
											<div className="flex justify-center items-center pl-10">
												<div className="text-lg font-bold">
													Date :{" "}
												</div>
												<span className="text-black-800 text-lg pl-10">
													{date.split("T")[0]}
												</span>
											</div>
											<br></br>
											<div className="flex justify-center items-center pl-5">
												<div className="text-lg font-bold">
													Time :{" "}
												</div>
												<br></br>
												<span className="text-black-800 text-lg pl-10">
													{time}
												</span>
											</div>
											<br></br>
											
										</div>
									</div>
								) : (
									<div>
										<Notification
											notify={notify}
											setNotify={setNotify}
										/>
									</div>
								)}							

								<div class="flex items-center justify-center cols-1 mt-10 ">
									<div className="cols-1 ">
										<button
											type="submit"
											onClick={UpdateAppointment}											
											class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-lg w-full sm:w-auto px-[50px] py-2 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-0 mb-10">
											Edit Appointment Details
										</button>
									</div>
								</div>
								<div class="flex items-center justify-center cols-1 mt-2 ">
									<div className="cols-1 ">
										<button
											type="submit"
											onClick={cancelAppointment}											
											class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-lg w-full sm:w-auto px-[50px] py-2 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-0 mb-10">
											Cancel Appointment Details
										</button>
									</div>
								</div>
							</form>
						</div>
					
					</div>
				</div>
			</div>
		</>
	);
}

export default MyAppointments;
