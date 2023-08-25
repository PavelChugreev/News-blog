import { Pipe, PipeTransform } from "@angular/core";
import { IPost } from "../interfaces/interfaces";

@Pipe({
  name: "searchPosts",

})

export class searchPosts implements PipeTransform {
  transform(posts: IPost[], searchVal: string): IPost[] {
    if(!searchVal) {
      return posts.reverse();
    }
    return posts.filter( post => {
      const str = `${post._id} ${post.author} ${post.title} ${post.date} ${post.content}`.toLowerCase();
      return str.includes(searchVal.toLowerCase());
    }).reverse();
  }
}