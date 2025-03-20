import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserPhotoResponse } from './models/user.photo.model';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private apiUrl = `${environment.apiUrl}/user`;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService,) { }

    getUserPhoto(userId: number): Observable<UserPhotoResponse> {
        const url = `${this.apiUrl}/photo/${userId}`;

        const token = this.localStorageService.getCurrentUser()?.token

            // Configura o header com o token
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });
            
        return this.http.get<UserPhotoResponse>(url, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Erro na requisição da foto do usuário:', error);
                return throwError(() => error);
            })
        );
    }
}