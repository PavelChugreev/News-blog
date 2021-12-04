import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces/interfaces';
import { PostService } from 'src/app/shared/services/Post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: IPost[] | null = null;
  pSub: Subscription = new Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAllPosts()
      .subscribe((res) => this.posts = res)
  }

  ngOnDestroy () {
    this.pSub.unsubscribe()
  }

}
