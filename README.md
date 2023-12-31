# parking-slot-booking
Basic parking slot booking CRUD operations in Node based on the roles (admin or standard).
# Frameworks and libraries used
Typescript, Express.js, PostgreSQL
# node modules used
joi, uuid, pg, jsonwebtoken, uuid-validate, express-validation
# Things to be executed before running the application
1. Change the connection information in src/database/databaseConnection.ts file to your local system info
2. Create the table user by running the command '**CREATE TABLE users (ID SERIAL PRIMARY KEY, firstName VARCHAR(30), lastName VARCHAR(30), email VARCHAR(30), token VARCHAR(350), role VARCHAR(30));**' inside your postresql database instance
3. Create the table bookings by running the command '**CREATE TABLE bookings (id VARCHAR(50), createdBy VARCHAR(30), startTime VARCHAR(30), endTime VARCHAR(30), parkingSpot VARCHAR(30), createdAt VARCHAR(30), updatedAt VARCHAR(30));**'
4. Use 'npm run start' command to start the application (It compiles all the typescript files into dist folder and starts the server)
5. PgAdmin can be used for accessing the PostgreSQL databases (It's optional to use)
# Routes
1. /users (for creating users) <br />

   **Request Type** <br />
   POST <br />
   
   **Body** <br />
{ <br />
  "firstName": "test", <br />
  "lastName": "one", <br />
  "email": "test.one@gmail.com", <br />
  "token": "admin-token", <br />
  "role": "admin" <br />
} <br />
3. /bookings (for creating bookings) <br />

   **Request Type** <br />
   POST <br />
   
   **Body** <br />
{ <br />
    "parkingSpot": "A33", <br />
    "startTime": "13:00", <br />
    "endTime": "23:30" <br />
} <br />
4. /bookings (get all the bookings for admin and specific booking for standard) <br />

   **Request Type** <br />
   GET <br />
5. /bookings/:id (get booking with id admin can fetch with any booking id but standard users can fetch only their own booking id) <br />

   **Request Type** <br />
   GET <br />
6. /bookings/:id (edit booking with id admin can edit with any booking id but standard users can edit only their own booking id) <br />

   **Request Type** <br />
   PUT <br />
7. /bookings/:id (delete booking with id admin can delete with any booking id but standard users can delete only their own booking id) <br />

   **Request Type** <br />
   DELETE <br />
# Detailes considered
1. All the reusable codes are written in separate files
2. All the typescript files are compiled to commonJS files usign tsconfig.json
3. Authentication token, Permission level checking are added as Middleware
4. Joi validations are added for all the requests as Middleware to check validation errors on the request object received
5. UUID randomly generated id's
6. Auntentication token decoded to verify user
7. Only two tables are created (users and bookings)
# Cases not implemented but can be considered for future
1. Database connection information should be placed separately and secured
2. Slot availabilty has to be checked to eliminate duplicates
3. Number of slot bookings per user has to be considered
4. Slots can be separated based on the vehicle(2 or 4 wheeler) if available
5. Right to edit slot by the user that has been changed by admin Ex: If admin edits the slot of user A, will user A has right to edit the slot again or not
6. Multiple entries creating, updating and deleting
7. Authentication token refreshing when expired
