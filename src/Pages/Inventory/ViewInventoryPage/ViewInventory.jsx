import React, { useState } from "react";
import ViewInventory from "../../../Components/Inventory/ViewInventory/ViewInventory";
import NavBar from "../../../Components/NavBar/navbar2";
import Footer from "../../../Components/Footer/footer";

const ViewInventoryPage = () => {
	return (
		<>
			<div className="bg-main-blue">
				<NavBar />
				<ViewInventory />
				<Footer />
			</div>
		</>
	);
};

export default ViewInventoryPage;
