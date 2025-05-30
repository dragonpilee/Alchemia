
import React, { useRef } from 'react';

interface MoleculeInputProps {
  smiles: string;
  onSmilesChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const MoleculeInput: React.FC<MoleculeInputProps> = ({ smiles, onSmilesChange, onSubmit, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (smiles.trim() && !isLoading) {
      onSubmit();
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          onSmilesChange(text.trim());
        } else {
          console.error("File content is empty or unreadable.");
          // Optionally, display an error to the user via a state variable
        }
      };
      reader.onerror = () => {
        console.error("Failed to read file.");
        // Optionally, display an error to the user
      };
      reader.readAsText(file);
    }
    // Reset file input value to allow re-uploading the same file
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-900 rounded-lg shadow-xl">
      <label htmlFor="smiles-input" className="block text-lg font-semibold mb-3 text-slate-200">
        Enter SMILES String or Upload File
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="smiles-input"
          type="text"
          value={smiles}
          onChange={(e) => onSmilesChange(e.target.value)}
          placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
          className="flex-grow p-3 border border-slate-700 rounded-md bg-slate-800 text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-150 ease-in-out shadow-sm placeholder-slate-500"
          disabled={isLoading}
          aria-label="SMILES string input"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".smi,.txt,text/plain"
          style={{ display: 'none' }}
          aria-label="SMILES file uploader"
        />
        <button
          type="button"
          onClick={handleFileUploadClick}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-5 rounded-md transition-colors duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75"
          disabled={isLoading}
          aria-label="Upload SMILES file"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mr-2 -ml-1 align-text-bottom">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z" />
          </svg>
          Upload File
        </button>
      </div>
       <div className="mt-4 sm:mt-3 sm:flex sm:flex-row-reverse sm:gap-3">
         <button
            type="submit"
            className="w-full sm:w-auto justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
            disabled={isLoading || !smiles.trim()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </div>
            ) : 'Reveal Properties'}
          </button>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Examples: Aspirin: <code className="bg-slate-700/80 px-1.5 py-0.5 rounded text-slate-300 font-mono text-[0.7rem]">CC(=O)OC1=CC=CC=C1C(=O)O</code>, Caffeine: <code className="bg-slate-700/80 px-1.5 py-0.5 rounded text-slate-300 font-mono text-[0.7rem]">CN1C=NC2=C1C(=O)N(C(=O)N2C)C</code>
      </p>
    </form>
  );
};
export default MoleculeInput;
