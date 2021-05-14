
const esAdminRole = ( req, res, next ) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const { role, nombre } = req.user;
    console.log(role);

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador`
        })
    }
 
    next()

}

const tieneRole = ( ...roles) => {

    return ( req, res, next ) => {

        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if(!roles.includes( req.user.role )){
            return res.status(401).json({
                msg: `Esta acción require uno de estos roles ${ roles }`
            })
        }

        next();
    }

}

module.exports = {
    esAdminRole, 
    tieneRole
};