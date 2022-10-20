import React from "react";
import AppointmentCheck from "../../../Components/AppointmentCheck/AppointmentCheck";
import Footer from "../../../Components/Footer/footer";
import NavBar from "../../../Components/NavBar/navbar2";

const AppointmentCheckPage = () => {
	return (
		<>
			<div className="bg-main-blue">
				<NavBar />
				<div className="flex justify-center items-center">
				<AppointmentCheck />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default AppointmentCheckPage;