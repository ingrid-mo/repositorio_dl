const express = require("express");
const fs = require("fs"); // Agrega esta línea para importar el módulo 'fs'
const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log("¡Servidor encendido en el puerto " + PORT + "!");
});

app.get("/home", (req, res) => {
  res.send("Hello world express.js");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Definir la ruta /canciones y su función de devolución de llamada

app.use(express.json());
app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  // 1
  const cancion = req.body;
  // 2
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  // 3
  canciones.push(cancion);
  // 4
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  // 5
  res.send("cancion agregada con éxito!");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("cancion eliminado con éxito");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("cancion modificado con éxito");
});

const fecha = new Date();

app.get("/fecha", (req, res) => {
  res.send(`${fecha}`);
});
