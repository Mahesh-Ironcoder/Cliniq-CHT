import React from "react";

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

import SwitchCameraIcon from "@material-ui/icons/SwitchCamera";

import { WebCamComponent } from "./WebCamComponent";

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

// Gives the inital state for the component

//Actual functional component
export default function Home() {
	const [state, dispatch] = React.useReducer(
		reducer,
		{ userMode: 0, frames: [] },
		extractInitArg
	);

	const classes = useCustomeStyles();
	const webcamRef = React.useRef(null);

	const handleScan = (e) => {
		e.preventDefault();
		dispatch({ type: "scan", payload: { webcamRef } });
	};
	const handleFlip = (e) => {
		e.preventDefault();
		console.info("flipped");
		dispatch({ type: "flip" });
	};

	return (
		<Grid container direction='column' justify='flex-start' align='center'>
			<Grid item className={classes.appBar} style={{ height: "10%" }}>
				<AppBar position='static' style={{ height: "100%" }}>
					<Toolbar>
						<Typography variant='h5'>Cliniq at your service</Typography>
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
					// zeroMinWidth
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
