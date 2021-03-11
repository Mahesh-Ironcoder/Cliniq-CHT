import "./App.css";

import React, { useState } from "react";

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

	return (
		<AppContext.Provider value={{ isLoggedIn, login, logout }}>
			<CssBaseline />
			{!isLoggedIn && <Login />}
			{isLoggedIn && <Home />}
		</AppContext.Provider>
	);
}

export default App;
