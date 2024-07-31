import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile, populateUI } from './auth/spotifyAuth';

const app = express();
const clientId = "the-client-id";

app.use(cors());
app.use(express.json());

app.get('/auth', async (req, res) => {
    const code = req.query.code as string;

    if(!code){
        // Redirect to Spotify Authorization page
        redirectToAuthCodeFlow(clientId);
        res.redirect('spotify-authorization-url'); // Change to actual spotify URL
    } else {
        try {
            const accessToken = await getAccessToken(clientId, code);
            //const profile = await fetchProfile(accessToken);
            //populateUI(profile); // You can replace this with actual data sending
           // res.json(profile); // Send profile as response for now
        } catch (error) {
            res.status(500).send('An error occured');
        }
    }
})

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});