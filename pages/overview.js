import React, { useEffect, useState } from 'react';
import {
	Container,
	CardHeader,
	Card,
	CardContent,
	Typography,
} from '@mui/material';
import { Navbar } from '../components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { backgroundColor, borderColor } from '../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = () => {
	const [dataCommodity, setDataCommodity] = useState([]);
	const [provinsi, setProvinsi] = useState([]);
	const [dataProvinsi, setDataProvinsi] = useState([]);
	const [textData, setTextData] = useState([]);
	const [totalCommudity, setTotalCommudity] = useState([]);

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
		getDataCommodity(commodities);
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

	const getDataCommodity = (data) => {
		let newCommudity = [];
		let tempArray = [];

		data.forEach((el) => {
			const { komoditas } = el;
			newCommudity.push(komoditas);

			const index = tempArray.indexOf(komoditas);
			if (index === -1) {
				komoditas && tempArray.push(komoditas);
			}
		});
		setTextData(tempArray);

		let totalDataCommudity = [];
		tempArray.forEach((val) => {
			const result = newCommudity.filter((e) => e === val);
			totalDataCommudity.push(parseInt(result.length));
		});
		setTotalCommudity(totalDataCommudity);
	};

	const newCommudity = {
		labels: textData,
		datasets: [
			{
				label: '# of Votes',
				data: totalCommudity,
				backgroundColor,
				borderColor,
				borderWidth: 1,
			},
		],
	};

	const data = {
		labels: provinsi,
		datasets: [
			{
				label: '# of Votes',
				data: dataProvinsi,
				backgroundColor,
				borderColor,
				borderWidth: 1,
			},
		],
	};
	return (
		<>
			<Navbar />
			<Container maxWidth='sm' style={{ marginBottom: 100 }}>
				<Card
					sx={{
						minWidth: 275,
						marginTop: 5,
						justifyContent: 'center',
					}}
				>
					<CardContent>
						<CardHeader title='Area Chart Commodity' />
						<Doughnut data={data} />
					</CardContent>
				</Card>
				<Card
					sx={{
						minWidth: 275,
						marginTop: 5,
						justifyContent: 'center',
					}}
				>
					<CardContent>
						<CardHeader title=' Chart Commodity' />

						<Doughnut data={newCommudity} />
					</CardContent>
				</Card>
			</Container>
		</>
	);
};

export default Overview;
