import * as yup from 'yup';

export const campaignAirDropStep1ValidationSchema = yup.object().shape({
	title: yup
		.string()
		.max(20, 'Title should be less than 20 characters')
		.required('Title is required'),
	description: yup
		.string()
		.max(50, 'Description should be less than 50 characters')
		.required('Description is required'),
	evictions: yup
		.array()
		.min(1, 'You must evict at least 1 delegate')
		.max(3, 'You can only evict max 3 delegates at a time')
});
