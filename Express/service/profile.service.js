export const profileService = (req, res) => {
    console.log('request body ', req.query.page);
    res.send('Got a POST request');
}