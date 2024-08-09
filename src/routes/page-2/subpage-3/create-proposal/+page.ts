import type { IInputTokenFieldProps } from '$lib/types';
import FilamentLogo from '$lib/assets/logos/logo-filament.svg?component';

export async function load() {
	const inputTokenFieldData: IInputTokenFieldProps = {
		onChange: (val) => {
			console.log(val.target.value);
		},
		tokenProps: {
			tokenIcon: FilamentLogo,
			tokenTicker: 'FILA'
		}
	};
	return {
		inputTokenFieldData
	};
}
