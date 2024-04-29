import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Create an instance of express to serve our end points
const app = express();

// Use some middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies

// Define a simple route to get started
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// More routes can be added here

// Export the app for use in other files such as test files or the main server file
export default app;