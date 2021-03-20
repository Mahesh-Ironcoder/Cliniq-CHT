import { createMuiTheme } from "@material-ui/core/styles";


export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "rgba(242, 171, 29, 1)",
			contrastText: "rgba(255, 255, 255, 1)",
		},
		secondary: {
			main: "rgba(55, 188, 223, 1)",
		},
		background: {
			default: "rgba(247, 247, 247, 1)",
		},
	},
});
