import React, { useEffect, useState } from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Grid,
	TextField,
	TableSortLabel,
	Button,
	IconButton,
} from '@mui/material/';
import { Delete, Edit } from '@mui/icons-material';
import moment from 'moment';
import { isIsoDate, currencyConvert } from '../helpers';

export default function StickyHeadTable({
	data,
	columns,
	handleOpenModal,
	onDeleteItem,
}) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const [rootData, setRootData] = useState(data);
	const [searchInput, setSearchInput] = useState('');
	const [filteredResults, setFilteredResults] = useState([]);
	const [order, setOrder] = React.useState('desc');
	const [orderBy, setOrderBy] = React.useState('tgl_parsed');

	useEffect(() => {
		setRootData(data);
	}, []);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const searchItems = (searchValue) => {
		setSearchInput(searchValue);
		if (searchInput !== '') {
			const filteredData = data.filter((item) => {
				return Object.values(item)
					.join('')
					.toLowerCase()
					.includes(searchInput.toLowerCase());
			});
			setFilteredResults(filteredData);
		} else {
			setFilteredResults(rootData);
		}
	};

	const stableSort = (array, comparator) => {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) {
				return order;
			}
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	};

	const descendingComparator = (a, b, orderBy) => {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	};

	const getComparator = (order, orderBy) => {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	};

	const handleRequestSort = (property) => (event) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					<Button variant='contained' onClick={handleOpenModal}>
						Tambah Komoditi
					</Button>
				</Grid>
				<Grid item xs={2} justifyContent='flex-end'></Grid>
				<Grid item xs={5}>
					<TextField
						size='small'
						id='commodity-search'
						label='Pencarian'
						type='search'
						fullWidth
						onChange={(e) => searchItems(e.target.value)}
					/>
				</Grid>
			</Grid>
			<Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 3 }}>
				<TableContainer sx={{ maxHeight: 650 }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
										sortDirection={orderBy === column.id ? order : false}
									>
										<TableSortLabel
											active={orderBy === column.id}
											direction={orderBy === column.id ? order : 'asc'}
											onClick={handleRequestSort(column.id)}
										>
											{column.label}
										</TableSortLabel>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{searchInput.length > 1
								? stableSort(filteredResults, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, i) => {
											return (
												<TableRow tabIndex={-1} key={i}>
													{columns.map((column) => {
														const value = row[column.id];
														return (
															<TableCell key={column.id} align={column.align}>
																{isIsoDate(value)
																	? moment(value).format('LL')
																	: column.id === 'price'
																	? currencyConvert(value)
																	: value}
																{column.id === 'action' && (
																	<>
																		<IconButton aria-label='update'>
																			<Edit />
																		</IconButton>
																		<IconButton
																			aria-label='delete'
																			onClick={() =>
																				onDeleteItem(row.uuid, row.komoditas)
																			}
																		>
																			<Delete />
																		</IconButton>
																	</>
																)}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})
								: stableSort(data, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, i) => {
											return (
												<TableRow tabIndex={-1} key={i}>
													{columns.map((column) => {
														const value = row[column.id];

														return (
															<>
																<TableCell key={column.id} align={column.align}>
																	{isIsoDate(value)
																		? moment(value).format('LL')
																		: column.id === 'price'
																		? currencyConvert(value)
																		: value}
																	{column.id === 'action' && (
																		<>
																			<IconButton aria-label='update'>
																				<Edit />
																			</IconButton>
																			<IconButton
																				aria-label='delete'
																				onClick={() =>
																					onDeleteItem(row.uuid, row.komoditas)
																				}
																			>
																				<Delete />
																			</IconButton>
																		</>
																	)}
																</TableCell>
															</>
														);
													})}
												</TableRow>
											);
										})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 20, 100]}
					component='div'
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
