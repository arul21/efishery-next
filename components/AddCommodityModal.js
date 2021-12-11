import * as React from 'react';
import {
	Box,
	TextField,
	Button,
	Typography,
	Modal,
	MenuItem,
	CircularProgress,
} from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '0px solid #000',
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
};

export default function AddCommodityModal({
	open,
	handleClose,
	sizeData,
	inputData,
	onChange,
	areaData,
	onSubmit,
}) {
	const { komoditas, size, price, area_provinsi, area_kota } = inputData;
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					Tambah Komoditi
				</Typography>
				<div style={{ marginTop: 15 }}>
					<TextField
						id='outlined-uncontrolled'
						size='small'
						label='Komoditas'
						variant='outlined'
						name='komoditas'
						fullWidth
						value={komoditas}
						style={{ paddingBottom: 20 }}
						onChange={onChange}
					/>
					<TextField
						id='outlined-uncontrolled'
						size='small'
						label='Harga'
						name='price'
						variant='outlined'
						fullWidth
						value={price}
						style={{ paddingBottom: 20 }}
						onChange={onChange}
						type='number'
					/>
					<TextField
						id='outlined-uncontrolled'
						select
						label='Size'
						fullWidth
						size='small'
						name='size'
						style={{ paddingBottom: 20 }}
						value={size}
						onChange={onChange}
					>
						{sizeData &&
							sizeData.map((option) => (
								<MenuItem key={option.size} value={option.size}>
									{option.size}
								</MenuItem>
							))}
					</TextField>
					<TextField
						id='outlined-uncontrolled'
						select
						label='Area Kota'
						fullWidth
						size='small'
						name='area_kota'
						style={{ paddingBottom: 20 }}
						value={area_kota}
						onChange={onChange}
					>
						{areaData &&
							areaData.map((option, i) => (
								<MenuItem key={i} value={option}>
									{option.city}
								</MenuItem>
							))}
					</TextField>
					<TextField
						id='outlined-uncontrolled'
						size='small'
						label='Area Provinsi'
						variant='outlined'
						fullWidth
						value={area_provinsi}
						style={{ paddingBottom: 20 }}
					/>
				</div>
				<Button variant='contained' onClick={onSubmit}>
					Simpan
				</Button>
			</Box>
		</Modal>
	);
}
