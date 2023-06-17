import {
    executeQuery
} from './dataQuery';

//Function for creating users in database
//Users can also be added manually in database
export const createUser = async (request, response) => {
    const {
        firstName,
        lastName,
        email,
        token,
        role
    } = request.body
    const text = 'INSERT INTO users (firstName, lastName, email, token, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [firstName, lastName, email, token, role];

    let results = await executeQuery(text, values);
    response.status(201).send(`User added with ID: ${results[0].id}`);
}