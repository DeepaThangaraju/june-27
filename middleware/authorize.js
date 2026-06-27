export function authorize(roles = []) {
    
    if (typeof roles === 'string') {
        roles=[roles]
    }
    console.log(roles)
    return (req, res, next) => {
       
        if (!req.user || (roles.length && !roles.includes(req.user.role))) {
            console.log("user", req.user);
            return res.status(403).json({message:"insufficient permission"})
        }

        next();
    }
}
