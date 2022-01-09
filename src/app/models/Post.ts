export class Post{
  dId?: string;
  author: string;
  tourID: string;
  message: string;
  sendDate: number;

  constructor(author: string, tourID: string, message: string, sendDate: number){
    this.author = author;
    this.tourID = tourID;
    this.message = message;
    this.sendDate = sendDate;
  }
}
