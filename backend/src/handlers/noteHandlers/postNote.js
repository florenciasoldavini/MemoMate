const postNoteController = require('../../controllers/noteControllers/postNoteController');

const postNote = async (req, res) => {
    try {
        const { note } = req.body;
        const { title, content } = note;
        const { userId } = req.params; 

        const noteCreated = await postNoteController(title, content, userId);

        if(!noteCreated) {
            return res.status(404).json({ error: "No Note created" });
        }

        res.status(200).json(noteCreated);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        } 
        
        return res.status(500).json({ error: error.message });    
    }
};

module.exports = postNote;
