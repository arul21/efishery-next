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
