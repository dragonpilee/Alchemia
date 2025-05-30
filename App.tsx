
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MoleculeInput from './components/MoleculeInput';
import PropertyDisplay from './components/PropertyDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { MolecularProperties } from './types';
import { predictMolecularProperties } from './services/geminiService';

const App: React.FC = () => {
  const [smiles, setSmiles] = useState<string>('');
  const [properties, setProperties] = useState<MolecularProperties | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredictProperties = useCallback(async () => {
    if (!smiles.trim()) {
      setError("SMILES string cannot be empty.");
      setProperties(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setProperties(null); 

    try {
      const result = await predictMolecularProperties(smiles);
      setProperties(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred while predicting properties.");
      setProperties(null);
    } finally {
      setIsLoading(false);
    }
  }, [smiles]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <MoleculeInput
            smiles={smiles}
            onSmilesChange={setSmiles}
            onSubmit={handlePredictProperties}
            isLoading={isLoading}
          />
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && <PropertyDisplay properties={properties} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;