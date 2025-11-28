import express from 'express';
import connectDB from './db.js';


connectDB();

const app = express();
const port = 5050;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})