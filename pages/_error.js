import { Navbar } from '../components';
import { Container, Button, Grid } from '@mui/material';
import Link from 'next/link';

export default function Custom404() {
	return (
		<>
			<Navbar />
			<Container maxWidth='xl'>
				<Grid
					container
					spacing={0}
					direction='column'
					alignItems='center'
					justifyContent='center'
					style={{ minHeight: '100vh' }}
				>
					<h1>404</h1>
					<div>Page Not Found</div>
					<Link href='/'>
						<Button variant='contained'>Back Home</Button>
					</Link>
				</Grid>
			</Container>
		</>
	);
}
