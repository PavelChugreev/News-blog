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
    return this.http.post<IFbPostResponse>(`${env.dbUrl}/posts.json`, post)
      .pipe(map((res: IFbPostResponse) => {
        return {
          ...post,
          id: res.name,
          date: new Date(post.date)
        }
      }))
  }

  getAllPosts (): Observable<IPost[] | null> {
    return this.http.get(`${env.dbUrl}/posts.json`)
    .pipe(
      map((res: {[key: string]: any} | null) => {
        if (!res) {
          return null;
        }
        return Object.keys(res).map((key) => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          })
        )
      })
    )
  }

  getPostById (id: string): Observable<IPost | null> {
    return this.http.get<IPost | null>(`${env.dbUrl}/posts/${id}.json`)
      .pipe(
        map((post): IPost | null => {
          if(!post) {
            return null;
          }
          return {
            ...post,
            id,
            // date: new Date(post.date)
          }
        })
      )
  }

  editPost (post: IPost): Observable<IPost | null> {
    return this.http.patch<IPost | null>(`${env.dbUrl}/posts/${post.id}.json`, post);
  }

  deletePost (id: string): Observable<void> {
    return this.http.delete<void>(`${env.dbUrl}/posts/${id}.json`);
  }
}