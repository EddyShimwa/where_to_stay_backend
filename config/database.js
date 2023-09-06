const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: "postgres",
    password: "password",
    port: 5432,
    database: "postgres" 
});

client.connect(); 

client.query('SELECT * FROM users', (err, res) => {
    if (!err) {
        console.log(res.rows);
    }
        else {
        console.log(err.message);

    }
    client.end();
});