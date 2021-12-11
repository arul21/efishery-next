import { baseUrl } from '../../../constants';

export default async (request, response) => {
	const {
		method,
		query: { uuid },
	} = request;
	if (method === 'DELETE') {
		const query = {
			condition: { uuid: uuid },
		};
		fetch(`${baseUrl}/list`, {
			method: 'delete',
			body: JSON.stringify(query),
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
