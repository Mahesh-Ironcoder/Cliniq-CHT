import React, { useReducer, useRef } from "react";

import { makeStyles, Grid, Fab } from "@material-ui/core";
import { Button, Box } from "@material-ui/core";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";

import Webcam from "react-webcam";

//Styles for the components in a material way
const useStyles = makeStyles((theme) => ({
	containerStyles: {
		height: "100%",
		// border: "1px solid black",
	},
	mainContainer: {
		margin: "2rem",
		height: "95vh",
		// border: "1px solid red",
	},
	boxStyle: {
		margin: theme.spacing(1),
		position: "relative",
		bottom: theme.spacing(15),
		// border: "1px solid blue",
	},
}));

//Reducer function for state management
const reducer = (state, action) => {
	switch (action.type) {
		case "flip":
			return { ...state, um: !state.um };
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
			break;
	}
};

// Gives the inital state for the component
const extractInitArg = (initialArg) => {
	return { ...initialArg };
};

//Actual functional component
export default function Home() {
	//component state
	const [state, dispatch] = useReducer(
		reducer,
		{ um: 0, frames: [] },
		extractInitArg
	);

	//reference object to the webcam component
	const webcamRef = useRef(null);
	const classes = useStyles();

	//handles webcam scan and flip functionality
	const handleScan = (e) => {
		e.preventDefault();
		dispatch({ type: "scan", payload: { webcamRef } });
	};
	const handleFlip = (e) => {
		e.preventDefault();
		dispatch({ type: "flip" });
	};
	return (
		<div className={classes.mainContainer}>
			<Grid
				container
				direction='row'
				justify='center'
				alignItems='stretch'
				className={classes.containerStyles}
			>
				<Grid item xs={0} sm={3}></Grid>
				<Grid item xs={12} sm={6}>
					<Webcam
						width='100%'
						ref={webcamRef}
						videoConstraints={{ facingMode: state.um ? "environment" : "user" }}
						screenshotFormat='image/png'
						imageSmoothing
						onUserMediaError={(e) => {
							console.error("Webcam access error: ", e);
						}}
					/>
					<Box
						className={classes.boxStyle}
						display='flex'
						flexDirection='row'
						justifyContent='spaceBetween'
					>
						<Box flex={1} alignSelf='center'>
							<Button
								fullWidth
								variant='contained'
								color='primary'
								onClick={handleScan}
							>
								Scan
							</Button>
						</Box>
						<Fab
							size='small'
							variant='extended'
							color='primary'
							onClick={handleFlip}
							// marginLeft='0.1em'
						>
							<FlipCameraIosIcon fontSize='small' color='#FFF' />
						</Fab>
					</Box>
				</Grid>
				<Grid item xs={0} sm={3}></Grid>
			</Grid>
		</div>
	);
}
