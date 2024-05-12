import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizresultService } from 'src/app/services/quizresult.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  qid: any;
  questions: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  constructor(private loactionSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService, private _quizresult: QuizresultService, private _router:Router) { }




  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  
  }


  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        // this.questions.forEach((q: any)=>{
        //   q['givenAnswers'] = [''];
        // });
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire("Error", "Error in loading question of quiz", 'error');
      }
    )
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.loactionSt.onPopState(() => {
      history.pushState(null, location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
        this._router.navigate(['user-dashboard/0']);
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60)
    let ss = this.timer - mm * 60
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        console.log("correct marks :", this.marksGot);
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
        this.addresult();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  printPage() {
    window.print();
  }

  addresult() {
    const userDataString = localStorage.getItem('user');
    const userId = userDataString ? JSON.parse(userDataString).id : null;
  
    if (!userId) {
      console.log("User data not found in local storage.");
      return;
    }

    const submissionDate = new Date(); 
    const quizResult = {
      id: this.qid, 
      user: { id: userId },
      quiz: { qId: this.qid }, 
      marks: this.marksGot,
      submissionDate: submissionDate 
    };

    this._quizresult.addQuizResult(quizResult).subscribe(
      (response) => {
        console.log("Quiz result added successfully:", response);
      },
      (error) => {
        console.error("Error adding quiz result:", error);
      }
    );
  }
  
  
  

}
