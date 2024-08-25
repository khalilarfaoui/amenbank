import { Mouvement } from "./mouvement";

export interface Compte {
  id: number;
  numeroCompte: string;
  solde: number;
  compteEnum: 'Principal' | 'Epargne' | 'Courant' | 'Crédit';
  devise: string;
  mouvements: Mouvement[];
}
