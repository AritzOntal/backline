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

app.get('/guitars/:guitarId', async (req, res) => {
    const result = await db('guitars').where({id_guitar: req.params.guitarId});
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

app.get('/rentals', async (req, res) => {
    const result = await db('guitar_rentals').select('*');
    res.status(200).json(result);
})

app.post('/rentals', async (req, res) => {
    await db('guitar_rentals').insert({
        id_client: req.body.id_client,
        id_guitar: req.body.id_guitar,
        date: req.body.date,
        return_date: req.body.return_date
    });

    res.status(201).json({})
});

app.delete('/rentals/:rentalId', async (req, res) => {

    const { rentalId } = req.params;
    await db('guitar_rentals').where({ id_guitar_rental: rentalId }).del();

    res.status(204).send()
});

app.put('/rentals/:rentalId', async(req, res) => {
    await db('guitar_rentals').where({ id_guitar_rental: req.params.rentalId}).update({
        id_client: req.body.id_client,
        id_guitar: req.body.id_guitar,
        date: req.body.date,
        return_date: req.body.return_date
    });

    res.status(204).send();
})


app.listen(8080, () => {
    console.log('backend iniciado en el puerto 8080')
})
