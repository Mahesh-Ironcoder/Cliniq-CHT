import "./App.css";

import React, { useState } from "react";

import Login from "./components/Login";
import Home from "./components/Home";

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
			{!isLoggedIn && <Login />}
			{isLoggedIn && <Home />}
		</AppContext.Provider>
	);
}

export default App;
