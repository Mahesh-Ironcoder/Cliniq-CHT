import React from "react";

import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

import { WebCamComponent } from "./WebCamComponent";

function useContainerDimensions(myRef) {
	const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

	React.useEffect(() => {
		const getDimensions = () => ({
			width: myRef.current.offsetWidth,
			height: myRef.current.offsetHeight,
		});
		const handleResize = () => {
			setDimensions(getDimensions());
		};

		if (myRef.current) {
			setDimensions(getDimensions());
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [myRef]);

	return dimensions;
}

//Reducer function for state management
// const reducer = (state, action) => {
// 	switch (action.type) {
// 		case "flip":
// 			return { ...state, um: !state.um };
// 		case "scan":
// 			let tempState = state;
// 			for (let i = 0; i < 10; i++) {
// 				let tempObj = {};
// 				tempObj[Date.now()] = action.payload.webcamRef.current.getScreenshot();
// 				tempState.frames.push(tempObj);
// 			}
// 			console.log(tempState);
// 			return tempState;
// 		default:
// 			console.log("No action");
// 			break;
// 	}
// };

// Gives the inital state for the component
// const extractInitArg = (initialArg) => {
// 	return { ...initialArg };
// };

//Actual functional component
export default function Home() {
	//component state
	// const [state, dispatch] = React.useReducer(
	// 	reducer,
	// 	{ um: 0, frames: [] },
	// 	extractInitArg
	// );
	const webcamRef = React.useRef(null);
	const gridRef = React.useRef(null);

	// const { width, height } = useContainerDimensions(gridRef);

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
				<Grid item xs={12} sm={10} ref={gridRef}>
					<WebCamComponent ref={webcamRef} />
					{/* <h3>width: {width}</h3>
					<h3>height: {height}</h3> */}
				</Grid>
				<Grid item sm={1} />
			</Grid>
		</Grid>
	);
}

// {
// 	/* <Card variant='elevation' raised style={{ height: "100%" }}>
// 	<CardMedia
// 		ref={webcamRef}
// 		component={CustomizedWebcamComp}
// 		className={classes.webcamImage}
// 		videoConstraints={{
// 			facingMode: state.um ? "environment" : "user",
// 		}}
// 		screenshotFormat='image/png'
// 		imageSmoothing
// 		onUserMediaError={(e) => {
// 			console.error("Webcam access error: ", e);
// 		}}
// 	/>
// 	<CardActions className={classes.actionBtns}>
// 		<Button variant='contained' color='primary' fullWidth>
// 			Scan me
// 		</Button>
// 		<IconButton>
// 			<FlipCameraIosIcon color='primary' />
// 		</IconButton>
// 	</CardActions>
// </Card>; */
// }
