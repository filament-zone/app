import { EBadgeColorVariant } from '$lib/components/atoms/Badge/Badge.enums';
import { EProposalStatus, EProposalType } from '$lib/features/proposals/proposals.enums';

export const ProposalTypeNameMap = {
	[EProposalType.CREATE_STREAM]: 'Create Stream',
	[EProposalType.PARAMETER_CHANGE]: 'Parameter Change'
};

export const ProposalStatusNameMap: Record<EProposalStatus, string> = {
	[EProposalStatus.OPEN]: 'Opened',
	[EProposalStatus.FAILED]: 'Failed',
	[EProposalStatus.REJECTED]: 'Rejected'
};

export const ProposalStatusBadgeColorVariantMap = {
	[EProposalStatus.OPEN]: EBadgeColorVariant.SUCCESS,
	[EProposalStatus.FAILED]: EBadgeColorVariant.FAILED,
	[EProposalStatus.REJECTED]: EBadgeColorVariant.REJECTED
};
