import express, {Request , Response} from 'express';
import { createUser, getUsers, updateUser, deleteUser } from './services/userService';
import userRoutes from './routes/userRoutes';
import merchantRoutes from './routes/bookRoutes';

const cors = require('cors');

const app = express();
const port = process.env.PORT ; //

app.use(cors());
app.use(express.json());


app.get('/test',(req: Request,res: Response)=>{ 
    res.send("Tested Successfully !")

})

app.use('/api/users', userRoutes);
app.use('/api/merchants', merchantRoutes);



app.listen(port, ()=> {
    console.log(` Hii we are comfortable in NodeJS `);

})


