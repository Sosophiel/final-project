import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';
import user_routes from './routes/Users.js'
import event_routes from './routes/Events.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended:true }));
//app.use(cors());
app.use(bodyParser.json());
//app.use(cookieParser);

app.use('/api/users', user_routes)
app.use('/api/events', event_routes)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {

    const root = path.join(__dirname, '../client', 'build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    })
}