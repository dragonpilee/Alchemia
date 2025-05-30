
export interface MolecularProperties {
  molecularWeight: number | null;
  logP: number | null;
  hydrogenBondDonors: number | null;
  hydrogenBondAcceptors: number | null;
  polarSurfaceArea: number | null;
  rotatableBonds: number | null;
  canonicalSmiles: string | null;
  formula?: string | null;
  formalCharge?: number | null;
}
