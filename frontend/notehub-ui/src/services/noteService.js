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
    return response.data
}

export async function updateNote(id,noteData)
{
    const response= await axiosInstance.put(`/notes/${id}`,noteData);
    return response.data
}

export async function deleteNote(id)
{
    await axiosInstance.delete(`/notes/${id}`)
}