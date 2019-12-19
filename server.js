const expres = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    setTimeout(() => {
        res.json({message: `Welcome back, ${req.body.username}`})
    }, 2000);
});

app.listen(4000, () => {
    console.log('Listening on port 4000')
});