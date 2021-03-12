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
// import Demo from "./Demo";

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
	const canvasRef = React.useRef(null);
	const [state, setState] = React.useState(true);

	return (
		<Grid
			container
			direction='column'
			justify='flex-start'
			align='center'
			// spacing={6}
		>
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
					// ref={gridRef}
					className={classes.gridContainer}
					// style={{ positiom: "relative" }}
					zeroMinWidth
				>
					<WebCamComponent ref={webcamRef} canvasRef />
					{/* <canvas ref={canvasRef} className={classes.canvasclass} />
					</WebCamComponent> */}
					{/* {state ? <WebCamComponent ref={webcamRef} canvasRef /> : <Demo />} */}
					{/* <h3>width: {width}</h3>
					<h3>height: {height}</h3> */}
				</Grid>
				<Grid item sm={1} />
			</Grid>
			{/* <Grid item>
				<Button onClick={(e) => setState(!state)}>Click me</Button>
			</Grid> */}
		</Grid>
	);
}
