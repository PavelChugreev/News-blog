import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces/interfaces';
import { PostService } from 'src/app/shared/services/Post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public titles: string[] =  ["#", "Author", "Title", "Date", "Actions"];
  public posts: IPost[] = [];
  private postsSub: Subscription = new Subscription;

  constructor (
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.postsSub = this.postService.getAllPosts()
    .subscribe((posts) => {
      this.posts = posts;
    })
  }

  ngOnDestroy () {
    if(this.postsSub) { 
      this.postsSub.unsubscribe();
    }
  }
}
