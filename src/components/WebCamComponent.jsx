import React from "react";

import { Button, Box, Paper, makeStyles } from "@material-ui/core";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";

import Webcam from "react-webcam";

const useStyles = makeStyles((theme) => ({
	webcamImage: {
		objectFit: "cover",
		width: "100%",
		height: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "80vw",
			height: "80vh",
		},
	},
}));

export const WebCamComponent = React.forwardRef((props, ref) => {
	// const { width, height } = props;
	const [videoConstraints, setVideoConstraints] = React.useState({
		facingMode: "user",
		// width: { min: 780 },
		// height: { min: 720 },
		aspectRatio: 0.6666666667,
	});
	const classes = useStyles();
	console.log(ref.current);
	return (
		<Paper
			className={classes.webcamImage}
			ref={ref}
			component={Webcam}
			videoConstraints
			screenshotFormat='image/png'
			imageSmoothing
			onUserMediaError={(e) => {
				console.error("Webcam access error: ", e);
			}}
		/>
	);
});
