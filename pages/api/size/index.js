import { baseUrl } from '../../../constants';

export default async (request, response) => {
	const { method } = request;

	if (method === 'GET') {
		fetch(`${baseUrl}/option_size`)
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
