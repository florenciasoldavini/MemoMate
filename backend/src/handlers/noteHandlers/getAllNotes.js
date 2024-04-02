const getAllNotesController = require('../../controllers/noteControllers/getAllNotesController');

const getAllNotes = async (req, res) => {
    try {
        const { userId } = req.params;
        const filters = req.query.filters ? JSON.parse(req.query.filters) : [];

        console.log("params: ", req.params);
        console.log("filters: ", filters);

        const notesFound = await getAllNotesController(userId, filters);

        if(!notesFound || notesFound.length === 0) {
            return res.status(404).json({ error: "No Notes found" });
        }

        res.status(200).json(notesFound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports = getAllNotes;
