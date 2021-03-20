import {
	Button,
	Grid,
	Link,
	Box,
	Container,
	TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { AppContext } from "../App";
import { WebCamComponent } from "./WebCamComponent";

function dataURItoBlob(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString;
	if (dataURI.split(",")[0].indexOf("base64") >= 0)
		byteString = atob(dataURI.split(",")[1]);
	else byteString = unescape(dataURI.split(",")[1]);

	// separate out the mime component
	var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ia], { type: mimeString });
}

const loginStyles = makeStyles((theme) => ({
	loginContainer: {
		padding: theme.spacing(2),
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	boxContainer: { width: "100%", position: "relative", flexGrow: "1" },
	linkStyles: { alignSelf: "flex-start" },
}));

export default function Demo() {
	const webcamRef = React.useRef(null);
	const { login, setIsLoading } = React.useContext(AppContext);
	const [userName, setUserName] = React.useState("");
	const classes = loginStyles();

	const handleClick = (e) => {
		let img = webcamRef.current.getScreenshot();
		console.log("clicked");

		let formdata = new FormData();
		let blobIMG = dataURItoBlob(img);

		formdata.append("img1", blobIMG);
		formdata.append("username", userName);
		setIsLoading(true);

		fetch("/register", {
			method: "POST",
			body: formdata,
			redirect: "follow",
		})
			.then((resp) => {
				// if
				console.log("Response: ", resp);
				return resp.json();
			})
			.then((body) => {
				console.log("body: ", body);
				login(body.verificationResult.verified);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
	};
	return (
		<Grid container direction='row' justify='center' alignItems='stretch'>
			<Grid item xs={1} sm={2} />
			<Grid item xs={10} sm={8}>
				<Container className={classes.loginContainer}>
					<Box style={{ width: "100%" }} className={classes.boxContainer}>
						hi
						<WebCamComponent userMode={0} ref={webcamRef} />
					</Box>
					<TextField
						margin='normal'
						value={userName}
						label='Username or EmailId'
						variant='outlined'
						fullWidth
						required
						color='secondary'
						onChange={(e) => {
							e.preventDefault();
							setUserName(e.target.value);
						}}
					/>
					<Button
						onClick={handleClick}
						variant='contained'
						color='primary'
						size='large'
					>
						Register
					</Button>
				</Container>
			</Grid>
			<Grid item xs={1} sm={2} />
		</Grid>
	);
}
