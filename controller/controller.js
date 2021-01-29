const { checkFields, checkData, checkValidate } = require('../middlewares/functions');
const { validate, noValidate } = require('../middlewares/validate');
const ErrorResponse = require('../utilities/Error')
const fs = require('fs');


const sendData = (req, res)=>{
    const posts = JSON.parse(fs.readFileSync(`${__dirname}/../.data/data.json`, 'utf-8'));
    res.status(200).json(posts)
}


const validateRule = (req, res, next)=>{
    try {
        if (req.headers['content-type'] === 'application/json'){
            const { rule, data } = req.body;
            if(rule ){
                if(typeof rule === 'object'){
                    let confirm = checkFields(['field', 'condition', 'condition_value'], rule)
                    if(confirm === true){
                        const { field, condition, condition_value } = rule
                        if(!data){
                            return next(new ErrorResponse("data field is required.", 400))
                        }
                        if(typeof data !== 'object' && typeof data !== 'string') {
                            return next(new ErrorResponse("data should be a JSON, an object, or a string.", 400))
                        }
                        if (typeof data === 'object'){
                            let confirmData = checkData(field, data);
                            if(confirmData[0] === true){
                                let result = checkValidate(confirmData[1], condition, condition_value)
                                if(result === true){
                                    validate(field, confirmData[1], condition, condition_value, 200, res)
                                }else if(result.length){
                                    return next(new ErrorResponse(`${result[1]}`, 400))
                                }
                                else{
                                    noValidate(field, confirmData[1], condition, condition_value, 400, res)
                                }
                            }else if(confirmData === false){
                                return next(new ErrorResponse(`field values should not be more than two levels.`, 400))
                            }
                            else{
                                return next(new ErrorResponse(`field ${confirmData[0]} is missing from data${confirmData[1]}.`, 400))
                            }
                        }else{
                            noValidate(field, field, condition, condition_value, 400, res)
                        }
                    }else{
                        return next(new ErrorResponse(`${confirm[0]} is required.`, 400))
                    }

                }else{
                   return next(new ErrorResponse("rule should be an object.", 400))
                }
            }else{
                return next(new ErrorResponse("rule field is required.", 400))
            }
        }else{
            return next(new ErrorResponse("Invalid JSON payload passed.", 400))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    validateRule,
    sendData
}