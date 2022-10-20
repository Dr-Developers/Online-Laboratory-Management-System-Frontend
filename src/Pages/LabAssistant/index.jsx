import React, { useState } from "react";
import Footer from "../../Components/Footer/footer";
import NavBar from "../../Components/NavBar/navbar2";
import Dashboard from "../../Components/LabAssDashboard/dashboard";

const LabAssistantDashboard = () => {

    return (
		<>
			<div className="bg-main-blue">
            <NavBar />
				<div className="flex justify-center items-center">
				<Dashboard />
				</div>
				<Footer />
                </div>
		</>
	);
};

export default LabAssistantDashboard;
