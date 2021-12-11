import React, { useState, useEffect } from 'react';
import { Navbar, Table } from '../components';
import { Container, CircularProgress, Grid, Button } from '@mui/material';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const columns = [
	{ id: 'komoditas', label: 'Komoditas', minWidth: 170, numeric: false },
	{ id: 'price', label: 'Harga', minWidth: 100, numeric: true },
	{
		id: 'size',
		label: 'Ukuran',
		minWidth: 70,
		align: 'center',
		numeric: true,
	},
	{
		id: 'area_provinsi',
		label: 'Area Provinsi',
		minWidth: 170,
		align: 'center',
		numeric: false,
	},
	{
		id: 'area_kota',
		label: 'Kota',
		minWidth: 170,
		align: 'center',
		numeric: false,
	},
	{
		id: 'tgl_parsed',
		label: 'Tanggal Dibuat',
		minWidth: 170,
		align: 'center',
		format: (value) => moment(value).format('LL'),
	},
];
function HomePage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		const response = await fetch('/api');

		if (!response.ok) {
			setLoading(false);
			setData([]);
		}
		setLoading(false);
		const commodities = await response.json();
		return setData(
			commodities.filter((value) => {
				return value.uuid && value.komoditas && value.tgl_parsed;
			}),
		);
	};

	return (
		<>
			<Navbar />
			<Container maxWidth='xl'>
				{loading ? (
					<Grid
						container
						spacing={0}
						direction='column'
						alignItems='center'
						justifyContent='center'
						style={{ minHeight: '100vh' }}
					>
						<CircularProgress color='secondary' />
					</Grid>
				) : (
					<Grid container spacing={0} style={{ paddingTop: 45 }}>
						<Grid
							container
							justifyContent='center'
							style={{ paddingBottom: 4 }}
						>
							<h1> List Harga Komoditas Ikan</h1>
						</Grid>
						<Table data={data} columns={columns} />
					</Grid>
				)}
			</Container>
		</>
	);
}

export default HomePage;
