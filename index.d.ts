import App from './src/App';

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
    onPersonChange: (selectedPerson: IPerson) => void;
}

export interface IPeopleListState extends IPeopleListProps {
    selected: number;
}

export interface IPeopleListItemProps {
    name: string;
    id: number;
    gender: string;
    onClick: any;
    selected: boolean
}
