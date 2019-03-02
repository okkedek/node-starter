export default {
    async list(req, res, next) {
        try {
            let entities = {
                id: 1,
                name: 'example'
            };
            res.send({data: [entities]})
        } catch (e) {
            next(e)
        }
    },
};
