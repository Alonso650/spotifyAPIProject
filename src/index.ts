import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile, populateUI } from './auth/spotifyAuth';

dotenv.config();
//require("dotenv").config({ path: './.env'});

const app = express();
// Assert that it is a string
const clientId = process.env.SPOTIFY_CLIENT_ID as string;
//const params = new URLSearchParams(window.location.search);
// const code = params.get("code");
app.use(cors());
app.use(express.json());

if(!clientId){
    throw new Error("Spotify Client ID is not set in enviornment variables")
}

app.get('/auth', async (req, res) => {
    const code = req.query.code as string;

    if(!code){
        // Redirect to Spotify Authorization page
        //redirectToAuthCodeFlow(clientId);
        //res.redirect('spotify-authorization-url'); // Change to actual spotify URL
        redirectToAuthCodeFlow(clientId);
    } else {
        try {
            const accessToken = await getAccessToken(clientId, code);
            const profile = await fetchProfile(accessToken);
            populateUI(profile); // You can replace this with actual data sending
            res.json(profile); // Send profile as response for now
            console.log(profile); // Profile data logs to console
        } catch (error) {
            res.status(500).send('An error occured');
        }
    }
})

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});