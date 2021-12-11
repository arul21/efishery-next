export const baseUrl =
	'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4';

export const columns = [
	{ id: 'komoditas', label: 'Commodity', minWidth: 170, numeric: false },
	{ id: 'price', label: 'Price', minWidth: 100, numeric: true },
	// { id: 'price', label: 'Harga (USD)', minWidth: 100, numeric: true },
	{
		id: 'size',
		label: 'Size',
		minWidth: 70,
		align: 'center',
		numeric: true,
	},
	{
		id: 'area_provinsi',
		label: 'Area Province',
		minWidth: 170,
		align: 'center',
		numeric: false,
	},
	{
		id: 'area_kota',
		label: 'City',
		minWidth: 170,
		align: 'center',
		numeric: false,
	},
	{
		id: 'tgl_parsed',
		label: 'Date Added',
		minWidth: 170,
		align: 'center',
		format: (value) => moment(value).format('LL'),
	},
	{
		id: 'action',
		label: 'Action',
		minWidth: 30,
		align: 'center',
	},
];

export const backgroundColor = [
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
];
export const borderColor = [
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
];
