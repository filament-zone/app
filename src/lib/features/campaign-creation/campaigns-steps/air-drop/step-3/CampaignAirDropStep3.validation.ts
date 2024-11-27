import * as yup from 'yup';

export const campaignAirDropStep3ValidationSchema = yup.object().shape({
	visibility: yup.string().required('Visibility is required'),
	relativeShare: yup.string().required('Relative Share  is required'),
	totalAirDropSupply: yup.string().required('Total Air Drop Supply is required'),
	tokenContractAddress: yup.string().nullable(),
	budgetFrom: yup.string().required('Budget From is required'),
	budgetTo: yup.string().required('Budget To is required'),
	bond: yup.string().required('Bond is required')
});
