const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: Date, required: true },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
