import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces/interfaces';
import { PostService } from 'src/app/shared/services/Post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$!: Observable<IPost | null>

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(switchMap((params) => {
        return this.postService.getPostById(params['id'])
      }))
  }
}
