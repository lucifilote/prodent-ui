export interface IAddress {
    countryName: string;
    county: string;
    locality: string;
    number: string;
    street: string;
}

export interface IPerson {
    address?: IAddress,
    birthYear: string,
    cnp: string,
    consultations: any[];
    dentoPeriodontalExam: any[];
    firstName: string;
    generalConditionInformation: any[];
    id: number;
    insuranceCode: string;
    lastName: string;
}

export interface IPeopleListProps {
    people: IPerson[];
    onPeopleFiltering: (people: IPerson[]) => void;
    onPersonChange: (selectedPerson: IPerson) => void;
    onPersonAdded: (newPatient: any) => void;
}

export interface IPeopleListState extends IPeopleListProps {
    selected: number;
    addDialogOpen: boolean;
}

export interface IPeopleListItemProps {
    name: string;
    id: number;
    gender: string;
    onClick: any;
    selected: boolean
}
