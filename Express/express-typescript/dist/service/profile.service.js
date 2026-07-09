// Simple profile handler — reads query params from the request
export const profileService = (req, res) => {
    console.log("request body ", req.query.page);
    res.send("Got a POST request");
};
