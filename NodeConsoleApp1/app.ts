import express from 'express';
import fs from 'fs';
import csv from 'csv-parser';

const app = express();
const port = 3000;
const data: any[] = [];

fs.createReadStream('updated_mock_data.csv')
    .pipe(csv())
    .on('data', (row) => {
        data.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully loaded.');
    });

app.get('/api/data', (req: any, res: { json: (arg0: any[]) => void; }) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
