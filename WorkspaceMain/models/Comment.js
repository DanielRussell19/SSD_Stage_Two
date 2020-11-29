const User = require("./User");

class Comment{
    constructor(UserID, TicketID, DOS, Content){
        this.UserID = UserID;
        this.TicketID = TicketID;
        this.DOS = DOS;
        this.Content = Content;
    }
}

module.exports = Comment;