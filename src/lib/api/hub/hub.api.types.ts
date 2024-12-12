export interface IBaseResponse<T> {
	data: T;
	meta: object;
}

export type TErrorHandler<T> = (statusCode: number) => T | void;
