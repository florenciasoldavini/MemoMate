const putNoteController = require('../../controllers/noteControllers/putNoteController');

const putNote = async (req, res) => {
    try {
        const { note } = req.body;
        const { title, content, tags } = note;
        const { noteId } = req.params; 

        const noteUpdated = await putNoteController(title, content, tags, noteId);

        if(!noteUpdated) {
            throw new Error('Failed to update Note');
        }    

        res.status(200).json(noteUpdated);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        } 
        
        return res.status(500).json({ error: error.message });    
    }
};

module.exports = putNote;
