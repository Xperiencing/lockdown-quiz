export class User {
    username: string;
    isHost: boolean;

    
    constructor(username: string, isHost: boolean) {
        this.username = username;
        this.isHost = isHost;
    }
}
