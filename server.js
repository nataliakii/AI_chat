const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.API_KEY });

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/chat', async (req, res) => {
	try
	{
		console.log('Request Body:', req.body);
		const userQuery = req.body.message || ''; 
		console.log('User Query:', userQuery);
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `I'm looking for a Software engineer job! ${userQuery}`,
				},
			],
			model: process.env.FT_MODEL_ID,
		});

		res.send(completion.choices[0]); // Send the response back to the client
	} catch (error) {
		console.error(error);
		res.status(500).send('Error processing your request');
	}
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
