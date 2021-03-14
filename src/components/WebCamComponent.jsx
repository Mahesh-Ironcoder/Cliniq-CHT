import React from "react";

import { Paper, makeStyles } from "@material-ui/core";

import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import {
	TinyFaceDetectorOptions,
	detectAllFaces,
	draw,
	resizeResults,
	BoxWithText,
	Rect,
} from "face-api.js";

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

const DrawLabelText = ({ ctxt, x, y, maxlength, texts }) => {
	ctxt.font = "16px Arial blue";
	ctxt.fillStyle = "blue";
	ctxt.fillRect(x - 1, y - 60, maxlength + 2, 60);
	ctxt.fillStyle = "#fff";
	ctxt.fillText(
		`Age: ${parseInt(texts.age)}`,
		parseInt(x),
		parseInt(y) - 40,
		maxlength
	);
	ctxt.fillText(
		`Gender: ${texts.gender}`,
		parseInt(x),
		parseInt(y) - 15,
		maxlength
	);
};

export const WebCamComponent = React.forwardRef((props, ref) => {
	const classes = useStyles();

	const canvRef = React.useRef();

	const { userMode } = props;

	const videoConstraints = {
		facingMode: !userMode ? "user" : "environment",
	};

	let intervalId;

	function detectFace() {
		console.log("Face detection started:", Date.now());
		const videoEle = ref.current.video;

		const canvasEle = canvRef.current;
		console.log(canvasEle);
		console.log("canvas width: ", canvasEle.width);
		console.log("canvas height: ", canvasEle.height);
		let i = 1;
		intervalId = setInterval(() => {
			const useTinyModel = true;
			detectAllFaces(videoEle, new TinyFaceDetectorOptions())
				.withAgeAndGender()
				.then((detections) => {
					const detectionsForSize = resizeResults(detections, {
						width: canvasEle.width,
						height: canvasEle.height,
					});
					console.log(i, ". Detections: ", detections);

					//defining score as undefined so that it wont be displayed
					let { detection } = detectionsForSize[0];
					detection._score = undefined;

					const ctxt = canvasEle.getContext("2d");

					ctxt.clearRect(0, 0, canvasEle.width, canvasEle.height);
					const { x, y } = detectionsForSize[0].detection.box.topLeft;
					DrawLabelText({
						ctxt,
						x,
						y,
						maxlength: detectionsForSize[0].detection.box.width,
						texts: {
							age: detectionsForSize[0].age,
							gender: detectionsForSize[0].gender,
						},
					});
					draw.drawDetections(canvasEle, detection, {
						withScore: false,
					});

					i += 1;
				})
				.catch((e) => console.log("error in detecting: ", e));
		}, 1000);
	}

	function stopFace() {
		console.log("Face stopped started:", Date.now());
		clearInterval(intervalId);
	}

	React.useEffect(() => {
		const paperWidth = ref.current.video.offsetWidth;
		const paperHeight = ref.current.video.offsetHeight;
		canvRef.current.width = paperWidth;
		canvRef.current.height = paperHeight;
		// console.log(paperWidth, paperHeight);
		return stopFace;
	});

	return (
		<>
			<Paper
				className={classes.webcamImage}
				ref={ref}
				component={Webcam}
				videoConstraints={videoConstraints}
				screenshotFormat='image/png'
				imageSmoothing
				onUserMediaError={(e) => {
					console.error("Webcam access error: ", e);
				}}
				onPlay={detectFace}
			></Paper>
			<canvas className={classes.canvasclass} ref={canvRef}></canvas>
		</>
	);
});
