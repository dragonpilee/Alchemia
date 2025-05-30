
import React from 'react';
import { MolecularProperties } from '../types';

interface PropertyDisplayProps {
  properties: MolecularProperties | null;
}

const PropertyItem: React.FC<{ label: string; value: string | number | null | undefined; unit?: string }> = ({ label, value, unit }) => {
  const displayValue = value === null || value === undefined || String(value).trim() === "" ? "N/A" : String(value);
  const valueColor = displayValue === "N/A" ? "text-slate-500" : "text-cyan-300";
  
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg ring-1 ring-slate-700/50 hover:ring-cyan-500 transition-all duration-150 ease-in-out transform hover:scale-[1.02]">
      <h3 className="text-sm font-medium text-slate-400 truncate" title={label}>{label}</h3>
      <p className={`text-lg font-semibold ${valueColor} break-words`} title={String(value) + (unit && displayValue !== "N/A" ? ` ${unit}` : "")}>
        {displayValue}
        {unit && displayValue !== "N/A" && <span className="text-xs text-slate-400 ml-1">{unit}</span>}
      </p>
    </div>
  );
};

const PropertyDisplay: React.FC<PropertyDisplayProps> = ({ properties }) => {
  if (!properties) {
    return (
        <div className="text-center py-12 text-slate-400 bg-slate-900 rounded-lg shadow-xl p-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-5 text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5.16 14.55A3.375 3.375 0 0 0 6.105 19.5h11.79a3.375 3.375 0 0 0 .945-4.95l-3.938-4.145a2.25 2.25 0 0 1-.659-1.591V3.104m-3.75 5.714h3.75M3.75 3.104h16.5M5.25 3.104v2.857m13.5-2.857v2.857m0 0L21 7.65l-2.25-.001v-.002zM5.25 7.65L3 7.65l2.25-.001v-.002zM9.75 19.5h4.5M7.5 19.5H6.105M16.5 19.5H17.895" />
            </svg>
            <p className="text-xl font-semibold text-slate-300">Enter a SMILES string to unveil its chemical secrets.</p>
            <p className="text-sm mt-2 text-slate-500">Predicted properties will be displayed here once calculated.</p>
        </div>
    );
  }

  return (
    <div className="mt-6 bg-slate-900 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-slate-100 border-b border-slate-700 pb-4">
        Predicted Molecular Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <PropertyItem label="Canonical SMILES" value={properties.canonicalSmiles} />
        <PropertyItem label="Molecular Formula" value={properties.formula} />
        <PropertyItem label="Molecular Weight" value={properties.molecularWeight} unit="g/mol" />
        <PropertyItem label="LogP" value={properties.logP} />
        <PropertyItem label="H-Bond Donors" value={properties.hydrogenBondDonors} />
        <PropertyItem label="H-Bond Acceptors" value={properties.hydrogenBondAcceptors} />
        <PropertyItem label="Polar Surface Area" value={properties.polarSurfaceArea} unit="Å²" />
        <PropertyItem label="Rotatable Bonds" value={properties.rotatableBonds} />
        <PropertyItem label="Formal Charge" value={properties.formalCharge} />
      </div>
    </div>
  );
};
export default PropertyDisplay;