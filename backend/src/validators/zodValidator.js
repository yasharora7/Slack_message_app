import { StatusCodes } from "http-status-codes";

import { customErrorResponse } from "../utils/common/responseObjects.js";

export const validate= (schema)=>{
    return async (req,res,next)=>{
        try{
            console.log("test")
            await schema.parseAsync(req.body);
            console.log("test1")
            next();
        }catch(error){
            console.log("tset2")
            let explanation=[];
            let errorMessage='';
            console.log(error);
            error.issues.forEach((key)=>{
                explanation.push(key.path[0]+' '+key.message);
                errorMessage+=' : '+key.path[0]+' '+key.message;
            });
            res.status(StatusCodes.BAD_REQUEST).json(
                customErrorResponse({
                    message:'Validation error'+ errorMessage,
                    explanation: explanation,
                })
            );
        }
    };
};