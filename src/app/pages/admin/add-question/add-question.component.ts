import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId: any;
  qTitle: any;
  question = {
    quiz: { qId: undefined },
    quesId: 0,
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  isUpdate = false;
  questionId: any;

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;

// -----------------------------------------------------------------------
    this._route.params.subscribe((params) => {
      if (params['quesId']) {
        this.isUpdate = true;
        this.questionId = params['quesId'];
        this.fetchCategory(this.questionId);
      }
    });
  }


  fetchCategory(questionId: any) {
    this._question.getQuestion(questionId).subscribe(
      (data: any) => {
        this.question.quiz=data.quiz;
        this.question.quesId = data.quesId;
        this.question.content = data.content;
        this.question.option1 = data.option1;
        this.question.option2 = data.option2;
        this.question.option3 = data.option3;
        this.question.option4 = data.option4;
        this.question.answer = data.answer;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }



  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    //formsubmit

    if (this.isUpdate) {
      // Update question
      this._question.updateQuestion(this.question).subscribe(
        (data: any) => {
          Swal.fire('Success!!', 'question is updated successfully', 'success').then((e) => {
            this._router.navigate(['admin/quizzes']);
          });
        },  
        (error) => {
          console.log(error);
          Swal.fire('Error!!', 'Server Error!!', 'error');
        }
      );
    } else {
      // Add question
      this._question.addQuestion(this.question).subscribe(
        (data: any) => {
          Swal.fire('Success', 'Question Added', 'success');
          this.question.content = '';
          this.question.option1 = '';
          this.question.option2 = '';
          this.question.option3 = '';
          this.question.option4 = '';
          this.question.answer = '';
        },
        (error) => {
          console.log(error);
          Swal.fire('Error!!', 'Server Error!!', 'error');
        }
      );
    }
  }

}
