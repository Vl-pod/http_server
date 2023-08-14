let tickets = require("../model/tickets");
const countObj = require("../model/count");
const ApiError = require("../error/ApiError");

class ticketController {

    async getAll(req, res) {
        const ticket = JSON.parse(JSON.stringify(tickets));
        for (let item of ticket) {
            delete item.description;
        }
        return res.json(ticket);
    }

    async getInfoId(req, res, next) {
        try {

            const id = req.params.id;
            const ticket = tickets.find(element => element.id === Number(id));
            return res.json(ticket?.description);
        } catch(e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async create(req, res, next) {
        const date = new Date().toLocaleDateString();
        try {
            const {name, description} = req.body;
            const task = {
                id: countObj.count++,
                name,
                status: false,
                description,
                created: date
            }
            tickets.push(task);
            return res.json(task)
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
           const ticketsFiltr = tickets.filter(element => element.id !== Number(id));
           tickets = ticketsFiltr
            return res.json(tickets);
        } catch (e) {
            return next(ApiError.badRequest(e.message));

        }
    }

    async edit(req, res, next) {
        const date = new Date().toLocaleDateString();
        const id = req.params.id;
        const {name, description} = req.body;
        const { status } = req.body;
        try {
            if(name || description) {
                const result = tickets.map(item => {
                    if (item.id !== Number(id)) {
                        return item;
                    }
                    
                    item.name = name;
                    item.description = description;
                    item.created = date;
                    return item;
                });
                tickets = result
                return res.json(tickets)
            }
                const result = tickets.map(item => {
                    if (item.id !== Number(id)) {
                        return item;
                    }
                    
                    item.status = status
                    return item;
                });
                tickets = result
                return res.json(tickets)
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ticketController();
