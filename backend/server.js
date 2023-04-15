const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World!');
});

const PORT = process.env.PORT || 3001; // set the port for the server to listen on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
