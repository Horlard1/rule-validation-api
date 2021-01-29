function checkData(field, data){
    if(field.includes('.')){
        let newField = field.split('.')
        if (newField.length > 2) return false
        if(typeof data === 'object' && data instanceof Array){
            for(values of data){
                if(newField[0] in values){
                    if(newField[1] in values[newField[0]]){
                        return [true, values[newField[0]][newField[1]], newField[0]]
                    }else{
                        return [newField[1], `.${newField[0]}`]
                    }
                }else{
                    return [newField[0], ``]
                }
            }
        }
        if(typeof data === 'object'){
            if(newField[0] in data){
                if(newField[1] in data[newField[0]]){
                    return [true, data[newField[0]][newField[1]], newField[0]]
                }else{
                    return [newField[1], `.${newField[0]}`]
                }
            }else{
                return [newField[0], ``]
            }
        }
    }
    if(field in data){
        return [true, data[field]]
    }else{
        return [field, '']
    }
     
}


function checkFields(array, obj){
    let confirm = array.every(key => Object.keys(obj).includes(key))
    if (confirm){
        return true
    }else{
        return array.filter(item => !Object.keys(obj).includes(item))
    }
}


function checkValidate(field, condition, condition_value){
    if(!field){
        return false
    }
    let result;
    switch(condition){
        case 'eq':
            result = field === condition_value
            break;
        case 'neq':
            result = field !== condition_value
            break;
        
        case 'gt':
            result = field > condition_value
            break;
        
        case 'gte':
            result = field >= condition_value
            break;
        
        case 'contains':
            result = field.includes(condition_value)
            break;
        default:
            result = [false, 'Enter an accepted condition value']
    }
    return result
}

module.exports = {
    checkData,
    checkFields,
    checkValidate
}