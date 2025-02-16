import { CaseProps } from './CaseProps';

export interface ToggleCasesContentProps {
  selectedCase: CaseProps | null;
  setSelectedCase: React.Dispatch<React.SetStateAction<CaseProps | null>>;
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  showSpinner: boolean;
}
