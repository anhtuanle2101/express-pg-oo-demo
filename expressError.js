class ExpressError extends Error{
    constructor(msg, status){
        this.msg = msg;
        this.status = status;

    }
}

module.exports = ExpressError;