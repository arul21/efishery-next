import * as React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Container,
	Avatar,
} from '@mui/material';

const ResponsiveAppBar = () => {
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
						<Avatar alt='Remy Sharp' src='/images/efish.png' />
					</Typography>

					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						<Avatar alt='Remy Sharp' src='/images/efish.png' />
						<div style={{ marginLeft: 5, marginTop: 5 }}>
							Commodity Dashboard
						</div>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
						>
							Commodity Dashboard
						</Typography>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
