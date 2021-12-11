import { baseUrl } from '../../../constants';
import { generateUUID } from '../../../helpers';

export default async (request, response) => {
	const {
		method,
		query: { offset, limit },
	} = request;

	if (method === 'GET') {
		fetch(`${baseUrl}/list`)
			.then((resp) => {
				return resp.json();
			})
			.then((data) => {
				return response.status(200).json(data);
			})
			.catch((error) => {
				return response.status(500).json(error);
			});
	}

	if (method === 'POST') {
		const uid = generateUUID();
		const {
			body: { komoditas, size, price, area_provinsi, area_kota },
		} = request;

		const newData = [
			{
				uuid: uid,
				komoditas,
				size: Number(size),
				price: Number(price),
				area_provinsi,
				area_kota: area_kota.city,
				tgl_parsed: new Date(),
				timestamp: Math.floor(Date.now() / 1000),
			},
		];

		fetch(`${baseUrl}/list`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newData),
		})
			.then((resp) => {
				return resp.json();
			})
			.then((data) => {
				return response.status(200).json(data);
			})
			.catch((error) => {
				return response.status(500).json(error);
			});
	}
};
