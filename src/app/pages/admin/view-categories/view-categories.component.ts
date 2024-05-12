import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: {
    cid: any; title: string, description: string
  }[] = [];

  // categories=[{
  //   cId:'',
  //   title:'',
  //   description:'',
  // }]
  constructor(public _category: CategoryService, private _snack: MatSnackBar, private _router: Router) {
  }
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }


  deleteCategory(cid: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you Sure, want to delete this category',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this._category.deleteCategory(cid).subscribe(
            (data) => {
              this._snack.open('Category Deleted', '', {
                duration: 3000,
              });
              this.categories = this.categories.filter((c) => c.cid != cid)
            },
            (error) => {
              this._snack.open('Error in deleting category', '', {
                duration: 3000,
              })
            });
        }
      } 
    )
  }

}
