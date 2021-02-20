import { User } from "./user";

export class Message {
    user: User;
    text: string;
    isCorrect: boolean;

    constructor(user: User, text: string) {
        this.user = user;
        this.text = text;
        this.isCorrect = false;
    }
}