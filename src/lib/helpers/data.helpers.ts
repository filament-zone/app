export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
	let binaryString = '';
	for (let i = 0; i < uint8Array.length; i++) {
		binaryString += String.fromCharCode(uint8Array[i]);
	}
	return btoa(binaryString);
};

export const stringToUint8Array = (str: string) => {
	const encoder = new TextEncoder();
	return encoder.encode(str);
};
