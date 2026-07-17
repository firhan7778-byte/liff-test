module.exports = function(req,res,next){

    if(
        req.session.admin &&
        req.session.admin.login
    ){

        next();

    }else{

        res.status(401).json({

            success:false,
            message:"กรุณา Login"

        });

    }

};