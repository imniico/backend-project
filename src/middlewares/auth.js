export const checkRole = (roles) => {
    return (req, res, next) => {
        console.log("Desde auth", req.user);
        if(!req.user){
            return res.json({ status:"error", message:"No estas autenticado" })
        }
        if(!roles.includes(req.user.role)){
            return res.json({ status:"error", message:"No estas autorizado" })
        }
        next();
    }
}