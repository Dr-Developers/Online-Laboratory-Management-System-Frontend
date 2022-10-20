/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import axios from "axios";
import moment from "moment";
import Notification from "../../Notification";
import "antd/dist/antd.min.css";
import NavBar from "../../NavBar/navbar2";
import Footer from "../../Footer/footer";

const ViewInventory = () => {
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

	const id = localStorage.getItem("id");

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get("api/inventory/" + id);
			console.log("Profile: ", res);
			setItemID(res.data.itemID);
			setItemName(res.data.itemName);
			setSupplierName(res.data.supplierName);
			setSupplierMobile(res.data.supplierMobile);
			setUnitPrice(res.data.unitPrice);
			setQuantity(res.data.quantity);
			setTotalPrice(res.data.totalPrice);
			setPurchaseDate(res.data.purchaseDate);
			setCalculatePrice(res.data.calculatePrice);
		};
		getData();
	}, []);

	const onUpdate = async () => {
		const updateData = {
			itemID: itemID,
			itemName: itemName,
			supplierName: supplierName,
			supplierMobile: supplierMobile,
			unitPrice: unitPrice,
			quantity: quantity,
			totalPrice: calculatePrice.toString(),
			purchaseDate: purchaseDate,
		};

		try {
			await axios
				.put(
					"api/inventory/update/" + id,
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
						message: "Inventory Details Update Successfull!",
						type: "success",
					});
				})
				.catch((err) => {
					console.log(err);
					setNotify({
						isOpen: true,
						message: "Inventory Details Update Failed!",
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
					Inventory Details
				</h1>
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
								value={itemID}
								name="floating_first_name"
								id="floating_first_name"
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) => setItemID(e.target.value)}
							/>
							<label
								for="floating_first_name"
								class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								Item ID
							</label>
						</div>
						<div class="relative z-0 mb-6 w-full group">
							<input
								type="text"
								value={itemName}
								name="floating_last_name"
								id="floating_last_name"
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) =>
									setItemName(e.target.value)
								}
							/>
							<label
								for="floating_last_name"
								class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								Item Name
							</label>
						</div>
					</div>
					<div class="grid md:grid-cols-2 md:gap-6">
						<div class="relative z-0 mb-6 w-full group">
							<input
								type="email"
								name="floating_email"
								id="floating_email"
								value={supplierName}
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) =>
									setSupplierName(e.target.value)
								}
							/>
							<label
								for="floating_email"
								class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								Supplier Name
							</label>
						</div>
						<div class="relative z-0 mb-6 w-full group">
							<input
								type="text"
								name="floating_phone"
								id="floating_phone"
								value={supplierMobile}
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) =>
									setSupplierMobile(e.target.value)
								}
							/>
							<label
								for="floating_phone"
								class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								Supplier Mobile
							</label>
						</div>
					</div>
					<div class="grid md:grid-cols-2 md:gap-6">
						<div class="relative z-0 mb-6 w-full group">
							<input
								type="text"
								name="floating_NIC"
								id="floating_NIC"
								value={unitPrice}
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) =>
									setUnitPrice(e.target.value)
								}
							/>
							<label
								for="floating_NIC"
								class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								Unit Price
							</label>
						</div>
						<div class="relative z-0 mb-6 w-[100%] group">
							<input
								type="text"
								value={quantity}
								name="floating_floating_address"
								id="floating_address"
								class="block py-2.5 px-0 w-full text-sm text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
								placeholder=" "
								required=""
								disabled={true}
								onChange={(e) =>
									setQuantity(e.target.value)
								}
							/>
							<label
								for="floating_address"
								class="peer-focus:font-medium absolute text-sm text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								Quantity
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
											borderWidth: "medium",
											width: "100%",
											borderColor: "#265673",
											fontSize: "15px",
											borderRadius: "50px",
											height: "40px",
											paddingLeft: "10px",
										}}
										value={quantity}
										required=""
										onChange={(e) => {
											const selectedTest =
												e.target.value;
											setQuantity(selectedTest);
										}}>
										<option value="Select the Quantity">
											Select the Quantity{" "}
										</option>
										<option value="10">10</option>
										<option value="20">20</option>
										<option value="50">50</option>
										<option value="100">100</option>
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
									setTotalPrice(e.target.value)
								}
								disabled="true"
								required=""
								value={"Rs. " + calculatePrice + ".00"}
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
										setPurchaseDate(date);
									}}
									style={{
										background: "transparent",
										border: "none",
										borderBottom: "2px solid #265673",
										marginTop: "10px",
										width: "100%",
										color: "#265673",
									}}
								/>
							</Space>
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

export default ViewInventory;
