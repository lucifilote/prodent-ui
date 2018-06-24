import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
// @ts-ignore
import debounce from 'lodash/debounce';
import * as React from 'react';
import { IPeopleListProps, IPeopleListState, IPerson } from '../../index';
import AddPatient from './AddPatient';
import Person from './Person';

class PeopleListComponent extends React.Component<IPeopleListProps, IPeopleListState> {
    public debouncedFilterPeople: any;
    public initialPatients: IPerson[] = [];

    constructor(props: IPeopleListProps) {
        super(props);
        this.state = {
            ...props,
            addDialogOpen: false,
            selected: -1
        };

        this.debouncedFilterPeople = debounce((searchTerm = '') => {
            const filteredPeople = this.initialPatients.filter((peer) => {
                return peer.lastName.toLowerCase().startsWith(searchTerm.toLowerCase()) || peer.firstName.toLowerCase().startsWith(searchTerm.toLowerCase())
            });
            this.props.onPeopleFiltering(filteredPeople);
        }, 500);
    }


    public handleClick = (id: number) => {
        if (this.state.selected !== id) {
            const selectedPatient = this.props.people.find((person) => person.id === id);
            if (selectedPatient) {
                this.props.onPersonChange(selectedPatient);
                this.setState({...this.state, selected: id})
            }
        }
    };

    public isSelected = (id: number) => {
        return this.state.selected === id;
    };

    public componentWillReceiveProps(newProps: IPeopleListProps) {
        if (this.initialPatients.length <= 0 && newProps.people.length > 0) {
            this.initialPatients = newProps.people.concat();
        }
        const firstPersonId = newProps.people[0] ? newProps.people[0].id : -1;
        this.setState((prevState: IPeopleListState, props: IPeopleListProps) => {
            return {
                people: newProps.people,
                selected: prevState.selected > 0 && prevState.people.length === props.people.length ? prevState.selected : firstPersonId,
            };
        });
    }


    public filterPatients = (event: any) => {
        event.persist();
        this.debouncedFilterPeople(event.target.value);
    };

    public render() {
        return (
            <div className="mdl-list">
                <TextField
                    style={{marginLeft: 10, paddingRight: 20}}
                    id="input-with-icon-textfield"
                    label="Search patient"
                    fullWidth={true}
                    onChange={this.filterPatients}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                {this.state.people.map((peer) => {
                    return <Person onClick={this.handleClick} key={peer.id} id={peer.id}
                                   gender={this.getPersonGender(peer.cnp) || ''}
                                   name={peer.firstName + ', ' + peer.lastName}
                                   selected={this.isSelected(peer.id)}/>
                })}
                <Tooltip id="tooltip-left" title="Add Patient" placement="left">
                    <Button onClick={this.handleClickOpen}
                            variant="fab" color="primary" aria-label="add"
                            style={{position: 'absolute', right: 10, bottom: 0}}>
                        <AddIcon/>
                    </Button>
                </Tooltip>
                <AddPatient onDialogClose={this.onDialogClose} open={this.state.addDialogOpen}/>
            </div>
        );
    }

    private handleClickOpen = () => {
        this.setState({
            addDialogOpen: true
        });
    };

    private onDialogClose = (newPatient: any, shouldSave: boolean = false) => {
        this.setState({
            addDialogOpen: false
        });
        if (shouldSave) {
            this.props.onPersonAdded(newPatient);
        }
    };


    private getPersonGender = (cnp: string) => {
        if (cnp.substr(0, 1) === '1') {
            return 'male';
        } else if (cnp.substr(0, 1) === '2') {
            return 'female';
        }
        return '';
    }
}

export default PeopleListComponent;
