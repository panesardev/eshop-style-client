export interface Payload<T> {
	message?: string;
	timeStamp: string;
	data?: T;
	success: boolean;
}