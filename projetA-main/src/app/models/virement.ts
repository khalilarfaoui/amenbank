export interface Virement {
  id: number;
  compteSourceId: number;
  compteDestId: number;
  montant: number;
  date: string;
  statut: string;
  devise: string;
  motif: string;
}
