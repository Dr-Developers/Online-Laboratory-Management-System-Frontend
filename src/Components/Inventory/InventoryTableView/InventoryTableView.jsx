/* eslint-disable no-const-assign */
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../../ConfirmDialog/index";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InventoryTableView = () => {
	const [inventory, setInventory] = useState([]);

	console.log(localStorage.getItem("authentication"));

	//fetching inventories from the database
	const getInventoryData = async (searchFilter) => {
		const inventoryFilterModel = {
			searchFilter: searchFilter,
		};
		const response = await axios.post(
			"api/inventory/filter",
			inventoryFilterModel,
			{
				headers: {
					authentication: localStorage.getItem("authentication"),
				},
			},
		);
		setInventory(response.data);
	}; //4

	useEffect(() => {
		getInventoryData(); //5
	}, []);

	//for delete
	const handleDelete = async (id, e) => {
		e.preventDefault();
		axios
			.delete(`/api/inventory/delete/${id}`, {
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

	const Navigation = useNavigate();
	const AddInventory = () => {
		Navigation("/inventory/add");
	};

	const columns = [
		{ title: "Item ID", field: "itemID" },
		{ title: "Item Name", field: "itemName" },
		{ title: "Supplier Name", field: "supplierName" },
		{ title: "Supplier Mobile", field: "supplierMobile" },
		{ title: "Quantity", field: "quantity" },
		{ title: "Purchase Date", field: "purchaseDate" },
	];

	const downLoadPdf = () => {
		const doc = new jsPDF();
		doc.text(" All Inventory Sheet", 50, 40);
		doc.autoTable({
			columns: columns.map((col) => ({
				...col,
				dataKey: col.field,
			})),
			body: inventory,
		});
		doc.save("All Inventory Sheet");
	};

	const onSearchTextChanged = (searchFilter) => {
		getInventoryData(searchFilter);
	}; //6

	const handleUpdate = async (
		id,
		e,
		itemID,
		itemName,
		supplierName,
		supplierMobile,
		unitPrice,
		quantity,
		purchaseDate,
		totalPrice,
	) => {
		Navigation(`/inventory/update/${id}`, {
			state: {
				itemID: itemID,
				itemName: itemName,
				supplierName: supplierName,
				supplierMobile: supplierMobile,
				quantity: quantity,
				purchaseDate: purchaseDate,
				unitPrice: unitPrice,
				totalPrice: totalPrice,
				// phoneNumber: phoneNumber,
				// testName: testName,
				// testData: testData,
			},
		});
	};

	return (
		<>
			<div class="overflow-x-auto">
				<div class="min-w-screen min-h-fit flex justify-center font-sans overflow-hidden mt-20">
					<div class="w-full lg:w-5/6 h-fit">
						<h1 className="text-3xl text-button-blue font-semibold mb-8">
							Inventory Details List
						</h1>
						<div class="grid md:grid-cols-2 w-[175%]">
							<input
								type="text"
								onInput={(event) =>
									onSearchTextChanged(event.target.value)
								}
								placeholder="🔍 Enter Keyword to Search"
								className="p-2 w-80 bg-white  rounded-full text-center focus:ring-0 focus:border-none"
							/>
							<button
								type="button"
								onClick={AddInventory}
								className="text-base bg-button-blue text-white py-2 px-10 rounded-full hover:drop-shadow-lg w-fit">
								+ Add Inventory
							</button>
							<button
								//className="relative z-0 mb-6 text-base bg-button-blue text-white py-2 px-5 rounded-full hover:drop-shadow-lg w-fit"
								className="relative bg-button-blue text-white py-2 px-10 rounded-full hover:drop-shadow-lg w-fit mt-5"
								onClick={() => downLoadPdf()}>
								Download Inventory List
							</button>
						</div>
						<div class="bg-white shadow-md rounded-2xl my-6">
							<table class="min-w-max w-full table-auto">
								<thead>
									<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										<th class="py-3 px-6 text-center">
											Item ID
										</th>
										<th class="py-3 px-6 text-center">
											Item Name
										</th>
										<th class="py-3 px-6 text-center">
											Supplier Name
										</th>
										<th class="py-3 px-6 text-center">
											Supplier Mobile
										</th>
										<th class="py-3 px-6 text-center">
											Quantity
										</th>
										<th class="py-3 px-6 text-center">
											Purchase Date
										</th>
										<th class="py-3 px-6 text-center">
											Actions
										</th>
									</tr>
								</thead>
								<tbody class="text-gray-600 text-sm font-light">
									{inventory.map((r) => (
										<>
											<tr class="border-b border-gray-200 hover:bg-gray-100">
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{r.itemID}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{r.itemName}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{
																r.supplierName
															}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span className="bg-green-200 text-green-600 px-3 rounded-full">
															{
																r.supplierMobile
															}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{r.quantity}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex items-center justify-center">
														<span>
															{
																r.purchaseDate.split(
																	"T",
																)[0]
															}
														</span>
													</div>
												</td>
												<td class="py-3 px-6 text-center">
													<div class="flex item-center justify-center">
														<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
															<svg
																onClick={(
																	e,
																) =>
																	handleUpdate(
																		r._id,
																		e,
																		r.itemID,
																		r.itemName,
																		r.supplierName,
																		r.supplierMobile,
																		r.unitPrice,
																		r.quantity,
																		r.purchaseDate,
																		r.totalPrice,
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
														{/* <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
															<svg
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
														</div> */}
														<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
															<svg
																//delete
																onClick={(
																	e,
																) =>
																	setConfirmDialog(
																		{
																			isOpen: true,
																			title: "Delete Inventory",
																			subTitle:
																				"Äre you sure you want to delete this inventory?",
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

export default InventoryTableView;
