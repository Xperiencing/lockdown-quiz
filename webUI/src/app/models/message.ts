export class Message {
    user: string;
    text: string;
    isCorrect: boolean;

    constructor(user: string, text: string) {
        this.user = user;
        this.text = text;
        this.isCorrect = false;
    }
}