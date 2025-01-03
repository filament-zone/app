import { ethers, type InterfaceAbi } from 'ethers';

export class EthereumApiClient {
	private Provider: ethers.JsonRpcProvider | null = null;

	constructor(private rpcUrl: string) {}

	public async connect() {
		if (!this.Provider) {
			try {
				this.Provider = new ethers.JsonRpcProvider(this.rpcUrl);
				const network = await this.Provider.getNetwork();
				console.log('Connected to network:', network);
			} catch (error) {
				console.error('Failed to initialize provider:', error);
				throw error;
			}
		}
		return this.Provider;
	}

	public disconnect() {
		this.Provider = null;
		console.log('Disconnected from provider');
	}

	public async callContractMethod(
		contractAddress: string,
		abi: InterfaceAbi,
		method: string,
		...args: unknown[]
	) {
		if (!this.Provider) await this.connect();
		const contract = new ethers.Contract(contractAddress, abi, this.Provider);
		return contract[method](...args);
	}
}

const ethereumApiClient = new EthereumApiClient('https://ethereum-sepolia-rpc.publicnode.com');

export { ethereumApiClient };
