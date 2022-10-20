import React from "react";
import AppointmentCancel from "../../../Components/AppointmentCancel/AppointmentCancel";
import Footer from "../../../Components/Footer/footer";
import NavBar from "../../../Components/NavBar/navbar2";

const AppointmentCancelPage = () => {
	return (
		<>
			<div className="bg-main-blue">
				<NavBar />
				<div className="flex justify-center items-center">
				<AppointmentCancel />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default AppointmentCancelPage;

