const validate = (field, field_value, condition, condition_value, statusCode, res)=>{
  res.status(statusCode).json({
      "message": `field ${field} successfully validated.`,
      "status": "success",
      "data": {
        "validation": {
          "error": false,
          field,
          field_value,
          condition,
          condition_value
        }
      }
    })
}

const noValidate = (field, field_value, condition, condition_value, statusCode, res)=>{
  res.status(statusCode).json({
    "message": `field ${field} failed validation.`,
    "status": "error",
    "data": {
      "validation": {
        "error": true,
        field,
        field_value,
        condition,
        condition_value
      }
    }
  })
}

module.exports ={
    validate,
    noValidate
}