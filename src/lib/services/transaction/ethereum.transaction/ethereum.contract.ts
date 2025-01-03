import { BaseContract, type ContractInterface, ethers, type InterfaceAbi } from 'ethers';
import { WalletClientConnector } from '$lib/services';

export class EthereumContract {
	public readonly contract: BaseContract & Omit<ContractInterface, keyof BaseContract>;

	constructor(scAddress: string, provider: WalletClientConnector, abi: InterfaceAbi) {
		const newProvier = new ethers.JsonRpcProvider(
			'https://ethereum-sepolia-rpc.publicnode.com',
			11155111n
		);
		this.contract = new ethers.Contract(scAddress, abi, newProvier);
	}
}
