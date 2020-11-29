class Ticket{
    constructor(UserID, TicketNumber, DOS, Priority, Status, Description, Type){
        this.UserID = UserID;
        this.TicketNumber = TicketNumber;
        this.DOS = DOS;
        this.Priority = Priority;
        this.Status = Status;
        this.Description = Description;
        this.Type = Type;
    }
}

module.exports = Ticket;