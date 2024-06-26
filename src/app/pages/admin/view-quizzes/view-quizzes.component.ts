import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  shdata : any;
  quizzes = [
    {
      qId: '',
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',
      category: {
        title:''
      }
    }
  ]
  constructor(private _quiz: QuizService) {
  }
  ngOnInit() {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', "Error in loading data !", 'error');
      }
    );
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: "Are you sure ?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error while deleting quiz', 'error');
          });
      }
    })
  }
}
