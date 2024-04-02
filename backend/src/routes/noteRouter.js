const { Router } = require("express");
const noteRouter = Router();
const getAllNotes = require('../handlers/noteHandlers/getAllNotes');
const postNote = require('../handlers/noteHandlers/postNote');
const putNote = require('../handlers/noteHandlers/putNote');
const deleteNote = require('../handlers/noteHandlers/deleteNote');
const restoreNote = require('../handlers/noteHandlers/restoreNote');
const getDeletedNotes = require('../handlers/noteHandlers/getDeletedNotes');
const getArchivedNotes = require('../handlers/noteHandlers/getArchivedNotes');
const archiveNote = require('../handlers/noteHandlers/archiveNote');
const unarchiveNote = require('../handlers/noteHandlers/unarchiveNote');

noteRouter.get('/:userId', getAllNotes);

noteRouter.get('/deleted/:userId', getDeletedNotes);

noteRouter.get('/archived/:userId', getArchivedNotes);

noteRouter.post('/:userId', postNote);

noteRouter.put('/archive/:noteId', archiveNote);

noteRouter.put('/delete/:noteId', deleteNote);

noteRouter.put('/restore/:noteId', restoreNote);

noteRouter.put('/unarchive/:noteId', unarchiveNote);

noteRouter.put('/:noteId', putNote);

module.exports = noteRouter;