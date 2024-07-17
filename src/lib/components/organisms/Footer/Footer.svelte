<script lang="ts">
	import { Divider, Typography } from '$lib/components';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg?url';
	import LogoGitGub from '$lib/assets/logos/logo-github.svg?url';
	import LogoLinkedIn from '$lib/assets/logos/logo-linkedin.svg?url';
	import LogoTwitter from '$lib/assets/logos/logo-twitter.svg?url';
	import { socialUrls, type TSocialType } from '$lib/constants';

	const handleClickSocialIcon = (socialType: TSocialType) => {
		window.open(socialUrls[socialType], '_blank');
	};
</script>

<Divider />
<div class="flex flex-row justify-center items-center h-[72px] py-4 gap-4">
	<img src={LogoFilament} alt="logo-filament-footer" />
	<Typography variant="h5">Filament Zone</Typography>
	<div class="divider-vertical" />
	<div class="flex flex-row gap-4">
		<img
			src={LogoGitGub}
			alt="logo-github"
			class="cursor-pointer"
			on:click={handleClickSocialIcon.bind(null, 'GITHUB')}
			aria-hidden="true"
		/>
		<img
			src={LogoLinkedIn}
			alt="logo-linkedin"
			class="cursor-pointer"
			on:click={handleClickSocialIcon.bind(null, 'LINKEDIN')}
			aria-hidden="true"
		/>
		<img
			src={LogoTwitter}
			alt="logo-twitter"
			class="cursor-pointer"
			on:click={handleClickSocialIcon.bind(null, 'TWITTER')}
			aria-hidden="true"
		/>
	</div>
</div>

<style lang="less">
	.divider-vertical {
		height: 100%;
		box-shadow: 0 0 0 0.3px var(--gray-200);
	}
</style>
