import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetMovieForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  movieForm: FormGroup;
  subjectArray: Subject[] = [];
  GenreArray: any = ['Comedy', 'Action', 'Romance', 'Horror', 'Thriller'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private movieApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.movieForm = this.fb.group({
      movie_name: ['', [Validators.required]],
      release_year: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      subjects: [this.subjectArray],
      famous: ['Yes']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.movieForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.movieForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitMovieForm() {
    if (this.movieForm.valid) {
      this.movieApi.AddMovie(this.movieForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/movies-list'))
      });
    }
  }

}