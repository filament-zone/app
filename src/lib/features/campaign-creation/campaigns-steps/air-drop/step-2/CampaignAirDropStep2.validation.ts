import * as yup from 'yup';

export const campaignAirDropStep2ValidationSchema = yup.object().shape({
	snapshotDate: yup.string().required('Snapshot Date is required'),
	snapshotInterval: yup.string().required('Snapshot Interval is required'),
	snapshotTotal: yup.string().required('Snapshots total value is required')
});
