export default async (request, response) => {
	fetch(
		`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area`,
	)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			return response.status(200).json(data);
		});
};
