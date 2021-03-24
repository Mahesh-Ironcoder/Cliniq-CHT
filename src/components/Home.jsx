import { WebCamComponent } from "./WebCamComponent";
import { AppContext } from "../App";

import SwitchCameraIcon from "@material-ui/icons/SwitchCamera";
import MenuIcon from "@material-ui/icons/Menu";

import {
	Grid,
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Button,
	Box,
	IconButton,
} from "@material-ui/core";

import React from "react";

import { useHistory } from "react-router";

const useCustomeStyles = makeStyles((theme) => ({
	gridContainer: {
		position: "relative",
	},
	canvasclass: {
		position: "absolute",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
	},
	appBar: {
		[theme.breakpoints.up("sm")]: { marginBottom: theme.spacing(3) },
	},
	startScanStyle: {
		color: "white",
		minWidth: "150px",
		maxWidth: "300px",
		width: "50%",
		[theme.breakpoints.up("sm")]: {
			width: "60%",
		},
	},
	bottomBtnGrp: {
		position: "absolute",
		left: "0",
		bottom: "0",
		width: "100%",
	},
	appbarStyles: {
		paddingRight: theme.spacing(1),
		display: "flex",
		flexDirection: "row",
	},
	appHeaderStyle: {
		flexGrow: 1,
	},
}));

const extractInitArg = (initialArg) => {
	return { ...initialArg };
};

const reducer = (state, action) => {
	switch (action.type) {
		case "flip":
			return { ...state, userMode: !state.userMode };
		case "scan":
			let tempState = state;
			for (let i = 0; i < 10; i++) {
				let tempObj = {};
				tempObj[Date.now()] = action.payload.webcamRef.current.getScreenshot();
				tempState.frames.push(tempObj);
			}
			console.log(tempState);
			return tempState;
		default:
			console.log("No action");
			return extractInitArg({ userMode: 0, frames: [] });
	}
};

//Actual functional component
export default function Home() {
	const [state, homeDispatch] = React.useReducer(
		reducer,
		{ userMode: 0, frames: [] },
		extractInitArg
	);

	const classes = useCustomeStyles();
	const webcamRef = React.useRef(null);
	const { dispatch } = React.useContext(AppContext);
	let history = useHistory();

	const handleScan = (e) => {
		e.preventDefault();
		homeDispatch({ type: "scan", payload: { webcamRef } });
	};
	const handleFlip = (e) => {
		e.preventDefault();
		console.info("flipped");
		homeDispatch({ type: "flip" });
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch({ type: "auth", payload: { isLoading: false } });
		dispatch({ type: "alert", payload: { msg: `You are logged out` } });
		history.push("/");
	};

	return (
		<Grid container direction='column' justify='flex-start' align='center'>
			<Grid item className={classes.appBar} style={{ height: "10%" }}>
				<AppBar position='static' style={{ height: "100%" }}>
					{/* <Toolbar>
						<Typography variant='h5'>Cliniq at your service</Typography>
					</Toolbar>
					<Button>Logout</Button> */}
					<Toolbar disableGutters className={classes.appbarStyles}>
						<IconButton>
							<MenuIcon />
						</IconButton>
						<Typography variant='h5' className={classes.appHeaderStyle}>
							CliniQ
						</Typography>
						<Button
							alignSelf='flex-end'
							variant='contained'
							color='secondary'
							onClick={handleLogout}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid item container style={{ height: "85%" }} zeroMinWidth>
				<Grid item sm={1} />
				<Grid
					item
					container
					justify='flex-end'
					xs={12}
					sm={10}
					className={classes.gridContainer}
				>
					<Grid item>
						<WebCamComponent ref={webcamRef} canvasRef />
					</Grid>
					<Grid item>
						<Box
							display='flex'
							flexDirection='row'
							justifyContent='center'
							alignItems='center'
							className={classes.bottomBtnGrp}
						>
							<Box flexGrow={1}>
								<Button
									color='primary'
									variant='contained'
									className={classes.startScanStyle}
									onClick={handleScan}
								>
									Start Scan
								</Button>
							</Box>
							<IconButton color='secondary' onClick={handleFlip}>
								<SwitchCameraIcon />
							</IconButton>
						</Box>
					</Grid>
				</Grid>
				<Grid item sm={1} />
			</Grid>
		</Grid>
	);
}
