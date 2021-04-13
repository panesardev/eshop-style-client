export interface User {
	uid?: string;
	displayName?: string;
	email?: string;
	photoURL?: string;
	
	phoneNumber?: string;
	address?: string;
	isAdmin?: boolean;
}

export class SignupUser {
	displayName: string;
	email: string;
	password: string;
}

export class UserData {
	phoneNumber?: string;
	address?: string;
}