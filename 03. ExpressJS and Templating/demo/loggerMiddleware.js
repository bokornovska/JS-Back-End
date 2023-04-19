module.exports = (req,res,next) => {
    console.log(`Requester url: ${req.url} with method: ${req.method}`);
    next();
}