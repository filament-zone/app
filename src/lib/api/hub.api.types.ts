export interface IBaseResponse<T> {
	data: T | undefined;
	meta?: object | undefined;
	error?: {
		status: number;
		message: string;
	};
}

export type TErrorHandler<T> = (statusCode: number) => T | void;
