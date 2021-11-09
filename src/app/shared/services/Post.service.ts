import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
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

  getAllPosts (): Observable<IPost[]> {
    return this.http.get(`${env.dbUrl}/posts.json`)
    .pipe(
      map((res: {[key: string]: any}) => {
        return Object.keys(res).map((key) => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          })
        )
      })
    )
  }
}