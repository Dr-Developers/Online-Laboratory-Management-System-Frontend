/* eslint-disable no-const-assign */
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../ConfirmDialog/index";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Notification from "../Notification/index";

import axios from "axios";

const AppointmentTableView = () => {
	const [appointments, setAppointments] = useState([]);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	//fetching patient appointments from the database
	useEffect(() => {
		getAppointmentData();
	}, []); 

	const getAppointmentData = async (searchFilter) => {
		const appointmentFilterModel = {
			searchFilter: searchFilter,
		};

		const response = await axios.post(
			"api/appointment/filter",
			appointmentFilterModel,
			{
				headers: {
					authentication: localStorage.getItem("authentication"),
				},
			},
		);
		console.log(response.data);
		setAppointments(response.data);
	}; 

	const handleDelete = async (id, e) => {
		e.preventDefault();
		axios
			.delete(`/api/appointment/delete/${id}`, {
				headers: {
					authentication: localStorage.getItem("authentication"),
				},
			})
			.then((res) => {
				console.log("deleted");
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	
	const columns = [
		
		{ title: "First Name", field: "firstName" },
		{ title: "Last Name", field: "lastName" },
		{ title: "NIC", field: "nic" },
		{ title: "Phone Number", field: "phoneNumber" },
		{ title: "Email", field: "email" },
		{ title: "Test Name", field: "testName" },
		{ title: "Date", field: "date" },
		{ title: "Time", field: "time" },
	];

	const downLoadPdf = () => {
		const doc = new jsPDF();
		doc.text(" All Appointment Sheet", 50, 10);
		doc.autoTable({
			columns: columns.map((col) => ({
				...col,
				dataKey: col.field,
			})),
			body: appointments,
		});
		doc.save("All Appointment Sheet");
	};

	const onSearchTextChanged = (searchFilter) => {
		getAppointmentData(searchFilter);
	}; 

	const changeStatus = async (status, id) => {
		const statusChangeModel = {
			status: status,
			id: id,
		};
		console.log(statusChangeModel);
		const response = await axios.post(
			"api/appointment/statusChange",
			statusChangeModel,
			{
				headers: {
					authentication: localStorage.getItem("authentication"),
				},
			},
		);
		if (response.data.isSuccess) {
			setNotify({
				isOpen: true,
				message: response.data.message,
				type: "success",
			});
			getAppointmentData();
		}

		getAppointmentData();
	};

	return (
		<>
			<div class="overflow-x-auto">
				<div class="min-w-screen min-h-fit flex justify-center font-sans overflow-hidden mt-20">
					<div class="w-full lg:w-5/6 h-fit">
						<>
							<form className="d-flex">
								<input
									type="text"
									placeholder="🔍         Enter Keyword to Search"
									className="p-2 w-80 bg-white mb-4 rounded-full text-center focus:ring-0 focus:border-none"
									name="searchInput"
									onInput={(event) =>
										onSearchTextChanged(
											event.target.value,
										)
									} //7
								/>
							</form>
							<div className="grid md:grid-cols-2">
								<h1 className="text-3xl text-button-blue font-semibold mb-4">
									All Appointment Details
								</h1>
								<button
									className="relative z-0 mb-6 text-base bg-button-blue text-white py-2 px-5 rounded-full hover:drop-shadow-lg w-1/2"
									onClick={() => downLoadPdf()}>
									Download Appointment List
								</button>
							</div>
							<div class="flex justify-center items-center  ">
								<div class="bg-white shadow-md rounded-2xl w-fit ">
									<table class="min-w-5/6 w-full table-auto">
										<thead>
											<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal w-full">
												<th class="py-3 px-6 text-center">
													First Name
												</th>
												<th class="py-3 px-6 text-center">
													Last Name
												</th>

												<th class="py-3 px-20 text-center">
													Phone Number
												</th>
												<th class="py-3 px-6 text-center">
													Email
												</th>
												<th class="py-3 px-6 text-center">
													Test Name
												</th>
												<th class="py-3 px-20 text-center">
													Date
												</th>
												<th class="py-3 px-6 text-center">
													Time
												</th>

												<th class="py-3 px-6 text-center">
													Status
												</th>

												<th class="py-3 px-6 text-center">
													Action
												</th>
											</tr>
										</thead>
										<tbody class="text-gray-600 text-sm font-light">
											{appointments.map((r) => (
												<>
													<tr class="border-b border-gray-200 hover:bg-gray-100">
														<td class="py-3 px-6 text-left">
															<div class="flex items-center">
																<div class="mr-2"></div>
																<span className="capitalize">
																	{
																		r.firstName
																	}
																</span>
															</div>
														</td>
														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																<span>
																	{
																		r.lastName
																	}
																</span>
															</div>
														</td>

														<td class="py-3 px-3 text-center w-fit">
															<span
																id="phoneNumber"
																class="bg-blue-200 text-green-800 py-1 px-12 rounded-full text-xs capitalize w-fit">
																{
																	r.phoneNumber
																}
															</span>
														</td>
														<td class="py-3 px-6 text-center">
															<span
																id="email"
																class="bg-pink-200 text-green-800 py-1 px-3 rounded-full text-xs">
																{r.email}
															</span>
														</td>
														{
															<td class="py-3 px-6 text-center">
																<div class="flex items-center justify-center">
																	<span>
																		{
																			r.testName
																		}
																	</span>
																</div>
															</td>
														}
														<td class="py-3 px-6 text-center">
															{
																<div class="flex items-center justify-center">
																	<span>
																		{
																			r.date
																		}
																	</span>
																</div>
															}
														</td>
														<td class="py-3 px-6 text-center">
															{
																<div class="flex items-center justify-center">
																	<span>
																		{
																			r.time
																		}
																	</span>
																</div>
															}
														</td>
														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																<div class="flex items-center justify-center cols-1">
																	<div className="cols-1 mr-4">
																		{r.status ===
																			"APPROVE" && (
																			<button
																				type="submit"
																				class="cols-1 text-white bg-green-600 focus:outline-none  rounded-full text-sm  sm:w-auto px-[15px] py-2 text-center dark:bg-green-600 mt-0">
																				Approved
																			</button>
																		)}
																	</div>
																	<div className="cols-1">
																		{r.status ===
																			"DECLINE" && (
																			<button
																				type="submit"
																				class="cols-1 text-white bg-red-600 focus:outline-none  rounded-full text-sm  sm:w-auto px-[15px] py-2 text-center dark:bg-red-600 mt-0">
																				Declined
																			</button>
																		)}
																	</div>
																	<div className="cols-1">
																		{r.status ===
																			"NEW" && (
																			<button
																				type="submit"
																				class="cols-1 text-white bg-red-600 focus:outline-none  rounded-full text-sm  sm:w-auto px-[15px] py-2 text-center dark:bg-yellow-600 mt-0">
																				NO
																			</button>
																		)}
																	</div>
																</div>
															</div>
														</td>

														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
																	<svg
																		onClick={(
																			e,
																		) =>
																			setConfirmDialog(
																				{
																					isOpen: true,
																					title: "Delete Appointment",
																					subTitle:
																						"Äre You Sure You Want TO Delete This Appointment?",
																					onConfirm:
																						() => {
																							handleDelete(
																								r._id,
																								e,
																							);
																						},
																				},
																			)
																		}
																		xmlns="http://www.w3.org/2000/svg"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke="currentColor">
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="2"
																			d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																		/>
																	</svg>
																</div>
															</div>

															<div>
																<select
																	onChange={(
																		e,
																	) => {
																		const status =
																			e
																				.target
																				.value;
																		changeStatus(
																			status,
																			r._id,
																		);
																	}}
																	required="">
																	<option value="APPROVE">
																		Change
																		Status
																	</option>
																	<option value="APPROVE">
																		Approved
																	</option>
																	<option value="DECLINE">
																		Decline
																	</option>
																	<svg
																		class="w-6 h-6"
																		aria-hidden="true"
																		fill="currentColor"
																		viewBox="0 0 20 20"
																		xmlns="http://www.w3.org/2000/svg">
																		<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
																	</svg>
																</select>
															</div>
														</td>
													</tr>
												</>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</>
					</div>
				</div>
			</div>
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<Notification notify={notify} setNotify={setNotify} />
		</>
	);
};

export default AppointmentTableView;
