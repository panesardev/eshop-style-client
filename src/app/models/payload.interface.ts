export interface Payload<T> {
	message?: string;
	timeStamp: string;
	data?: T | undefined | null;
	success: boolean;
}