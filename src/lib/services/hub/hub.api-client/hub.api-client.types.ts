export interface IHubApiClient {
	post<T>(endpoint: string, payload?: unknown): Promise<T>;
	get<T>(endpoint: string): Promise<T>;
}
