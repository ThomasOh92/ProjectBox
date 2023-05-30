// pages/projectBoard.tsx
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'

const ProjectBoard: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [noteInput, setNoteInput] = useState<string>('');

  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState<string>('');

  const [cloudLinks, setCloudLinks] = useState<any[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState('');

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

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput(e.target.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleAddCloudLink = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(event.target.value);
    if (modalInput) {
      setCloudLinks((prevLinks) => [...prevLinks, { provider: selectedProvider, link: modalInput }]);
    }
    setModalInput('');
    setShowModal(false);
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
      <select value={selectedProvider} onChange={handleAddCloudLink}>
        <option value="">Select a cloud storage provider</option>
        <option value="DropBox">DropBox</option>
        <option value="Google Drive">Google Drive</option>
        <option value="OneDrive">OneDrive</option>
      </select>
      <button onClick={handleOpenModal} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Cloud File
      </button>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleCloseModal}></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Enter Cloud Link
                    </h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Link" value={modalInput} onChange={handleModalInputChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleAddCloudLink}>
                  Add Link
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        {cloudLinks.map((cloudLink, index) => (
          <div key={index} className='"p-4 border rounded shadow-md bg-white'>
            <h2>{cloudLink.provider} File {index + 1}</h2>
            <a href={cloudLink.link} target="_blank" rel="noreferrer">{cloudLink.link}</a>
          </div>
        ))}
      </div>
  </div>
  );
};

export default ProjectBoard;

