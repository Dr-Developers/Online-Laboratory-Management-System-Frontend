/* eslint-disable no-const-assign */
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../ConfirmDialog/index";
import AvatarImage from "../../Assests/Man-Avatar.jpg";
import axios from "axios";
//import { Navigate, useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const ReportTableView = () => {
	const [reports, setReports] = useState([]);

	//fetching patient reports from the database
	useEffect(() => {
		getReportData(); //5
		// const fetchReports = async () => {
		// 	const res = await axios.get("api/report/", {
		// 		headers: {
		// 			authentication: localStorage.getItem("authentication"),
		// 		},
		// 	});
		// 	setReports(res.data);
		// 	console.log(res.data);
		// };
		// fetchReports();
	}, []);

	const getReportData = async (searchFilter) => {
        const reportFilterModel = {
            searchFilter: searchFilter,
        };
        const response = await axios.post(
            "api/report/filter",
            reportFilterModel,
            {
                headers: {
                    authentication: localStorage.getItem("authentication"),
                },
            },
        );
		const tests = response.data.map(record => {
			const obj0 = record.testData?.[0]?.[0];
			const obj1 = record.testData?.[1]?.[0];
			if (obj1 && obj0){
				const dd =[ {
					result: obj1.result,
					test: obj1.test,
					normalValues: obj1.normalValues,
					
				},{result1: obj0.result,
					test1: obj0.test,
					normalValues1: obj0.normalValues,}
				]
				return dd
			}
			else{
				return {
					result: obj0.result,
					test: obj0.test,
					normalValues: obj0.normalValues,
				}}
		})
        console.log(tests);
        setReports(response.data);
    };//4

	//for delete
	const handleDelete = async (id, e) => {
		e.preventDefault();
		axios
			.delete(`/api/report/delete/${id}`, {
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

	const Navigate = useNavigate();
	const ViewReport = () => {
		Navigate("/patientReport/view/:id", {
		});
	};

	const Navigation = useNavigate();
	const addReport = () => {
		Navigation("/patientreport/add");
	};

	const handleView = async (id,
        e,
        firstName,
        lastName,
        Gender,
        date,
        age,
		nic,
		phoneNumber,
		testName,
		testData,)=>{
			Navigation(`/patientReport/view/${id}`, {
				state: {
					firstName: firstName,
					lastName: lastName,
					Gender: Gender,
					testDate: date,
					age: age,
					nic: nic,
					phoneNumber: phoneNumber,
					testName: testName,
					testData: testData,
				},
			});
	}

	const handleUpdate = async (
        id,
        e,
        firstName,
        lastName,
        Gender,
        date,
        age,
		nic,
		phoneNumber,
		testName,
		testData,

    ) => {
		console.log(testData)
        Navigation(`/patientReport/update/${id}`, {
            state: {
				firstName: firstName,
				lastName: lastName,
				Gender: Gender,
				testDate: date,
				age: age,
				nic: nic,
				phoneNumber: phoneNumber,
				testName: testName,
                testData: testData,
            },
        });
    };

	const rep = reports[0];
	console.log(rep)

	const columns = [
		{ title: "First Name", field: "firstName" },
		{ title: "Last Name", field: "lastName" },
		{ title: "Gender", field: "Gender" },
		{ title: "Date", field: "date" },
		{ title: "NIC", field: "nic" },
		{ title: "Phone Number", field: "phoneNumber" },
		{ title: "Test Name", field: "testName" },
		
	];

	const downLoadPdf = () => {
		const doc = new jsPDF();
		doc.text(" Lab test done patients", 50, 10);
		doc.autoTable({
			columns: columns.map((col) => ({
				...col,
				dataKey: col.field,
			})),
			body: reports,
		});
		doc.save("All Lab Test Done Patients Sheet");
	};

	const onSearchTextChanged = (searchFilter) => {
        getReportData(searchFilter);
    }; //6

	return (
		<>
			<div class="overflow-x-auto">
				<div class="min-w-screen min-h-fit flex justify-center font-sans overflow-hidden mt-20">
					<div class="w-full lg:w-5/6 h-fit">
						<h1 className="text-3xl text-button-blue font-semibold mb-8">
							Patient Report Table
						</h1>

						<div class="grid md:grid-cols-3">
							<input
								type="text"
								placeholder="🔍 Enter Keyword to Search"
								className="p-2 w-80 bg-white mb-12 rounded-full text-center focus:ring-0 focus:border-none"
								onInput={(event) =>

									onSearchTextChanged(

										event.target.value,

									)

								} //7
							/>
                            
							<button
								type="button"
								onClick={addReport}
								className="text-base bg-button-blue text-white py-2 mb-12 px-5 rounded-full hover:drop-shadow-lg w-1/2">
								Add Reports
								
							</button>
							<button
								type="button"
								
								className="text-base bg-button-blue text-white py-2 mb-12 px-5 rounded-full hover:drop-shadow-lg w-80" onClick={() => downLoadPdf()}>
								Download Tested Patients List
								
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
											Gender
										</th>
										<th class="py-3 px-6 text-center">
											Date
										</th>
										<th class="py-3 px-6 text-center">
											Age
										</th>
										<th class="py-3 px-6 text-center">
											Test Name
										</th>
										<th class="py-3 px-6 text-center">
											Actions
										</th>
									</tr>
								</thead>
								<tbody class="text-gray-600 text-sm font-light">
									{reports.map((r) => (
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
														{r.Gender}
													</span>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{
																r.date.split(
																	"T",
																)[0]
															}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{r.age}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<span
														id="gender"
														class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs capitalize">
														{r.testName}
													</span>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex item-center justify-center">
														<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
															<svg
															// onClick={ViewReport}
															onClick={(e) =>
                                                                handleView(
                                                                    r._id,
                                                                    e,
                                                                    r.firstName,
                                                                    r.lastName,
                                                                    r.Gender,
                                                                    r.date,
                                                                    r.age,
		                                                            r.nic,
		                                                            r.phoneNumber,
		                                                            r.testName,
		                                                            r.testData,
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
																	d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																/>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="2"
																	d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
																/>
															</svg>
														</div>
														<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
															<svg
															 onClick={(e) =>
                                                                handleUpdate(
                                                                    r._id,
                                                                    e,
                                                                    r.firstName,
                                                                    r.lastName,
                                                                    r.Gender,
                                                                    r.date,
                                                                    r.age,
		                                                            r.nic,
		                                                            r.phoneNumber,
		                                                            r.testName,
		                                                            r.testData,
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
																	d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
																/>
															</svg>
														</div>
														<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
															<svg
																//delete
																onClick={(
																	e,
																) =>
																	setConfirmDialog(
																		{
																			isOpen: true,
																			title: "Delete Report",
																			subTitle:
																				"Äre you sure you want to delete this report?",
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
};

export default ReportTableView;