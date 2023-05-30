// pages/projectBoard.tsx
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'

const ProjectBoard: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [noteInput, setNoteInput] = useState<string>('');

  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteInput(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkInput(e.target.value);
  };

  const handleAddNote = () => {
    setNotes((prevNotes) => [...prevNotes, noteInput]);
    setNoteInput('');
  };

  const handleAddLink = () => {
    setLinks((prevLinks) => [...prevLinks, linkInput]);
    setLinkInput('');
  };

  return (
    <div className='min-h-screen bg-gray-100 p-10'>
      <h1>Your Project Board</h1>
      <input placeholder="Add a note" value={noteInput} onChange={handleInputChange} />
        <button onClick={handleAddNote} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Note
        </button>
      <input placeholder="Add a link" value={linkInput} onChange={handleLinkChange} />
        <button onClick={handleAddLink} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Link
        </button>
      <div className="grid grid-cols-3 gap-4">
      {notes.map((note, index) => (
        <div key={index} className='"p-4 border rounded shadow-md bg-white'>
          <h2>Note {index + 1}</h2>
          <p>{note}</p>
        </div>
      ))}
      {links.map((link, index) => (
        <div key={index} className='"p-4 border rounded shadow-md bg-white'>
          <h2>Link {index + 1}</h2>
          <a href={link} target="_blank" rel="noreferrer">{link}</a>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ProjectBoard;
