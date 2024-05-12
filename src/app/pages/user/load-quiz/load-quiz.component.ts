import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  email:any;
  catId: any;
  quizzes: any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _loginService:LoginService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        this._quiz.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            alert("Error in loading all quizzes");
          }
        )
      } else {
        console.log('Load specific quiz');

        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes=data;
          },
          (error)=>{
            alert('Error in loading data');
          }
        )
      }
    })
   
  }

}
