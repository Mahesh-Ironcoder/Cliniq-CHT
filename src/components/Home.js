import React, { useReducer, useRef, useEffect, useState } from "react";

import {
	makeStyles,
	Grid,
	CardActions,
	Card,
	CardMedia,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";

import Webcam from "react-webcam";

import * as faceApi from "face-api.js";
import { TinyFaceDetectorOptions } from "face-api.js";

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
	webcamImage: {
		objectFit: "cover",
		// width: "100%",
		// height: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "80vw",
			height: "80vh",
		},
	},
	appbarStyle: {},
	actionBtns: {
		[`${theme.breakpoints.down("sm")} and (orientation: portrait)`]: {
			position: "relative",
			bottom: "10%",
		},
	},
	cardRoot: { position: "relative" },
	cardMediaRoot: { position: "absolute", width: "100%", height: "100%" },
	cardActionsRoot: {
		position: "absolute",
		bottom: "10%",
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

const CustomizedWebcamComp = React.forwardRef((props, ref) => (
	<Webcam ref={ref} {...props} />
));

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

	const [dimenssions, setDimenssions] = useState({ width: 610, height: 480 });
	useEffect(() => {
		let width = webcamRef.current.video.offsetwidth;
		let height = webcamRef.current.video.offsetheight;
		setDimenssions({ width, height });
	}, [webcamRef]);

	useEffect(() => {
		const video = webcamRef.current.video;
		async function loadModels() {
			await faceApi.loadTinyFaceDetectorModel("/models");
		}
		loadModels();

		console.log(webcamRef.current);

		let id;
		video.addEventListener("play", () => {
			const canvas = faceApi.createCanvasFromMedia(video);
			video.insertAdjacentElement("afterend", canvas);
			// const displaySize = {
			// 	width: dimenssions.width,
			// 	height: dimenssions.height,
			// };
			// faceApi.matchDimensions(canvas, displaySize);
			id = setInterval(async () => {
				const detections = await faceApi.detectAllFaces(
					video,
					new TinyFaceDetectorOptions()
				);
				console.log(detections);
				// const resizedDetections = faceApi.resizeResults(
				// 	detections,
				// 	displaySize
				// );
				canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
				faceApi.draw.drawDetections(canvas, detections);
			}, 1000);
		});
		return () => {
			clearInterval(id);
		};
	}, [dimenssions]);

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
		<Grid container direction='column' justify='center' align='center'>
			<Grid item style={{ height: "10%" }}>
				<AppBar position='static' style={{ height: "90%" }}>
					<Toolbar>
						<Typography variant='h5'>Cliniq at your service</Typography>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid item container style={{ height: "90%" }}>
				<Grid item sm={1} />
				<Grid item xs={12} sm={10}>
					<Card
						variant='elevation'
						raised
						style={{ height: "100%" }}
						classes={{
							root: classes.cardRoot,
						}}
					>
						<CardMedia
							ref={webcamRef}
							component={CustomizedWebcamComp}
							className={classes.webcamImage}
							videoConstraints={{
								facingMode: state.um ? "environment" : "user",
								width: dimenssions.width,
								height: dimenssions.height,
							}}
							screenshotFormat='image/png'
							imageSmoothing
							autoPlay
							onUserMediaError={(e) => {
								console.error("Webcam access error: ", e);
							}}
							classes={{
								root: classes.cardMediaRoot,
							}}
						/>
						<CardActions
							// className={classes.actionBtns}
							classes={{ root: classes.cardActionsRoot }}
						>
							<Button
								onClick={handleScan}
								variant='contained'
								color='primary'
								fullWidth
							>
								Scan me
							</Button>
							<IconButton onClick={handleFlip}>
								<FlipCameraIosIcon color='primary' />
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
				<Grid item sm={1} />
			</Grid>
		</Grid>
	);
}
