import * as React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Container,
	Avatar,
	Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ResponsiveAppBar = () => {
	const router = useRouter();
	const isRoot = router.asPath === '/';
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
					<Box sx={{ flexGrow: 0 }}>
						<Link href={`${isRoot ? '/overview' : '/'}`}>
							<Button variant='text' color='inherit'>
								<Typography textAlign='center'>
									{isRoot ? 'Overview Data' : 'Home'}
								</Typography>
							</Button>
						</Link>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
