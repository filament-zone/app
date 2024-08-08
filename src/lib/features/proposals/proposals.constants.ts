import { EBadgeColorVariant } from '$lib/components/atoms/Badge/Badge.enums';
import { EProposalStatus, EProposalType } from '$lib/features/proposals/proposals.enums';

export const ProposalTypeNameMap = {
	[EProposalType.CREATE_STREAM]: 'Create Stream',
	[EProposalType.PARAMETER_CHANGE]: 'Parameter Change'
};

export const ProposalStatusNameMap: Record<EProposalStatus, string> = {
	[EProposalStatus.OPEN]: 'Open',
	[EProposalStatus.FAILED]: 'Failed',
	[EProposalStatus.PASSED]: 'Passed',
	[EProposalStatus.REJECTED]: 'Rejected'
};

export const ProposalStatusBadgeColorVariantMap = {
	[EProposalStatus.OPEN]: EBadgeColorVariant.SECONDARY,
	[EProposalStatus.FAILED]: EBadgeColorVariant.DANGER,
	[EProposalStatus.PASSED]: EBadgeColorVariant.INFO,
	[EProposalStatus.REJECTED]: EBadgeColorVariant.WARNING
};
