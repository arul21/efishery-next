import { baseUrl } from '../../../constants';

export default async (request, response) => {
	fetch(`${baseUrl}/option_area`)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			return response.status(200).json(data);
		})
		.catch((error) => {
			return response.status(500).json(error);
		})
		.catch((error) => {
			return response.status(500).json(error);
		});
};
