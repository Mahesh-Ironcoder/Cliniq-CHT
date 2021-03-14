import "./App.css";

import React, { useState, useEffect } from "react";

import { loadTinyFaceDetectorModel, loadAgeGenderModel } from "face-api.js";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import { theme } from "./theme";

export const AppContext = React.createContext("");

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};

	useEffect(() => {
		loadTinyFaceDetectorModel("/models")
			.then((done) => {
				console.log("Model loaded: ", done);
			})
			.catch((e) => {
				console.log("Error in loading model: ", e);
			});
		loadAgeGenderModel("/models")
			.then((done) => {
				console.log("Face landmark - Model loaded: ", done);
			})
			.catch((e) => {
				console.log("Face landmark - Error in loading model: ", e);
			});
	});

	return (
		<AppContext.Provider value={{ isLoggedIn, login, logout }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{!isLoggedIn && <Login />}
				{isLoggedIn && <Home />}
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default App;
