import React from "react";
import InventoryTableView from "../../../Components/Inventory/InventoryTableView/InventoryTableView";
import Footer from "./../../../Components/Footer/footer";
import NavBar from "./../../../Components/NavBar/navbar2";

const InventoryTable = () => {
	return (
		<>
			<div className="bg-main-blue">
				<NavBar />
				<InventoryTableView />
				<Footer />
			</div>
		</>
	);
};

export default InventoryTable;

