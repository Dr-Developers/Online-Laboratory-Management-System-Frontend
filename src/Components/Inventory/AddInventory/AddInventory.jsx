import React, { useState } from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import Notification from "../../Notification/index";
import { DatePicker, Space } from "antd";
// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";

function AddInventory() {
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const [itemID, setItemID] = useState("");
	const [itemName, setItemName] = useState("");
	const [supplierName, setSupplierName] = useState("");
	const [supplierMobile, setSupplierMobile] = useState("");
	const [unitPrice, setUnitPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [totalPrice, setTotalPrice] = useState("");
	const [purchaseDate, setPurchaseDate] = useState("");
	const [calculatePrice, setCalculatePrice] = useState(0);

	// console.log(email);

	const error = document.getElementById("errorMessage");

	// error handling
	const errorhandling = () => {
		if (
			itemID === "" ||
			itemName === "" ||
			supplierName === "" ||
			supplierMobile === "" ||
			unitPrice === "" ||
			quantity === "" ||
			totalPrice === "" ||
			purchaseDate === ""
		) {
			error.innerHTML =
				"* Fill out all the fields. (All the fields are required)";
		} else {
			error.innerHTML = "";
		}
	};

	const calPrice = () => {
		const calPrice = setCalculatePrice(quantity * unitPrice);
		setTotalPrice(calPrice);
	};

	useEffect(() => {
		calPrice();
	});

	const submit = async (e) => {
		e.preventDefault();
		errorhandling();

		const data = {
			itemID: itemID,
			itemName: itemName,
			supplierName: supplierName,
			supplierMobile: supplierMobile,
			unitPrice: unitPrice,
			quantity: quantity,
			totalPrice: calculatePrice.toString(),
			purchaseDate: purchaseDate,
		};

		console.log(data);

		try {
			await axios
				.post("/api/inventory/add", data)

				.then((res) => {
					console.log("add inventory res", res);
					window.location.href = "/inventory/all";
					setNotify({
						isOpen: true,
						message: "Inventory Added Successfull!",
						type: "success",
					});
				})
				.catch((err) => {
					console.log(err);
					window.location.href = "/inventory/all";
					setNotify({
						isOpen: true,
						message: "Inventory Adding failed!",
						type: "error",
					});
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
						<div className="w-[100%] mb-10 mt-12">
							<h1 className="text-button-blue font-semibold text-4xl text-center">
								Add Inventory Details
							</h1>
						</div>
						<div className="flex justify-center items-center">
							<form
								onSubmit={submit}
								className="bg-white w-[40%] h-auto px-14 py-10 rounded-xl mt-5 mb-14 ">
								<p
									className="text-red-600 mb-0 mt-4 text-sm"
									id="errorMessage"
								/>
								<div className="flex justify-center items-center mt-8">
									<div className="p-0 md:gap-24">
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-1 w-full group mt-8">
												<input
													type="text"
													name="floating_first_name"
													id="floating_first_name"
													class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
													placeholder=" "
													required=""
													onChange={(e) =>
														setItemID(
															e.target.value,
														)
													}
												/>
												<label
													for="floating_first_name"
													class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													Item ID
												</label>
											</div>
											<div class="relative z-0 mb-1 w-full group">
												<input
													type="text"
													name="floating_last_name"
													id="floating_last_name"
													class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
													placeholder=" "
													required=""
													onChange={(e) =>
														setItemName(
															e.target.value,
														)
													}
												/>
												<label
													for="floating_last_name"
													class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													Item Name
												</label>
											</div>
											<div class="relative z-0 mb-6 w-full group">
												<input
													type="text"
													name="floating_last_name"
													id="floating_last_name"
													class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
													placeholder=" "
													required=""
													onChange={(e) =>
														setSupplierName(
															e.target.value,
														)
													}
												/>
												<label
													for="floating_last_name"
													class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													Supplier Name
												</label>
											</div>
										</div>
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-8 w-full group">
												<input
													type="text"
													name="floating_phone"
													id="floating_phone"
													class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
													placeholder=" "
													pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
													title="Enter phone number in this format ex: 011-255-7988"
													required=""
													onChange={(e) =>
														setSupplierMobile(
															e.target.value,
														)
													}
												/>
												<label
													for="floating_phone"
													class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													Supplier Mobile
												</label>
											</div>
										</div>
										<div class="relative z-0 mb-6 w-full group">
											<input
												type="text"
												name="floating_last_name"
												id="floating_last_name"
												class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
												placeholder=" "
												required=""
												onChange={(e) =>
													setUnitPrice(
														e.target.value,
													)
												}
											/>
											<label
												for="floating_last_name"
												class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
												Unit Price
											</label>
										</div>
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-2 w-full group">
												<h3 class="mb-2 font-regular text-lg text-button-blue">
													Quantity
												</h3>
												<div className="container mb-4 text-align: center w-full text-lg">
													<select
														className="border-1 custom-select"
														style={{
															borderWidth:
																"medium",
															width: "100%",
															borderColor:
																"#265673",
															fontSize:
																"15px",
															borderRadius:
																"50px",
															height: "40px",
															paddingLeft:
																"10px",
														}}
														value={quantity}
														required=""
														onChange={(e) => {
															const selectedTest =
																e.target
																	.value;
															setQuantity(
																selectedTest,
															);
														}}>
														<option value="Select the Quantity">
															Select the
															Quantity{" "}
														</option>
														<option value="10">
															10
														</option>
														<option value="20">
															20
														</option>
														<option value="50">
															50
														</option>
														<option value="100">
															100
														</option>
													</select>
												</div>
											</div>
										</div>
										<div class="relative z-0 mb-6 w-full group">
											<input
												type="text"
												name="floating_last_name"
												id="floating_last_name"
												class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
												placeholder=" "
												onChange={(e) =>
													setTotalPrice(
														e.target.value,
													)
												}
												disabled="true"
												required=""
												value={
													"Rs. " +
													calculatePrice +
													".00"
												}
											/>
											<label
												for="floating_last_name"
												class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
												Total Price
											</label>
										</div>
										<div class="relative z-0 mb-8 w-full group mt-8">
											<div class="relative z-0 mb-6 w-full group mt-8">
												<label
													for="floating_username"
													class="peer-focus:font-medium absolute text-2xl text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													Purchase Date
												</label>
											</div>
											<Space
												direction="vertical"
												style={{ width: "100%" }}>
												<DatePicker
													placeholder="Select Purchase Date"
													onChange={(date) => {
														setPurchaseDate(
															date,
														);
													}}
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
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-6 w-full group flex justify-center items-center">
												<button
													type="submit"
													class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-lg w-full sm:w-auto px-[234px] py-2.5 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-5">
													Add Item
												</button>
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

export default AddInventory;
