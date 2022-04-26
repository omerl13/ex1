const express = require('express')
const Tickets = require('./tickets')
const app = express()
const port = 3000

const tickets = new Tickets();

app.post('/entry', (req, res) => {
    const { plate, parkingLot } = req.query;
    const ticketId = tickets.create(plate, parkingLot);
    res.json({ ticketId });
})

app.post('/exit', (req, res) => {
    const { ticketId } = req.query;
    const ticket = tickets.end(ticketId);
    if (!ticket) {
        res.sendStatus(404);
    } else {
        res.json(ticket);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})