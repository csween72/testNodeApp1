"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const app = (0, express_1.default)();
const port = 3000;
const data = [];
fs_1.default.createReadStream('updated_mock_data.csv')
    .pipe((0, csv_parser_1.default)())
    .on('data', (row) => {
        data.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully loaded.');
    });

app.get('/', (req, res) => {
    res.send(`
        <style>
            body {
                margin: 0;
                overflow: hidden;
                background-color: black;
            }
        </style>
        <div id="animation-container" style="
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        ">
            <a href="/api/data" id="animated-link" style="
                text-decoration: underline;
                font-size: 48px;
                position: absolute;
            ">
                Click here to go to /api/data
            </a>
        </div>
        <script>
            const container = document.getElementById('animation-container');
            const link = document.getElementById('animated-link');

            let x = Math.floor(Math.random() * (container.clientWidth - link.clientWidth));
            let y = Math.floor(Math.random() * (container.clientHeight - link.clientHeight));
            let xDirection = 1;
            let yDirection = 1;

            function getRandomColor() {
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

            function animateLink() {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;

                x += 2 * xDirection; // Adjust the movement speed here
                y += 2 * yDirection;

                if (x + link.clientWidth > containerWidth || x < 0) {
                    xDirection *= -1;
                    x = Math.max(0, Math.min(containerWidth - link.clientWidth, x));
                    link.style.color = getRandomColor(); // Change color on collision
                }

                if (y + link.clientHeight > containerHeight || y < 0) {
                    yDirection *= -1;
                    y = Math.max(0, Math.min(containerHeight - link.clientHeight, y));
                    link.style.color = getRandomColor(); // Change color on collision
                }

                link.style.left = x + 'px';
                link.style.top = y + 'px';

                requestAnimationFrame(animateLink);
            }

            animateLink();
        </script>
    `);
});

app.get('/api/data', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
