import * as React from 'react';
import { IPeopleListProps, IPeopleListState } from '../../index';
import Person from './Person';

class PeopleListComponent extends React.Component<IPeopleListProps, IPeopleListState> {
    constructor(props: IPeopleListProps) {
        super(props);
        this.state = {
            ...props,
            selected: -1
        }
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
        this.setState((prevState: IPeopleListState, props: IPeopleListProps) => {
            return {
                ...props,
                selected: prevState.selected > 0 ? prevState.selected : props.people[0].id,
            };
        });
    }

    public render() {
        return (
            <div className="mdl-list">
                {this.state.people.map((peer) => {
                    return <Person onClick={this.handleClick} key={peer.id} id={peer.id}
                                   gender={this.getPersonGender(peer.cnp) || ''}
                                   name={peer.firstName + ', ' + peer.lastName}
                                   selected={this.isSelected(peer.id)}/>
                })}
            </div>
        );
    }

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
