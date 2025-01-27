import { EBadgeColorVariant } from '$lib/components/atoms/Badge/Badge.enums';
import { EProposalStatus, EProposalType } from '$lib/features/proposals/proposals.enums';

export const ProposalTypeNameMap = {
	[EProposalType.CREATE_STREAM]: 'Create Stream',
	[EProposalType.PARAMETER_CHANGE]: 'Parameter Change'
};

export const ProposalStatusNameMap: Record<EProposalStatus, string> = {
	[EProposalStatus.OPEN]: 'Ongoing',
	[EProposalStatus.FAILED]: 'Failed',
	[EProposalStatus.REJECTED]: 'Rejected',
	[EProposalStatus.PASSED]: 'Passed'
};

export const ProposalStatusBadgeColorVariantMap = {
	[EProposalStatus.PASSED]: EBadgeColorVariant.SUCCESS,
	[EProposalStatus.OPEN]: EBadgeColorVariant.ONGOING,
	[EProposalStatus.FAILED]: EBadgeColorVariant.FAILED,
	[EProposalStatus.REJECTED]: EBadgeColorVariant.REJECTED
};
