const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const PORT = 80;

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: './public/img/',
    filename: function (req, file, cb) {
        cb(null, 'imgfile' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
});

app.post('/upload', upload.single('img'), function (req, res, next) {
    res.send({
        fileName: req.file.filename,
    });
});

app.get('/', (req, res, next) => {
    setImmediate(() => {
        next(new Error('it is an error'));
    });
    // res.send('안녕하세요.2222');
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error.message || '서버에서 에러가 났습니다.');
});

app.listen(PORT, () => {
    console.log(`${PORT}번에서 실행이 되었습니다.`);
});
