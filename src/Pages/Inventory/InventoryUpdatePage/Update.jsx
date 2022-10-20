import { useEffect, useState } from "react";
import axios from "axios";
import Notification from "../../../Components/Notification/index";
import Footer from "../../../Components/Footer/footer";
import NavBar from "../../../Components/NavBar/navbar2";
import { DatePicker, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateInventory() {
	const [isOpen, setIsOpen] = useState(false);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const [open, setOpen] = useState(false);

	// const handletime = (newTime) => {
	// 	setTime(newTime);
	// };

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const id = window.location.pathname.split("/")[4];
	let navigate = useNavigate();
	const location = useLocation();

	const [itemID, setItemID] = useState("");
	const [itemName, setItemName] = useState("");
	const [supplierName, setSupplierName] = useState("");
	const [supplierMobile, setSupplierMobile] = useState("");
	const [unitPrice, setUnitPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [totalPrice, setTotalPrice] = useState("");
	const [purchaseDate, setPurchaseDate] = useState("");
	const [calculatePrice, setCalculatePrice] = useState(0);

	const calPrice = () => {
		const calPrice = setCalculatePrice(quantity * unitPrice);
		setTotalPrice(calPrice);
	};

	useEffect(() => {
		calPrice();
	});

	useEffect(() => {
		const getData = async () => {
			setItemID(location.state.itemID);
			setItemName(location.state.itemName);
			setSupplierName(location.state.supplierName);
			setSupplierMobile(location.state.supplierMobile);
			setUnitPrice(location.state.unitPrice);
			setQuantity(location.state.quantity);
			setTotalPrice(location.state.totalPrice);
			setPurchaseDate(location.state.purchaseDate);
			// setCalculatePrice(location.state.calculatePrice);
			console.log("Calculate: ", location.state.calculatePrice);
		};
		getData();
	}, [location]);

	console.log(itemID);
	console.log(
		itemName,
		supplierName,
		supplierMobile,
		unitPrice,
		quantity,
		totalPrice,
		purchaseDate,
	);

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = {
			itemID: itemID,
			itemName: itemName,
			supplierName: supplierName,
			supplierMobile: supplierMobile,
			unitPrice: unitPrice,
			quantity: quantity,
			totalPrice: totalPrice,
			purchaseDate: purchaseDate,
		};

		try {
			await axios
				.put(`api/inventory/update/${id}`, {
					headers: {
						authToken: localStorage.getItem("authToken"),
					},
					data,
				})
				.then((res) => {
					console.log(res);
					setNotify({
						isOpen: true,
						message: "Inventory Details Updated Successfully",
						type: "success",
					});

					setItemID("");
					setItemName("");
					setSupplierName("");
					setSupplierMobile("");
					setUnitPrice("");
					setQuantity(null);
					setTotalPrice("");
					setPurchaseDate("");

					setInterval(() => {
						navigate(`/inventory/all`);
					}, 2500);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const NavigateTable = () => {
		navigate("/inventory/all");
	};

	return (
		<>
			<NavBar />

			<div className="bg-main-blue w-[100%] h-full">
				<div className="flex justify-center items-center">
					<div className="ml-20 w-full">
						<div className="w-[100%] mb-10 mt-12">
							<h1 className="text-button-blue font-semibold text-4xl text-center">
								Inventory details View
							</h1>
						</div>
						<div className="flex justify-center items-center">
							<form
								onSubmit={onSubmit}
								className="bg-white w-[55%] h-auto p-14 rounded-xl mt-5 mb-10">
								<p
									className="text-red-600 mb-10 text-sm"
									id="errorMessage"
								/>
								<div className="flex justify-center items-center mt-8">
									<div className="p-0 md:gap-24">
										<h2 className="text-button-blue font-semibold text-4xl text-center">
											Inventory Details
										</h2>
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-4 w-full group mt-10">
												<input
													type="text"
													name="floating_first_name"
													id="floating_first_name"
													value={itemID}
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
											<div class="relative z-0 mb-8 w-full group">
												<input
													type="text"
													name="floating_last_name"
													id="floating_last_name"
													value={itemName}
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
										</div>
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-2 w-full group">
												<input
													type="text"
													name="floating_NIC"
													id="floating_NIC"
													value={supplierName}
													disabled
													class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
													placeholder=" "
													pattern="^([0-9]{9}[x|X|v|V]|[0-9]{12})$"
													title="Please enter valid NIC Number ex: xxxxxxxxV / xxxxxxxxxv / xxxxxxxxxxxx"
													required=""
													onChange={(e) =>
														setSupplierName(
															e.target.value,
														)
													}
												/>
												<label
													for="floating_NIC"
													class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													Supplier Name
												</label>
											</div>
											<div class="relative z-0 mb-8 w-full group">
												<input
													type="text"
													name="floating_phone"
													id="floating_phone"
													value={supplierMobile}
													class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
													placeholder=" "
													pattern="[0-9]{3}-[0-9]{3}[0-9]{4}"
													title="Enter phone number in this format ex: 077-4567890"
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
											<p id="pnum"></p>
										</div>
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-8 w-full group">
												<input
													type="email"
													name="floating_email"
													id="floating_email"
													value={unitPrice}
													class="block py-2.5 px-0 w-full text-lg text-button-blue bg-transparent border-0 border-b-2 border-button-blue appearance-none dark:text-button-blue dark:border-button-blue dark:focus:border-button-blue focus:outline-none focus:ring-0 focus:border-button-blue peer"
													placeholder=" "
													pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
													title="Please Enter valid email address ex: abc@gmail.com"
													required=""
													onChange={(e) =>
														setUnitPrice(
															e.target.value,
														)
													}
												/>
												<label
													for="floating_email"
													class="peer-focus:font-medium absolute text-lg text-button-blue dark:text-button-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-button-blue peer-focus:dark:text-button-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
													Unit Price
												</label>
											</div>
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
										<div class="grid md:grid-cols-1 md:gap-6">
											<div class="relative z-0 mb-6 w-full group flex justify-center items-center">
												<button
													onClick={NavigateTable}
													type="submit"
													class="text-white bg-button-blue hover:bg-button-hover-blue focus:outline-none font-medium rounded-full text-lg w-full sm:w-auto px-[234px] py-2.5 text-center dark:bg-button-blue dark:hover:bg-button-hover-blue mt-5">
													See More
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
			<Footer />
		</>
	);
}

export default UpdateInventory;
