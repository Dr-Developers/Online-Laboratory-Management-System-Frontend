import React, { useState } from "react";
import NavBar from "../../Components/NavBar/navbar2";
import UserProfile from "../../Components/UserProfile/UserProfile";
import Footer from "./../../Components/Footer/footer";

const UserProfilePage = () => {
	return (
		<>
			<div className="bg-main-blue">
				<NavBar />
				<UserProfile />
				<Footer />
			</div>
		</>
	);
};

export default UserProfilePage;
