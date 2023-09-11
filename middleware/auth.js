
const auth = (req, res, next) => {
    if(1 === 1){
        console.log('You are logged in');
    }
    else {
        next();
    }

}

module.exports = auth;