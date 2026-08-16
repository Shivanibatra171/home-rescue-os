const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

// CORS updated to allow frontend on any port (like 5173 or 5174)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Home Rescue OS API is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/workers', require('./routes/worker.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/reviews', require('./routes/review.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

// Error Handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;