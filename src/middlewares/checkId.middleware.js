export function checkIdMiddleware (req, res, next) {
    console.log("Check id ...");
    let id = req.params.id;
    id = parseInt(id);
    console.log(id);
    
    if (isNaN(id)) {
        return res.status(400).send({ message: "Id must be a number!" });
    }
    next();
};
