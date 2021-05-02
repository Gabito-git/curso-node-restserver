const usersGet = (req, res) => {
    const query = req.query;

    res.status(400).json({
        ok: true,
        msg: 'get API - controlador',
        query,
    });
};

const usersPost = (req, res) => {
    const body = req.body;

    res.status(201).json({
        ok: true,
        msg: 'POST API - controlador',
        body,
    });
};

const usersPut = (req, res) => {
    const id = req.params.id;

    res.status(400).json({
        ok: true,
        msg: 'PUT API - controlador',
        id,
    });
};

const usersDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'DELETE API - controlador',
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
};
