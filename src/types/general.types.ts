export interface IModalProps{
    isOpen:boolean;
    onClose:()=>void;
    title?:string;
    children:React.ReactNode;
    width?:string;
    height?:string;
}

export interface IUnit{
    id:string;
    name:string;
}

export interface IUnitContextType {
  units: IUnit[];
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
  clearUnit:()=>void
}
