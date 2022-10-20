import React from "react";
import ReportTableView from "../../Components/ReportTableView/ReportTableView";
import Footer from "./../../Components/Footer/footer";
import NavBar from "./../../Components/NavBar/navbar2";

const ReportTable = () => {
	return (
		<>
			<div className="bg-main-blue">
				<NavBar />
				<ReportTableView />
				<Footer />
			</div>
		</>
	);
};

export default ReportTable;
