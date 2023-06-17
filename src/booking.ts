import * as express from 'express';
import {
  ExtendedRequest
} from './userInterface';
import {
  getUUID,
  isValidUUID
} from './getUuid';
import authenticateToken from './authentication';
import checkPermission from './checkPermissions';
import {
  bookingsByIdValidationMiddleware
} from './joi-validation/joi-get-booking-by-id';
import {
  bookingsByIdAndSpoitValidationMiddleware
} from './joi-validation/joi-put-booking-by-id';
import {
  createBookingsValidationMiddleware
} from './joi-validation/joi-post-new-booking';
import {
  executeQuery,
  dataQueryWithId
} from './database/dataQuery';

const route = express.Router();

// Get all bookings for admin users and get only specific bookings for standard users
route.get('/bookings', authenticateToken, checkPermission, async (req: ExtendedRequest, res) => {
  if (req.user.role === 'admin') {
    const text = 'SELECT * FROM bookings';
    const results = await executeQuery(text);

    res.status(200).json(results);
  } else if (req.user.role === 'standard') {
    const text = 'SELECT * FROM bookings WHERE createdby = $1';
    const values = [req.user.firstname];
    const userBookings = await executeQuery(text, values);

    res.status(200).json(userBookings);
  }
});

// Get a specific booking based on user access
route.get('/bookings/:id', authenticateToken, checkPermission, bookingsByIdValidationMiddleware(), async (req: ExtendedRequest, res) => {
  const {
    id
  } = req.params;
  const booking = await dataQueryWithId(id);

  if (booking[0] && isValidUUID(id)) {
    if (req.user.role === 'admin' || booking[0].createdby === req.user.firstname) {

      res.json(booking);
    } else {
      res.status(403).json({
        error: 'Unauthorized access'
      });
    }
  } else {
    res.status(404).json({
      error: 'Booking not found or Invalid UUID'
    });
  }

});

// Create a new booking
route.post('/bookings', authenticateToken, checkPermission, createBookingsValidationMiddleware(), async (req: ExtendedRequest, res) => {
  const {
    parkingSpot,
    startTime,
    endTime
  } = req.body;
  const values = [
    getUUID(),
    `${req.user.firstname}`,
    startTime,
    endTime,
    parkingSpot,
    new Date(Date.now()).toLocaleString()
  ];

  const text = 'INSERT INTO bookings (id, createdby, starttime, endtime, parkingspot, createdat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const results = await executeQuery(text, values);

  res.status(201).send(`User added with ID: ${results[0].id}`);

});

// Update an existing booking based on user access
route.put('/bookings/:id', authenticateToken, checkPermission, bookingsByIdAndSpoitValidationMiddleware(), async (req: ExtendedRequest, res) => {
  const {
    id
  } = req.params;
  const {
    parkingSpot
  } = req.body;

  const booking = await dataQueryWithId(id);

  if (booking[0] && isValidUUID(id)) {
    if (req.user.role === 'admin' || booking[0].createdby === `${req.user.firstname}`) {
      const text = 'UPDATE bookings SET parkingspot = $1, updatedat = $2 WHERE id = $3 RETURNING *';
      const values = [parkingSpot, new Date(Date.now()).toLocaleString(), id];
      const results = await executeQuery(text, values);

      res.status(200).send(`User modified with ID: ${results[0].id}`)
    } else {
      res.status(403).json({
        error: 'Unauthorized access'
      });
    }
  } else {
    res.status(404).json({
      error: 'Booking not found or Invalid UUID'
    });
  }
});

// Delete a booking based on user access
route.delete('/bookings/:id', authenticateToken, checkPermission, bookingsByIdValidationMiddleware(), async (req: ExtendedRequest, res) => {
  const {
    id
  } = req.params;

  const booking = await dataQueryWithId(id);

  if (booking[0] && isValidUUID(id)) {
    if (req.user.role === 'admin' || booking[0].createdby === `${req.user.firstname}`) {
      const text = 'DELETE FROM bookings WHERE id = $1 RETURNING *';
      const results = await executeQuery(text, [id]);

      res.status(200).send(`User deleted: ${results[0].id}`)
    } else {
      res.status(403).json({
        error: 'Unauthorized access'
      });
    }
  } else {
    res.status(404).json({
      error: 'Booking not found or Invalid UUID'
    });
  }
});

export default route;