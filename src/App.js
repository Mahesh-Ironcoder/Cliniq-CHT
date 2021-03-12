import "./App.css";

import React, { useState, useEffect } from "react";

import { loadTinyFaceDetectorModel } from "face-api.js";

import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import { CssBaseline } from "@material-ui/core";

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
	});

	return (
		<AppContext.Provider value={{ isLoggedIn, login, logout }}>
			<CssBaseline />
			{!isLoggedIn && <Login />}
			{isLoggedIn && <Home />}
		</AppContext.Provider>
	);
}

export default App;
