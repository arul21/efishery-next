import React, { useState, useEffect } from 'react';
import {
	Container,
	CircularProgress,
	Grid,
	Backdrop,
	Alert,
	Snackbar,
} from '@mui/material';
import { Navbar, Table, AddCommodityModal } from '../components';
import { columns } from '../constants';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

function HomePage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSnackBar, setOpenSnakBar] = useState(false);
	const [sizeData, setSizeData] = useState([]);
	const [areas, setAreas] = useState([]);
	const [message, setMessage] = useState('');
	const [state, setState] = useState({
		komoditas: '',
		size: '',
		price: '',
		area_provinsi: '',
		area_kota: '',
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		const response = await fetch('/api/commodities');
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

	const onAddCommodity = async () => {
		setOpen(true);
		const responseSize = await fetch('/api/size');
		const responseArea = await fetch('/api/area');
		const [resultSize, resultArea] = await Promise.all([
			responseSize,
			responseArea,
		]);

		if (!resultSize.ok && !resultArea.ok) {
			setSizeData([]);
			setAreas([]);
		}
		const sizes = await resultSize.json();
		const resAreas = await resultArea.json();
		setSizeData(sizes);
		setAreas(resAreas);
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'area_kota') {
			setState((prevState) => ({
				...prevState,
				[name]: value.city,
				area_kota: value.city,
				area_provinsi: value.province,
			}));
		}
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const onSubmit = async () => {
		setLoading(true);
		const response = await fetch('/api/commodities', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(state),
		});
		if (!response.ok) {
			setLoading(false);
			setMessage('Terjadi kesalahan');
		}
		setState({
			komoditas: '',
			size: '',
			price: '',
			area_provinsi: '',
			area_kota: '',
		});
		setLoading(true);
		setOpen(false);
		setMessage('Berhasil Menambahkan Komoditi');
		setOpenSnakBar(true);
		fetchData();
	};

	return (
		<>
			<Navbar />

			<Container maxWidth='xl'>
				<Snackbar
					open={openSnackBar}
					autoHideDuration={3000}
					onClose={() => setOpenSnakBar(false)}
				>
					<Alert
						onClose={() => setOpenSnakBar(false)}
						severity='success'
						sx={{ width: '100%' }}
					>
						{message}
					</Alert>
				</Snackbar>
				{/* <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color='inherit' />
        </Backdrop> */}
				<Grid container spacing={0} style={{ paddingTop: 45 }}>
					<Grid container justifyContent='center' style={{ paddingBottom: 4 }}>
						<h1> List Harga Komoditi Ikan</h1>
					</Grid>
					<Table
						data={data}
						columns={columns}
						handleOpenModal={onAddCommodity}
					/>
				</Grid>
			</Container>
			<AddCommodityModal
				open={open}
				handleClose={() => setOpen(false)}
				sizeData={sizeData}
				areaData={areas}
				inputData={state}
				onChange={onChange}
				onSubmit={onSubmit}
				loading={loading}
			/>
		</>
	);
}

export default HomePage;
