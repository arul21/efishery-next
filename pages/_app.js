import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function MyApp(props) {
	const { Component, pageProps } = props;
	const lightTheme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#1976d2',
			},
		},
	});

	return (
		<>
			<Head>
				<title>Commodity Dashboard</title>
				<meta name='description' content='Generated by create next app' />
				<link
					rel='shortcut icon'
					href='/images/favicon.ico'
					type='image/x-icon'
				/>
				<link rel='icon' href='/images/favicon.ico' type='image/x-icon' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};