import "./App.css";

import Demo from "./components/Demo";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Loading from "./components/Loading";
import Register from "./components/Register.jsx";

import { theme } from "./theme";

import { CssBaseline, Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { loadTinyFaceDetectorModel, loadAgeGenderModel } from "face-api.js";

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const AppContext = React.createContext("");

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: action.payload.loading };
		case "auth":
			return { ...state, isLoggedIn: action.payload.isLoggedIn };
		case "alert":
			return { ...state, alerts: action.payload.msg };
		default:
			return { ...state };
	}
}

function App() {
	const [appState, dispatch] = React.useReducer(reducer, {
		isLoading: false,
		isLoggedIn: false,
		alerts: "",
	});

	React.useEffect(() => {
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

	if (appState.isLoading) {
		return <Loading />;
	}
	return (
		<AppContext.Provider value={{ ...appState, dispatch }}>
			<ThemeProvider theme={theme}>
				<Router>
					<CssBaseline />
					<Switch>
						<Route path='/' exact>
							<Login />
						</Route>
						<Route path='/facelogin' exact>
							<Demo />
						</Route>
						<Route path='/home' exact>
							<Home />
						</Route>
						<Route path='/fregister' exact>
							<Register />
						</Route>
					</Switch>
				</Router>
				{appState.alerts.length && (
					<Snackbar
						anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
						open={true}
						onClose={() => {
							// setAlerts("");
							dispatch({ type: "alert", payload: { msg: "" } });
						}}
						autoHideDuration={2000}
						message={appState.alerts}
					/>
				)}
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default App;
