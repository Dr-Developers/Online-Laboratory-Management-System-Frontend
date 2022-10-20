/* eslint-disable no-const-assign */
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../ConfirmDialog/index";
import AvatarImage from "../../Assests/Man-Avatar.jpg";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PatientTableView() {
	const [patients, setPatients] = useState([]);

	// pdf download
	const columns = [
		{ title: "First Name", field: "firstName" },
		{ title: "Last Name", field: "lastName" },
		{ title: "NIC", field: "nic" },
		{ title: "Address", field: "address" },
		{ title: "Date", field: "dateOfBirth" },
		{ title: "Telephone", field: "phoneNumber" },
	];

	const dowloadPdf = () => {
		const doc = new jsPDF();
		doc.text("Patient Details Sheet", 50, 10);
		doc.autoTable({
			columns: columns.map((col) => ({
				...col,
				dataKey: col.field,
			})),
			body: patients,
		});
		doc.save("Patient Details Sheet");
	};

	// patient search
	const getPatientData = async (searchFilter) => {
		const patientFilterModel = {
			searchFilter: searchFilter,
		};

		const response = await axios.post(
			"api/patient/filter",
			patientFilterModel,
			{
				headers: {
					authentication: localStorage.getItem("authentication"),
				},
			},
		);
		console.log(response.data);
		setPatients(response.data);
	};

	// onInput condition
	const onSearchTextChanged = (searchFilter) => {
		getPatientData(searchFilter);
	};

	//fetching patient reports from the database
	useEffect(() => {
		getPatientData();
	}, []);

	//for delete
	const handleDelete = async (id, e) => {
		e.preventDefault();
		axios
			.delete(`api/patient/delete/${id}`, {
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
	//to here

	// setting delete confirmation dialogue
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	return (
		<>
			<div class="overflow-x-auto">
				<div class="min-w-screen min-h-fit flex justify-center font-sans overflow-hidden mt-20">
					<div class="w-full lg:w-5/6 h-fit">
						<h1 className="text-3xl text-button-blue font-semibold mb-8">
							Patient Report Table
						</h1>

						<div class="grid md:grid-cols-2 w-[158%]">
							<input
								type="text"
								onInput={(event) =>
									onSearchTextChanged(event.target.value)
								} //7
								placeholder="🔍 Enter NIC to Search"
								className="p-2 w-80 bg-white rounded-full text-center focus:ring-0 focus:border-none"
							/>

							<button
								type="button"
								onClick={dowloadPdf}
								className="text-base bg-button-blue text-white py-2 px-10 ml-20 rounded-full hover:drop-shadow-lg w-fit">
								Download Patient List
							</button>
						</div>
						<div class="bg-white shadow-md rounded-2xl my-6">
							<table class="min-w-max w-full table-auto">
								<thead>
									<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										{/* <th class="py-3 px-6 text-left">
											Report No.
										</th> */}
										<th class="py-3 px-6 text-left">
											Patient Name
										</th>
										<th class="py-3 px-6 text-center">
											NIC
										</th>
										<th class="py-3 px-6 text-center">
											Address
										</th>
										<th class="py-3 px-6 text-center">
											Date of Birth
										</th>
										<th class="py-3 px-6 text-center">
											Test
										</th>
										<th class="py-3 px-6 text-center">
											Telephone
										</th>
										<th class="py-3 px-6 text-center">
											Actions
										</th>
									</tr>
								</thead>
								<tbody class="text-gray-600 text-sm font-light">
									{patients.map((r) => (
										<>
											<tr class="border-b border-gray-200 hover:bg-gray-100">
												{/* <td class="py-3 px-6 text-left whitespace-nowrap">
													<div class="flex items-center">
														<div class="mr-2"></div>
														<span class="font-medium">
															{count}
														</span>
													</div>
												</td> */}
												<td class="py-3 px-6 text-left">
													<div class="flex items-center">
														<div class="mr-2">
															<img
																class="w-6 h-6 rounded-full"
																src={
																	AvatarImage
																}
																alt="img"
															/>
														</div>
														<span className="capitalize">
															{r.firstName +
																" " +
																r.lastName}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{r.nic}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<span
														id="gender"
														class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs capitalize">
														{r.address}
													</span>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{
																r.dateOfBirth.split(
																	"T",
																)[0]
															}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															Urine Test
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{r.phoneNumber}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex item-center justify-center">
														<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
															<svg
																//delete
																onClick={(
																	e,
																) =>
																	setConfirmDialog(
																		{
																			isOpen: true,
																			title: "Delete Patinet",
																			subTitle:
																				"Äre you sure you want to delete this patient?",
																			onConfirm:
																				() => {
																					handleDelete(
																						r._id,
																						e,
																					);
																				},
																		},
																	)
																} //to here
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
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}
