const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/about', (req, res) => res.send('This is a simple Node.js app.'));

if (require.main === module) {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}

module.exports = app;
