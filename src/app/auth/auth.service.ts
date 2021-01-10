import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { SignUserDto } from '../models/sign-user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public user$: Observable<User>;

  constructor(
		private firestore: AngularFirestore,
		private ngAuth: AngularFireAuth,
		private router: Router
  ) {
		this.user$ = ngAuth.authState.pipe(
			switchMap(user => user ? this.userDoc(user).valueChanges() : of(null))
		);
  }

	async signIn(email: string, password: string): Promise<void> {
		if (email && password) {
			await this.ngAuth.signInWithEmailAndPassword(email, password);
			this.router.navigate(['/home']);
		}
		throw Error('Credentials Required');
	}

	async signUp(dto: SignUserDto): Promise<void> {
		if (dto.displayName && dto.email && dto.password) {
			const credential = await this.ngAuth
        .createUserWithEmailAndPassword(dto.email, dto.password);

			await Promise.all([
				credential.user.updateProfile({ displayName: dto.displayName }),
				this.updateUser(credential.user),
				this.router.navigate(['/home'])
			]);
		}
		throw Error('Insufficient Information to create Account');
  }

	async googleSignIn(): Promise<void> {
		this.oAuthSignIn(new auth.GoogleAuthProvider());
	}

	async facebookSignIn(): Promise<void> {
		this.oAuthSignIn(new auth.FacebookAuthProvider());
	}

	private async oAuthSignIn(provider: any): Promise<void> {
		const credential = await this.ngAuth.signInWithPopup(provider);
		if (credential.additionalUserInfo.isNewUser) {
			this.updateUser(credential.user);
		}
		this.router.navigate(['/home']);
  }

	async updateUser(user: any, address?: string, phoneNumber?: string): Promise<void> {
		const userRef = this.userDoc(user);

		const userPayload: User = {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
			address: '',
			phoneNumber: '',
			isAdmin: false
		};

		if (address) userPayload.address = address;
		if (phoneNumber) userPayload.phoneNumber = phoneNumber;

		await userRef.set(userPayload, { merge: true });
	}

	async logout(): Promise<void> {
		this.ngAuth.signOut();
		this.router.navigate(['/auth/login']);
	}
	
	userDoc(user: User): AngularFirestoreDocument<User> {
		return this.firestore.doc(`users/${user.uid}`);
	}

}
