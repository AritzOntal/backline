const express = require('express');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'backline.db'
    },
    useNullAsDefault: true
});

const app = express();
app.use(cors());
app.use(express.json());

//CRUD GUITARRAS

app.get('/guitars', async (req, res) => {
    const result = await db('guitars').select('*');
    res.status(200).json(result);
})

app.post('/guitars', async (req, res) => {
    await db('guitars').insert({
        model: req.body.model,
        year: req.body.year,
        condition: req.body.condition
    });

    res.status(201).json({})
});

app.delete('/guitars/:guitarId', async (req, res) => {

    const { guitarId } = req.params;
    await db('guitars').where({ id_guitar: guitarId }).del();

    res.status(204).send()
});

app.put('/guitars/:guitarId', async(req, res) => {
    await db('guitars').where({ id_guitar: req.params.guitarId}).update({
    model: req.body.model,
    year: req.body.year,
    condition: req.body.condition
    });

    res.status(204).send();
})

//CRUD ALQUILERES



app.listen(8080, () => {
    console.log('backend iniciado en el puerto 8080')
})
