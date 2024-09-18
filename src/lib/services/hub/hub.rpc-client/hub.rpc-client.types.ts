export interface IHubRpcClient {
	send<T>(method: string, params?: unknown[]): Promise<T>;
}
