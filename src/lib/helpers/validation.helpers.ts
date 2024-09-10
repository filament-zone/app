import { type AnyObject, type ObjectSchema, type ValidationError } from 'yup';
import { toastsStore } from '$lib/features';

export const validateForm = async (valuesToValidate: unknown, schema: ObjectSchema<AnyObject>) => {
	const { send } = toastsStore;
	try {
		await schema.validate(valuesToValidate, { abortEarly: false });
		return true;
	} catch (err) {
		const error = err as ValidationError;

		if (error.inner) {
			error.inner.forEach((currError) => {
				send({ message: currError.message });
			}, {});
		}
		return false;
	}
};
