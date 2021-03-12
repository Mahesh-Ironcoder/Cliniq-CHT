import React from "react";

import { Button, Box, Paper, makeStyles } from "@material-ui/core";
// import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";

import Webcam from "react-webcam";
import {
	TinyFaceDetectorOptions,
	detectAllFaces,
	draw,
	resizeResults,
} from "face-api.js";
// import { KeyboardReturnRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	webcamImage: {
		position: "absolute",
		top: "0",
		left: "0",
		objectFit: "cover",
		width: "100%",
		height: "86vh",
		[theme.breakpoints.up("sm")]: {
			width: "100%",
			height: "100%",
		},
	},
	canvasclass: {
		boxSizing: "border-box",
		position: "absolute",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
	},
}));

// const drawDetections = (canvas, faceDetections) => {
// 	if (faceDetections.length === 0) {
// 		return;
// 	}
// 	const ctxt = canvas.getContext("2d");
// 	const [x, y, width, height] = [
// 		parseInt(faceDetections[0].box.x),
// 		parseInt(faceDetections[0].box.y),
// 		parseInt(faceDetections[0].box.width),
// 		parseInt(faceDetections[0].box.heigth),
// 	];
// 	console.log(x, y);
// 	ctxt.clearRect(0, 0, canvas.width, canvas.height);
// 	ctxt.strokeRect(x, y, width, height);
// };

export const WebCamComponent = React.forwardRef((props, ref) => {
	const classes = useStyles();

	const canvRef = React.useRef();

	React.useEffect(() => {
		const paperWidth = ref.current.video.offsetWidth;
		const paperHeight = ref.current.video.offsetHeight;
		canvRef.current.width = paperWidth;
		canvRef.current.height = paperHeight;
		// console.log(paperWidth, paperHeight);
	});

	let intervalId;

	function detectFace() {
		const videoEle = ref.current.video;

		const canvasEle = canvRef.current;
		console.log(canvasEle);
		console.log("canvas width: ", canvasEle.width);
		console.log("canvas height: ", canvasEle.height);
		let i = 1;
		intervalId = setInterval(() => {
			detectAllFaces(videoEle, new TinyFaceDetectorOptions())
				.then((detections) => {
					const detectionsForSize = resizeResults(detections, {
						width: canvasEle.width,
						height: canvasEle.height,
					});
					console.log(i, ". Detections: ", detections);
					canvasEle
						.getContext("2d")
						.clearRect(0, 0, canvasEle.width, canvasEle.height);
					draw.drawDetections(canvasEle, detectionsForSize, {
						withScore: false,
					});
					i += 1;
				})
				.catch((e) => console.log("error in detecting: ", e));
		}, 1000);
	}

	function stopFace() {
		console.log("Stopped detecting");
		clearInterval(intervalId);
	}

	React.useEffect(() => {
		return stopFace;
	});
	return (
		<>
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
				onPlay={detectFace}
				onEnded={stopFace}
			></Paper>
			<canvas className={classes.canvasclass} ref={canvRef}></canvas>
		</>
	);
});
