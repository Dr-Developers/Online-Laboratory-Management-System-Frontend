import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	Home,
	Register,
	PatientUpdate,
	LoginPage,
	PatientTableList,
	AddAppointmentPage,
	AboutUsPage,
	ReportTablePage,
	AddReportPage,
	AppointmentTable,
	AppointmentCheckPage,
	AppointmentCancel,
	UserProfilePage,
	UpdateReport,
	AddInventory,
	InventoryTable,
	MyAppointments,
	LabAssistantDashboard,
	UpdateAppointment,
	UpdateInventory,
	ViewReport,
	ViewInventory,
} from "../Pages";
import ViewInventoryPage from "../Pages/Inventory/ViewInventoryPage/ViewInventory";

const PageRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/patient/register"
							element={<Register />}
						/>
						<Route
							path="/patient/update/:id"
							element={<PatientUpdate />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/patient/details"
							element={<PatientTableList />}
						/>
						<Route
							path="/appointment/add"
							element={<AddAppointmentPage />}
						/>
						<Route path="/about" element={<AboutUsPage />} />
						<Route
							path="/patientReport/add"
							element={<AddReportPage />}
						/>
						<Route
							path="/inventory/add"
							element={<AddInventory />}
						/>
						<Route
							path="/inventory/all"
							element={<InventoryTable />}
						/>
						<Route
							path="/patientReport/all"
							element={<ReportTablePage />}
						/>
						<Route
							path="/patientReport/update/:id"
							element={<UpdateReport />}
						/>
						<Route
							path="/patientReport/view/:id"
							element={<ViewReport />}
						/>

						<Route
							path="/patient/appointment/all"
							element={<AppointmentTable />}
						/>
						<Route
							path="/patient/appointment"
							element={<AppointmentCheckPage />}
						/>
						<Route
							path="/patient/appointment/cancel"
							element={<AppointmentCancel />}
						/>
						<Route
							path="/profile"
							element={<UserProfilePage />}
						/>
						<Route
							path="/patient/appointment/my"
							element={<MyAppointments />}
						/>
						<Route
							path="/labassistant/dashboard"
							element={<LabAssistantDashboard />}
						/>
						<Route
							path="/patient/appointment/update/:id"
							element={<UpdateAppointment />}
						/>
						<Route
							path="/inventory/update/:id"
							element={<UpdateInventory />}
						/>
						<Route
							path="/patient/appointment/update/:id"
							element={<UpdateAppointment />}
						/>
						<Route
							path="/inventory"
							element={<ViewInventory />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default PageRoutes;
