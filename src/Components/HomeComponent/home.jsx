import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../Assests/Background.png";
import "./Home.css";

const HomeComponent = () => {
	const logged = localStorage.getItem("loggedIn");

	const navigate = useNavigate();

	const navigateLogin = () => {
		navigate("/login");
	};

	const navigateGetDateAndTime = () => {
		navigate("/patient/appointment");
	};
	return (
		<>
			<div className="w-full h-full bg-main-blue">
				<img
					src={Background}
					alt=""
					className="md:visible lg:visible sm:invisible xxs:invisible"
				/>
			</div>
			<div>
				<h6 className="absolute w-auto left-[213px] top-[220px] font-medium text-xl text-button-blue">
					Welcome to
				</h6>
				<h1 className="absolute w-auto left-[213px] top-[260px] font-medium text-7xl text-white">
					Care For You <br /> &emsp; &emsp;Laboratories
				</h1>
				<h6 className="absolute w-auto left-[280px] top-[420px] font-medium text-xl text-button-blue text-center">
					Care for You stands as the best laboratory <br />
					service in Sri Lanka. We provide world-class <br />{" "}
					facilities for give you the very best <br />
					laboratory services.
				</h6>
				{!logged ? (
					<button
						onClick={navigateLogin}
						className="bg-button-blue px-10 py-3 absolute w-auto left-[350px] top-[560px] font-medium text-white rounded-full text-xl">
						Make an Appointment
					</button>
				) : (
					<button
						onClick={navigateGetDateAndTime}
						className="bg-button-blue px-10 py-3 absolute w-auto left-[350px] top-[560px] font-medium text-white rounded-full text-xl">
						Make an Appointment
					</button>
				)}
			</div>
		</>
	);
};

export default HomeComponent;
