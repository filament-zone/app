import * as yup from 'yup';

export const campaignAirDropStep1ValidationSchema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	maxEvictableDelegates: yup.string().required('Max Evictable Delegates is required'),
	activeDelegates: yup.array().min(1, 'Select at least one Active Delegate'),
	evictedDelegates: yup.array()
});
