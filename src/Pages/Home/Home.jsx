import React from "react";
import HomeComponent from "../../Components/HomeComponent/home";
import NavBar from "../../Components/NavBar/navbar2";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Footer from "./../../Components/Footer/footer";

const Home = () => {
	const activePage = window.location.pathname.toString();
	console.log(activePage);

	return (
		<>
			<NavBar />
			{activePage === "/" ? <HomeComponent /> : <></>}
			{activePage === "/about" ? <AboutUs /> : <></>}
			<Footer />
		</>
	);
};

export default Home;