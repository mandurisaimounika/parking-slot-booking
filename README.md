# parking-slot-booking
Basic parking slot booking CRUD operations in Node based on the roles (admin or standard).
# Frameworks and libraries used
Express.js, PostgreSQL
# node modules used
joi, uuid, pg, jsonwebtoken, uuid-validate, express-validation
# Detailes considered
1. All the reusable codes are written in separate files
2. Authentication token, Permission level checking are added as Middleware
3. Joi validations are added for all the requests as Middleware to check validation errors on the request object received
4. UUID randomly generated id's
5. Auntentication token decoded to verify user
6. Only two tables are created (users and bookings)
# Cases not implemented but can be considered for future
1. Database connection information should be placed separately and secured
2. Slot availabilty has to be checked to eliminate duplicates
3. Number of slot bookings per user has to be considered
4. Slots can be separated based on the vehicle(2 or 4 wheeler) if available
5. Right to edit slot by the user that has been changed by admin Ex: If admin edits the slot of user A, will user A has right to edit the slot again or not
6. Multiple entries creating, updating and deleting
7. Authentication token refreshing when expired
