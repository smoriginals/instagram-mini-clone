export const validate = (schema) => (req, res, next)=>{
    const { error } = schema.validate(req.body, {
        abortEarly:false,//return all types of error
    })

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation Failed!',
            error:error.details.map(err=>err.message)
        })
    }
    next();
}

