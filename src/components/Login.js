import React, { useContext, useState } from "react";

import {
	Button,
	Container,
	TextField,
	makeStyles,
	Typography,
	Avatar,
	Link,
} from "@material-ui/core";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import { AppContext } from "../App.js";

const useStyles = makeStyles((theme) => ({
	ContainerStyles: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	form: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(6),
	},
	submitbtn: {
		margin: "1rem 0rem",
	},
	avatar: {
		marginTop: theme.spacing(3),
		background: theme.palette.info.main,
	},
}));

export default function Login(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useContext(AppContext);

	const classes = useStyles();
	return (
		<Container maxWidth='xs' className={classes.ContainerStyles}>
			<Typography variant='h3'>CliniQ</Typography>
			<Avatar className={classes.avatar}>
				<LocalHospitalRoundedIcon />
			</Avatar>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(e);
				}}
				className={classes.form}
			>
				<TextField
					variant='outlined'
					label='Username or Email'
					name='username'
					fullWidth
					required
					margin='normal'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					variant='outlined'
					label='Password'
					name='password'
					margin='normal'
					fullWidth
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					fullWidth
					type='submit'
					variant='contained'
					color='primary'
					className={classes.submitbtn}
					onClick={(e) => {
						e.preventDefault();
						console.log("login btn clicked");
						login();
					}}
				>
					Login
				</Button>
				<Link href=''>Forgot Password?</Link>
			</form>
			<Link href=''>
				<Typography variant='subtitle1'>Create account</Typography>
			</Link>
		</Container>
	);
}
