const express = require('express');
const errorHandler = require('./middlewares/error')
const ErrorResponse = require('./utilities/Error')





const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.get('/', (req, res)=>{
    res.status(200).json({
        "message": "My Rule-Validation API",
        "status": "success",
        "data": {
        "name": "Omotuyole Olawale Olamide",
        "github": "@horlard1",
        "email": "horlarmihdeh@gmail.com",
        "mobile": "08146986488",
        "twitter": "@horlard"
        }
    })
})

app.post('/validate-rule', (req, res, next)=>{
    try {
        if (req.headers['content-type'] === 'application/json'){
            const { rule, data } = req.body;
            if(rule || data){
                if(typeof rule === 'object'){
                    
                    let confirm = checkFields(['field', 'condition', 'condition_value'], rule)
                    if(confirm === true){
                        const { field } = rule
                        let confirmData = checkData(field, data)
                        if(confirmData === true){
                            
                        }else if(confirmData === false){
                            return next(new ErrorResponse(`field values should not be more than two levels`, 400))
                        }
                        else{
                            return next(new ErrorResponse(`field '${confirmData[0]}' is missing from data${confirmData[1]}.`, 400))
                        }
                    }else{
                        return next(new ErrorResponse(`${confirm[0]} is required.`, 400))
                    }

                }else{
                   return next(new ErrorResponse("Rule field must be a valid object", 400))
                }
            }else{
                return next(new ErrorResponse("Rule field is required.", 400))
            }
        }else{
            return next(new ErrorResponse("Invalid JSON payload passed.", 400))
        }
    } catch (error) {
        next(error)
    }
    
})

function checkFields(array, obj){
    let confirm = array.every(key => Object.keys(obj).includes(key))
    if (confirm){
        return true
    }else{
        return array.filter(item => !Object.keys(obj).includes(item))
    }
}

function checkData(field, data){
    if(field.includes('.')){
        let newField = field.split('.')
        if (newField.length > 2) return false
        if(newField[0] in data){
            if(newField[1] in data[newField[0]]){
                return true
            }else{
                return [newField[1], `.${newField[0]}`]
            }
        }else{
            return [newField[0], ``]
        }
    }
    if(field in data){
        console.log(typeof field)
        return true
    }else{
        return [field, '']
    }
     
}



app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})