module.exports = class Tickets {
    #tickets = {};
    #lastId = 0;
    #chargePer15Min = 10;

    end(ticketId) {
        const ticket = this.#tickets[ticketId];
        if (!ticket) return null;

        delete this.#tickets[ticketId];
        return {
            plate: ticket.plate,
            durationMinutes: this.#calculateDuration(ticket),
            charge: this.#calculateCharge(ticket)
        }
    }

    create(plate, parkingLot) {
        const id = this.#generateId();
        const startTime = Date.now();
        this.#tickets[id] = { plate, parkingLot, startTime }

        return id;
    }

    #generateId() {
        return ++this.#lastId;
    }

    #calculateDuration(ticket) {
        return parseInt((Date.now() - ticket.startTime) / 60 / 1000);
    }

    #calculateCharge(ticket) {
        const durationMin = this.#calculateDuration(ticket);
        return this.#chargePer15Min * parseInt(durationMin / 15)
    }
}