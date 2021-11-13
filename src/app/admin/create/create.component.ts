import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces/interfaces';
import { FormService } from 'src/app/shared/services/Form.service';
import { PostService } from 'src/app/shared/services/Post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  submitting: boolean = false;
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required)
  })
  quillStyles = {
    minHeight: "100px",
    maxHeight: "300px",
    overflowY: "scroll"
  }
  
  constructor(
    public formService: FormService,
    private postService: PostService,
    private router: Router
  ) { }

  get titleField () {
    return this.form.get('title');
  }
  get authorField () {
    return this.form.get('author');
  }
  get contentField () {
    return this.form.get('content');
  }

  ngOnInit(): void {
  }

  submit () {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const post: IPost = {
      title: this.titleField?.value,
      author: this.authorField?.value,
      content: this.contentField?.value,
      date: new Date()
    }
    
    this.postService.createPost(post)
      .pipe(
        finalize(() => this.submitting = false)
      )
      .subscribe(() => {
        this.router.navigate(['admin/dashboard'])
      })

  }
}
