
const fs = require('fs');
const path = require('path');

const getStaticTrainData = (req, res) => {
    const filePath = path.resolve(__dirname, '../JSON/train.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading train.json:', err);
            return res.status(500).json({ error: 'Failed to read data' });
        }

        try {
            const trainData = JSON.parse(data);
            res.json(trainData);
        } catch (parseError) {
            console.error('Error parsing train.json:', parseError);
            res.status(500).json({ error: 'Failed to parse data' });
        }
    });
};

module.exports = {
    getStaticTrainData,
};
