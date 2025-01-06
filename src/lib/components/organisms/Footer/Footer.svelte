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
<div class="relative flex flex-row justify-between items-center h-[72px] p-4 opacity-50">
	<div>
		<img src={LogoFilament} alt="logo-filament-footer" />
	</div>
	<div class="absolute left-1/2 transform -translate-x-1/2">
		<Typography variant="h5">Airdrops that work, powered by Filament.</Typography>
	</div>
	<div class="flex flex-row gap-4">
		<img
			src={LogoGitGub}
			alt="logo-github"
			class="cursor-pointer"
			on:click={handleClickSocialIcon.bind(null, 'GITHUB')}
			aria-hidden="true"
			style="height: 26px"
		/>
		<img
			src={LogoLinkedIn}
			alt="logo-linkedin"
			class="cursor-pointer"
			on:click={handleClickSocialIcon.bind(null, 'LINKEDIN')}
			aria-hidden="true"
			style="height: 26px"
		/>
		<img
			src={LogoTwitter}
			alt="logo-twitter"
			class="cursor-pointer"
			on:click={handleClickSocialIcon.bind(null, 'TWITTER')}
			aria-hidden="true"
			style="height: 26px"
		/>
	</div>
</div>
