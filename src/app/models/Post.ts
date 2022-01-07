export class Post{
  author: string;
  tourID: string;
  message: string;
  sendDate: string;

  constructor(author: string, tourID: string, message: string, sendDate: string){
    this.author = author;
    this.tourID = tourID;
    this.message = message;
    this.sendDate = sendDate;
  }
}
