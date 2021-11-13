import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces/interfaces';
import { PostService } from 'src/app/shared/services/Post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public titles: string[] =  ["#", "Author", "Title", "Date", "Actions"];
  public posts: IPost[] | null = null;
  private postsSub: Subscription = new Subscription;
  private delSub: Subscription = new Subscription;
  public searchStr: string = '';
  public loading: {[key: number]: boolean} = {};

  constructor (
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.postsSub = this.postService.getAllPosts()
      .subscribe((posts) => {
        this.posts = posts || [];

        this.loading = this.posts?.reduce((acc, _, i) => {
          acc[i] = false;
          return acc;
        }, {} as any);
      })

  }

  delete (id: string | null = null, idx: number) {
    if(id === null) {
      return;
    }
    this.loading[idx] = true;

    this.delSub = this.postService.deletePost(id)
      .pipe(finalize(() => this.loading[idx] = false))
      .subscribe(() => {
        this.posts = this.posts && this.posts.filter((_, i) => i !== idx);
      })
  }

  ngOnDestroy () {
    if(this.postsSub) { 
      this.postsSub.unsubscribe();
    }
    if(this.delSub) { 
      this.delSub.unsubscribe();
    }
  }
}
