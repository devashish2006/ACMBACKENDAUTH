const Event = require('../model/event.model');

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get an event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, imageUrl, date } = req.body;
    const newEvent = new Event({
      title,
      description,
      imageUrl,
      date: new Date(date),
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Update an existing event
const updateEvent = async (req, res) => {
  try {
    const { title, description, imageUrl, date } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, date: new Date(date) },
      { new: true }
    );
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (deletedEvent) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
