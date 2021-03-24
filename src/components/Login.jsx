import React, { useContext, useState } from "react";

import {
	Button,
	TextField,
	makeStyles,
	Grid,
	Card,
	CardHeader,
	CardContent,
	Link,
	CardActions,
	Box,
} from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AppContext } from "../App.js";

const useStyles = makeStyles((theme) => ({
	LoginCardContainer: {
		[theme.breakpoints.down("sm")]: { width: "100%", minWidth: "300px" },
	},
	cardHeaderStyle: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	form: {
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(1),
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	submitbtn: {
		margin: "1rem 0rem",
		width: "40%",
		color: theme.palette.primary.contrastText,
	},
	avatar: {
		marginTop: theme.spacing(3),
		background: theme.palette.info.main,
	},
	linkStyle: {
		color: theme.palette.grey[500],
	},
	faceunloackLink: {
		color: theme.palette.grey[500],
		float: "right",
	},
}));

export default function Login(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useContext(AppContext);

	const classes = useStyles();

	return (
		<Grid container direction='row' justify='center' alignItems='center'>
			<Grid item xs={1} sm={4} />
			<Grid item xs={10} sm={3}>
				<Card variant='elevation' raised className={classes.LoginCardContainer}>
					<CardHeader
						title='CliniQ'
						titleTypographyProps={{ variant: "h2" }}
						avatar={<LocalHospitalIcon fontSize='large' />}
						className={classes.cardHeaderStyle}
					/>
					<CardContent>
						<form className={classes.form}>
							<TextField
								autoFocus
								margin='normal'
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								label='Username or EmailId'
								variant='outlined'
								fullWidth
								required
								color='secondary'
							/>
							<TextField
								color='secondary'
								margin='normal'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								label='Password'
								variant='outlined'
								fullWidth
								type='password'
								required
							/>
							<Button
								variant='contained'
								color='primary'
								size='large'
								className={classes.submitbtn}
								type='submit'
								onClick={(e) => {
									e.preventDefault();
									login(true);
								}}
							>
								Log in
							</Button>
						</form>
						<Box>
							<Link className={classes.linkStyle} href=''>
								Forgot password?
							</Link>
							<Link className={classes.faceunloackLink} href='/facelogin'>
								Face Unlock
							</Link>
						</Box>
						<CardActions>
							<Button
								fullWidth
								color='secondary'
								margin='auto'
								startIcon={<AccountCircleIcon />}
								href='/fregister'
							>
								Create Account
							</Button>
						</CardActions>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={1} sm={4} />
		</Grid>
	);
}
