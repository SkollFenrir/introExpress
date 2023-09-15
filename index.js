const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
const readF = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));

app.use(express.json()); //middleware

app.listen(PORT, console.log(`servidor activo en ${PORT}`));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/canciones', (req, res) => {
	const canciones = readF; //JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
	res.json(canciones);
});

app.post('/canciones', (req, res) => {
	const nuevaCancion = req.body;
	const canciones = readF; //JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
	canciones.push(nuevaCancion);
	fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
	res.send('Cancion agregada con exito');
});

app.put('/canciones/:id', (req, res) => {
	const { id } = req.params;
	const cancion = req.body;
	const canciones = readF; //JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
	const index = canciones.findIndex((c) => c.id == id);
	canciones[index] = cancion;
	fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
	res.send('Cancion modificada con éxito');
});

app.delete('/canciones/:id', (req, res) => {
	const { id } = req.params;
	const canciones = readF; //JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
	const index = canciones.findIndex((c) => c.id == id);
	canciones.splice(index, 1);
	fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
	res.send('Cancion eliminada');
});
