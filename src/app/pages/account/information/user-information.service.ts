import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { updatedUserProfile, userChangePassword } from '../../../shared/api/api';

@Injectable({
  providedIn: 'root'
})


export class UserInformationService {

  constructor(private http: HttpClient) { }

  updatedPassword(userPassword) {
    return this.http.put(`${userChangePassword}`, userPassword);
  }

  updatedUserProfile(userInfo) {
    return this.http.put(`${updatedUserProfile}`, userInfo);
  }
}
