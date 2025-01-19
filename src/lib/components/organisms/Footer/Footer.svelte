<script lang="ts">
	import { Typography } from '$lib/components';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg?url';
	import LogoGitGub from '$lib/assets/logos/logo-github.svg?url';
	import LogoLinkedIn from '$lib/assets/logos/logo-linkedin.svg?url';
	import LogoTwitter from '$lib/assets/logos/logo-twitter.svg?url';
	import { socialUrls, type TSocialType } from '$lib/constants';

	const handleClickSocialIcon = (socialType: TSocialType) => {
		if (socialType === 'FILAMENT') {
			window.open('https://filament.zone', '_blank');
		} else {
			window.open(socialUrls[socialType], '_blank');
		}
	};
</script>

<div class="flex w-full flex-col justify-center max-w-[1440px]">
	<div class="relative flex flex-row justify-between items-center h-[72px] p-4 opacity-50">
		<div class="flex flex-row gap-4">
			<img
				src={LogoFilament}
				alt="logo-filament-footer"
				class="w-[26px] cursor-pointer"
				on:click={handleClickSocialIcon.bind(null, 'FILAMENT')}
				aria-hidden="true"
				style="height: 26px"
			/>
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
		<div class="relative">
			<Typography variant="h5">Airdrops that work, powered by Filament</Typography>
		</div>
	</div>
</div>
