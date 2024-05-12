import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizresultService {

  constructor(private _http:HttpClient) { }


  public addQuizResult(QuizResult:any){
    return this._http.post(`${baseUrl}/quizresult/`,QuizResult);
  }


  public getAllResults(){
    return this._http.get(`${baseUrl}/quizresult/`);
  }
}
