export interface Product {
	id?: string;
	name: string;
	pictureURL: string;
	price: number;
	reviews?: Review[];
	description: string;
	collectionName: string;
}

export interface Review {
	id?: string;
	name: string;
	timeStamp: string;
	content: string;
}	
