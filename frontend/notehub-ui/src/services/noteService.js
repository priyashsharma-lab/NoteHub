import axiosInstance from "../api/axiosInstance";

export async function getAllNotes()
{
    const response= await axiosInstance.get("/notes");
    return response.data;
}

export async function getNoteById(id) 
{
    const response= await axiosInstance.get(`/notes/${id}`);    
    return response.data;
}

export async function createNote(noteData)
{
    const response= await axiosInstance.post("/notes",noteData);
    return response.data;
}

export async function updateNote(id,noteData)
{
    const response= await axiosInstance.put(`/notes/${id}`,noteData);
    return response.data;
}

export async function trashNote(id)
{
    await axiosInstance.delete(`/notes/${id}`);
}

export async function getDeletedNotes()
{
    const response=await axiosInstance.get("/notes/trash");
    return response.data;
}

export async function restoreNote(id)
{
    const response=await axiosInstance.post(`/notes/${id}/restore`);
    return response.data;
}

export async function deleteNoteForever(id)
{
    await axiosInstance.delete(`/notes/${id}/forever`);
}

export async function emptyTrash()
{
    await axiosInstance.delete("/notes/emptytrash");
}

export async function archiveNote(id)
{
    const response=await axiosInstance.patch(`/notes/${id}/archive`);
    return response.data;
}

export async function unarchiveNote(id)
{
    const response=await axiosInstance.patch(`/notes/${id}/unarchive`);
    return response.data;
}

export async function getAllArchivedNotes()
{
    const response=await axiosInstance.get(`/notes/archive`);
    return response.data;
}

export async function pinNote(id)
{
    const response=await axiosInstance.patch(`/notes/${id}/pin`);
    return response.data;
}

export async function unpinNote(id)
{
    const response=await axiosInstance.patch(`/notes/${id}/unpin`);
    return response.data;
}
