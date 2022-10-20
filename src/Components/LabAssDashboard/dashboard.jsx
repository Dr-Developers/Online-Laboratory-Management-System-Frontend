import React from "react";
import PatientImg from "../../Assests/Patient.png";
import InventoryImg from "../../Assests/Inventory.png";
import AppointmentImg from "../../Assests/Appointment.png";
import MedicalReportImg from "../../Assests/MedicalReport.png";
import LabAssistantDashboardImg from "../../Assests/LabAssistantDashboard.png";

import { useNavigate } from "react-router-dom";

const LabAssistantDashboard = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let navigate = useNavigate();

	const id = localStorage.getItem("id");
	console.log("RoleID: " + id);

	const AppointmentNav = () => {
		navigate("/patient/appointment/all/");
	};

	const ReportNav = () => {
		navigate("/patientReport/all/");
	};

	const InventoryNav = () => {
		navigate("/inventory/all/");
	};

	const PatientNav = () => {
		navigate("/patient/details/");
	};

	return (
		<>
			<table>
				<tr>
					<td className="w-fit">
						<div className="bg-main-blue w-[100%] h-full">
							<div className="flex justify-center items-center">
								<div className="ml-20 w-full">
									<div className="w-[75%] mb-10 mt-12">
										<h1 className="text-button-blue font-semibold text-4xl text-center">
											Lab Scientist Dashboard
										</h1>
									</div>

									<div className="bg-white w-[65%] h-auto p-14 rounded-xl mt-10 mb-10 mr-10 ml-10">
										<div className="flex-row">
											<div className="mr-80">
												<div className="my-10 flex flex-row">
													<div className="flex flex-row bg-gray-300 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																PatientNav
															}
															class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg  px-[11.75rem] rounded">
															Patient Details
														</button>
														<img
															src={
																PatientImg
															}
															className="mt-1 h-20 w-35"
															alt="exams"
														/>
													</div>
												</div>
												<div className="my-10 flex flex-row">
													<div className="flex flex-row h-20 bg-gray-300 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																InventoryNav
															}
															class="bg-button-blue hover:bg-button-hover-blue text-white font-bold text-lg px-44 rounded">
															Inventory
															Details
														</button>
														<img
															src={
																InventoryImg
															}
															className="mt-1 h-20 w-35"
															alt="timetable"
														/>
													</div>
												</div>
												<div className="my-10 flex flex-row">
													<div className="flex flex-row h-20 bg-gray-300 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																AppointmentNav
															}
															class="bg-button-blue hover:bg-button-hover-blue text-white font-bold text-lg px-40 rounded">
															Appointment
															Details
														</button>
														<img
															src={
																AppointmentImg
															}
															className="mt-1 h-20 w-35"
															alt="tute"
														/>
													</div>
												</div>
												<div className="my-10 flex flex-row">
													<div className="flex flex-row h-20 bg-gray-300 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																ReportNav
															}
															class="bg-button-blue hover:bg-button-hover-blue text-white font-bold text-lg px-[11.5rem] rounded">
															Medical Report
															Details
														</button>
														<img
															src={
																MedicalReportImg
															}
															className="mt-4=1 h-20 w-35"
															alt="eevnts"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</td>
					<td className="bg-main-blue w-fit">
						<div class="lg:w-[80%] flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
							<div class="text-white">
								<img
									src={LabAssistantDashboardImg}
									alt="labAssistantDashboardImg"
								/>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</>
	);
};

export default LabAssistantDashboard;
