import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid } from '@mui/material';
import { Navbar } from '../components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = () => {
	const [dataCommodity, setDataCommodity] = useState([]);
	const [provinsi, setProvinsi] = useState([]);
	const [dataProvinsi, setDataProvinsi] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fetch('/api/commodities');
		if (!response.ok) {
			setDataCommodity([]);
		}
		const commodities = await response.json();
		getDataProvinsi(commodities);
		return setDataCommodity(
			commodities &&
				commodities.filter((value) => {
					return value.uuid && value.komoditas && value.tgl_parsed;
				}),
		);
	};

	const getDataProvinsi = (data) => {
		let newProvinsi = [];
		let tempArray = [];

		data.forEach((el) => {
			const { area_provinsi } = el;
			newProvinsi.push(area_provinsi);

			const index = tempArray.indexOf(area_provinsi);
			if (index === -1) {
				area_provinsi && tempArray.push(area_provinsi);
			}
		});

		setProvinsi(tempArray);

		let totalDataProvinsi = [];
		tempArray.forEach((val) => {
			const result = newProvinsi.filter((e) => e === val);
			totalDataProvinsi.push(parseInt(result.length));
		});

		setDataProvinsi(totalDataProvinsi);
	};

	const data = {
		labels: provinsi,
		datasets: [
			{
				label: '# of Votes',
				data: dataProvinsi,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(24, 191, 22, 0.2)',
					'rgba(255, 111, 22, 0.2)',
					'rgba(122, 88, 67, 0.2)',
					'rgba(183, 155, 64, 0.2)',
					'rgba(124, 212, 12, 0.2)',
					'rgba(244, 145, 24, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 111, 22, 1)',
					'rgba(122, 88, 67, 1)',
					'rgba(183, 155, 64, 1)',
					'rgba(124, 212, 12, 1)',
					'rgba(244, 145, 24, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<>
			<Navbar />
			<Container maxWidth='sm'>
				<Grid
					container
					spacing={0}
					direction='column'
					alignItems='center'
					justifyContent='center'
					style={{ minHeight: '100vh' }}
				>
					<h1>Chart Komoditi</h1>

					<Doughnut data={data} />
				</Grid>
			</Container>
		</>
	);
};

export default Overview;
