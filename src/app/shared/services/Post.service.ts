import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { IFbPostResponse, IPost } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(
    private http: HttpClient
  ){}

  createPost (post: IPost): Observable<{[key: string]: any}> {
    return this.http.post<IFbPostResponse>(`${env.baseUrl}/api/posts/create`, post)
  }

  getAllPosts (): Observable<IPost[]> {
    return this.http.get<{posts: IPost[]}>(`${env.baseUrl}/api/posts`)
    .pipe(
      map((res) =>  res.posts)
    )
  }

  getPostById (id: string): Observable<IPost | null> {
    return this.http.get<{post: IPost | null}>(`${env.baseUrl}/api/posts/${id}`)
      .pipe(
        map((res): IPost | null => res.post)
      )
  }

  editPost (post: IPost): Observable<IPost | null> {
    return this.http.patch<IPost | null>(`${env.baseUrl}/api/posts/edit/${post._id}`, post);
  }

  deletePost (id: string): Observable<void> {
    return this.http.delete<void>(`${env.baseUrl}/api/posts/delete/${id}`);
  }
}