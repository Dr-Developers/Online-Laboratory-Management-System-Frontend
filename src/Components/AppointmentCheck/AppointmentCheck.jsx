import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification/index";
import "antd/dist/antd.min.css";
import { DatePicker, Space } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { TimePicker } from "antd";

function GetDateAndTime() {
	const [date, setDate] = useState(new Date("2000/01/01"));
	const [time, setTime] = useState("");
	const [open, setOpen] = useState(false);
	const [enableAppointment, setEnableAppointment] =
		React.useState(false);

	console.log("time", time);
	localStorage.setItem("date", date);
	localStorage.setItem("time", time);

	const handletime = (newTime) => {
		setTime(newTime);
	};

	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const Navigation = useNavigate();
	const makeAppointment = (dat, tim) => {
		Navigation("/appointment/add", {
			state: { date: dat, time: tim },
		});
	};

	const error = document.getElementById("errorMessage");

	// error handling
	const errorhandling = () => {
		if (date === "" || time === "") {
			error.innerHTML =
				"* Fill out all the fields. (All the fields are required)";
		} else {
			error.innerHTML = "";
		}
	};

	// on submit function
	const submit = async (e) => {
		e.preventDefault();
		errorhandling();

		const data = {
			date: date,
			time: time,
		};

		console.log("data", data);

		try {
			await axios
				.post("/api/appointment/check", {
					headers: {
						authentication:
							localStorage.getItem("authentication"),
					},
					data,
				})
				.then((response) => {
					console.log("response", response);
					if (!response.data.isExsists) {
						setNotify({
							isOpen: true,
							message: response.data.message,
							type: "success",
						});
						setEnableAppointment(true);
					} else {
						setNotify({
							isOpen: true,
							message: response.data.message,
							type: "error",
						});
						setEnableAppointment(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="bg-main-blue w-[100%] h-full">
				<div className="flex justify-center items-center">
					<div className="ml-20 w-full">
						<div className="w-[100%] mb-10 mt-10">
							<h1 className="text-button-blue font-semibold text-3xl text-center">
								Make Your Appointment
							</h1>
						</div>
						<div className="flex justify-center items-center">
							<form
								onSubmit={submit}
								className="bg-white w-[55%] h-auto p-14 rounded-xl mt-5 mb-10">
								<p
									className="text-red-600 mb-6 text-sm"
									id="errorMessage"
								/>
								<div className="flex justify-center items-center mt-8">
									<div className="p-0 md:gap-24">
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-0 w-full group">
												<label
													for="floating_date"
													class="peer-focus:font-medium absolute text-2xl text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													<strong>
														Select Date{" "}
													</strong>
												</label>
											</div>
											<div class="relative z-0 mb-6 w-full group">
												<Space
													direction="vertical"
													style={{
														width: "100%",
													}}>
													<DatePicker
														placeholder="Select the date"
														required=""
														onChange={(date) =>
															setDate(date)
														}
														style={{
															background:
																"transparent",
															border: "none",
															borderBottom:
																"2px solid #265673",
															marginTop:
																"10px",
															width: "100%",
															color: "#265673",
														}}
													/>
												</Space>
											</div>
											<div class="relative z-0 mb-0 w-full group">
												<label
													for="floating_phone"
													class="peer-focus:font-medium absolute text-2xl text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													<strong>Time</strong>
												</label>
											</div>
											<div class="relative z-0 mb-6 w-full group">
												<TimePicker
													use12Hours
													open={open}
													onOpenChange={setOpen}
													getTi
													value={time}
													onChange={handletime}
													className="w-full"
												/>
											</div>

											<div class="grid md:grid-cols-1 md:gap-6">
												<div class="relative z-0 mb-2 w-full group flex justify-center items-center">
													<button
														type="submit"
														class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-sm w-full sm:w-auto px-[234px] py-2.5 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-5">
														Check Availability
													</button>
												</div>
											</div>

											<div class="grid md:grid-cols-1 md:gap-2">
												<div class="relative z-0 mb-6 w-full group flex justify-center items-center">
													{enableAppointment && (
														<button
															type="button"
															onClick={
																makeAppointment
															}
															class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-sm w-full sm:w-auto px-[234px] py-2.5 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-5">
															Make Your
															Appointment
														</button>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</>
	);
}

export default GetDateAndTime;
