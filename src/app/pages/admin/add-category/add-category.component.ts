import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  

  category={
    cid:'',
    title:'',
    description:'',
  }

  isUpdate = false;
  categoryId: any;
  name="nitin pednekar";

  constructor(private _category:CategoryService,private _snack:MatSnackBar, private route: ActivatedRoute, private _router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['cid']) {
        this.isUpdate = true;
        this.categoryId = params['cid'];
         this.fetchCategory(this.categoryId);
      }
    });

    // this.categoryId=this.route.snapshot.params['cid']
    // this.fetchCategory(this.categoryId);

  }

  fetchCategory(categoryId: any) {
    this.nameChange(this.name);
    this._category.getCategoryById(categoryId).subscribe(
      (data: any) => {
        this.category.cid=data.cid;
        this.category.title = data.title;
        this.category.description = data.description;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title required !!', '', {
        duration: 3000
      });
      return;
    }

    if (this.isUpdate) {
      // Update category
      this._category.updateCategory(this.category).subscribe(
        (data: any) => {
          Swal.fire('Success!!', 'Category is updated successfully', 'success').then((e)=>{
            this._router.navigate(['/admin/categories']);
          });
        },
        (error) => {
          console.log(error);
          Swal.fire('Error!!', 'Server Error!!', 'error');
        }
      );
    } else {
      // Add category
      this._category.addCategory(this.category).subscribe(
        (data: any) => {
          this.category.title = '';
          this.category.description = '';
          Swal.fire('Success!!', 'Category is added successfully', 'success');
        },
        (error) => {
          console.log(error);
          Swal.fire('Error!!', 'Server Error!!', 'error');
        }
      );
    }
  }

  nameChange(name:string){
    this.name="Hritik"
  }

}
