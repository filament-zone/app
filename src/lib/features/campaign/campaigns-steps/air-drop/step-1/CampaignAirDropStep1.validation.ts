import * as yup from 'yup';

export const campaignAirDropStep1ValidationSchema = yup.object().shape({
	title: yup
		.string()
		.max(24, 'Title should be less than 24 characters')
		.required('Title is required'),
	description: yup
		.string()
		.min(50, 'Description should be at least 50 characters')
		.required('Description is required'),

	evictions: yup.array().max(3, 'You can only evict max 3 delegates at a time')
});
