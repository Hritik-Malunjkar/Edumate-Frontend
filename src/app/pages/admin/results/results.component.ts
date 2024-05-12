import { Component, OnInit } from '@angular/core';
import { Column, FieldType, Formatters, GridOption } from 'angular-slickgrid';
import { QuizresultService } from 'src/app/services/quizresult.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {

  

  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];

  constructor(private _quizresult: QuizresultService){
    this.prepareGrid();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  prepareGrid() {
    this._quizresult.getAllResults().subscribe(
      (data:any) => {
        console.log(data);
        this.dataset = data.map((item: { id: any; marks: any; submissionDate:any; quiz: { id: any; title: any; }; user: { id: any; username: any; }; }) => ({
          id: item.id,
          submissionDate:item.submissionDate,
          marks: item.marks,
          quizId: item.quiz.id,
          quizTitle: item.quiz.title,
          userId: item.user.id,
          username: item.user.username,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
    this.columnDefinitions = [
      { id: 'username', name: 'Username', field: 'username', filterable: true, sortable: true, type: FieldType.string },
      { id: 'quizTitle', name: 'Quiz Title', field: 'quizTitle', filterable: true, sortable: true, type: FieldType.string },
      { id: 'marks', name: 'Marks', field: 'marks', filterable: true, sortable: true, type: FieldType.number },
      { id: 'submissionDate', name: 'SubmissionDate', field: 'submissionDate', filterable: true, sortable: true, type: FieldType.number },
    ];
    
      this.gridOptions = {
      enableAutoResize: true,
      enableFiltering: true,
      enableSorting: true,
      gridHeight: 300,
      gridWidth: 1200,  
    };
  }

}
