export class ToDoItem {
    text: string;
    isDone: Boolean;
    date?: Date;

    constructor(text: string, isDone: Boolean, date?: Date){
        this.text = text;
        this.isDone = isDone;
        this.date = date;
    }
}