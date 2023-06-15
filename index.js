const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return next(err)
    };
    // files contains the uploaded file form property (upfile)
    res.json({
      name: files.upfile.originalFilename,
      type: files.upfile.mimetype,
      size: files.upfile.size,
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
