const events = require('express').Router();
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize')

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (e) {
        res.status(500).json(e)
    }
})



// GET AN EVENT
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch(e) {
        res.status(500).json(e)
    }
})

//CREATE EVENT
events.post('/', async (req, res) =>{
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json(newEvent)
    }catch(e) {
        res.status(500).json(e)
    }
})

// UPDATE AN EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Updated ${updatedEvents} events(s)`
        })
    } catch(e) {
        res.status(500).json(e)
    }
})

// DELETE EVENT
events.delete('/:id', async (req, res) => {
	try {
		const deletedEvents = await Event.destroy({
			where: { event_id: req.params.id },
		});
		res.status(200).json({
			message: `Deleted ${deletedEvents} event(s)`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = events;