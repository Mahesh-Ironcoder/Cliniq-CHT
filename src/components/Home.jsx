import React from "react";

import {
	Grid,
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Button,
} from "@material-ui/core";

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
}));

//Actual functional component
export default function Home() {
	const classes = useCustomeStyles();
	const webcamRef = React.useRef(null);

	return (
		<Grid container direction='column' justify='flex-start' align='center'>
			<Grid item className={classes.appBar}>
				<AppBar position='static' style={{ height: "100%" }}>
					<Toolbar>
						<Typography variant='h5'>Cliniq at your service</Typography>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid item container style={{ height: "80%" }} zeroMinWidth>
				<Grid item sm={1} />
				<Grid
					item
					xs={12}
					sm={10}
					className={classes.gridContainer}
					zeroMinWidth
				>
					<WebCamComponent ref={webcamRef} canvasRef />
				</Grid>
				<Grid item sm={1} />
			</Grid>
		</Grid>
	);
}
