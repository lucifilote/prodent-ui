import * as React from 'react';
import { IPeopleListItemProps } from '../../index';
import './Person.css';


class PeopleListItem extends React.Component<IPeopleListItemProps> {
    constructor(props: IPeopleListItemProps) {
        super(props);
    }

    public handleClick = () => {
        this.props.onClick(this.props.id);
    };

    public isSelected = () => {
        return this.props.selected ? ' mdl-list__item--selected' : '';
    };

    public render() {
        return (
            <div className={'mdl-list__item' + this.isSelected()} onClick={this.handleClick}>
                <span className="mdl-list__item-primary-content">
                    <i className="mdl-list__item-avatar female-avatar"/>
                  <span>{this.props.name}</span>
                </span>
            </div>
        );
    }
}

export default PeopleListItem;
