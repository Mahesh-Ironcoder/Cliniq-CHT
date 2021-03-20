import "./App.css";

import React, { useState, useEffect } from "react";

// import { loadTinyFaceDetectorModel, loadAgeGenderModel } from "face-api.js";

import { CssBaseline, Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

// import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import { theme } from "./theme";
import Demo from "./components/Demo";
import Loading from "./components/Loading";

export const AppContext = React.createContext("");

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState("");
	const login = (isverified) => {
		setSnackbarMsg("Logged in ".concat(isverified ? "successfully" : "Failed"));
		setIsLoggedIn(isverified);
	};

	useEffect(() => {}, [snackbarMsg]);

	const logout = () => {
		setIsLoggedIn(false);
	};

	// useEffect(() => {
	// 	loadTinyFaceDetectorModel("/models")
	// 		.then((done) => {
	// 			console.log("Model loaded: ", done);
	// 		})
	// 		.catch((e) => {
	// 			console.log("Error in loading model: ", e);
	// 		});
	// 	loadAgeGenderModel("/models")
	// 		.then((done) => {
	// 			console.log("Face landmark - Model loaded: ", done);
	// 		})
	// 		.catch((e) => {
	// 			console.log("Face landmark - Error in loading model: ", e);
	// 		});
	// });

	if (isLoading) {
		return <Loading />;
	}
	return (
		<AppContext.Provider value={{ isLoggedIn, login, logout, setIsLoading }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					autoHideDuration={2000}
					open={Boolean(snackbarMsg)}
					onClose={(e) => {
						setSnackbarMsg("");
					}}
					message={snackbarMsg}
				/>
				<Register />
				{/* {!isLoggedIn && <Demo />}
				{isLoggedIn && <Home />} */}
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default App;
