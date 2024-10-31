import * as yup from 'yup';

export const campaignAirDropStep1ValidationSchema = yup.object().shape({
	title: yup.string().max(20, 'Should be less than 20 characters').required('Title is required'),
	description: yup
		.string()
		.max(50, 'Should be less than 50 characters')
		.required('Description is required'),
	maxEvictableDelegates: yup.string().required('Max Evictable Delegates is required'),
	activeDelegates: yup.array().min(1, 'Select at least one Active Delegate'),
	evictedDelegates: yup.array()
});
