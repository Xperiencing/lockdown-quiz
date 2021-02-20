export class User {
    username: string;
    isHost: boolean;

    constructor(username: string) {
        this.username = username;
        this.isHost = false;
    }
}
