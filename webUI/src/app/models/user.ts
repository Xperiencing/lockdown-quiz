export class User {
    id: string;
    username: string;
    score: number;
    isHost: boolean;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
        this.score = 0;
        this.isHost = false;
    }
}

