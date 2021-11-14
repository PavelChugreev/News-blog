import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize, Subscription, switchMap } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormService } from 'src/app/shared/services/Form.service';
import { PostService } from 'src/app/shared/services/Post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  public form: FormGroup =new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required)
  })
  private post!: IPost;
  public quillStyles = {
    minHeight: "100px",
    maxHeight: "300px",
    overflowY: "scroll"
  }
  public submitting: boolean = false;
  public loading: boolean = false;
  public order: string = '';
  private editSub: Subscription = new Subscription;

  constructor(
    public formService: FormService,
    private postSrvice: PostService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  get titleField () {
    return this.form.get('title');
  }

  get contentField () {
    return this.form.get('content');
  }

  ngOnInit(): void {
    this.loading = true;

    this.route.queryParams.subscribe((params: Params) => {
      this.order = params['order'];
    })

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postSrvice.getPostById(params['id'])
            .pipe(finalize(() => this.loading = false));
        })
      )
      .subscribe((post: IPost | null) => {
        if (!post) {
          return;
        }
        this.post = post;

        this.titleField?.setValue(post.title);
        this.contentField?.setValue(post.content)
      }) 
  }

  submit () {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.editSub = this.postSrvice.editPost({
      ...this.post,
      title: this.titleField?.value,
      content: this.contentField?.value
    })
    .pipe(
      finalize(() => this.submitting = false)
    )
    .subscribe(() => {
      this.form.reset();
      this.alertService.open('Changes saved successfully');
      this.router.navigate(['/admin/dashboard']);
    })
  }

  ngOnDestroy () {
    if(this.editSub) {
      this.editSub.unsubscribe();
    }
  }

}
