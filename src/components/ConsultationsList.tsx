import * as moment from 'moment';
import * as React from 'react';
import { AutoSizer, List, ListRowProps, ListRowRenderer } from 'react-virtualized';
import { medicalServices } from '../medicalServices';
import { putData } from '../util';
import ConsultationListItemDisplay from './ConsultationListItemDisplay';
import './ConsultationsList.css';

interface IConsultationsListProps {
    consultations: any[]
    patientId: number;
    onConsultationChange?: () => Promise<any>;
}

interface IConsultationsListState extends IConsultationsListProps {
    isInEditMode: boolean
}

class ConsultationsList extends React.Component<IConsultationsListProps, IConsultationsListState> {
    public static getDerivedStateFromProps(props: IConsultationsListProps, state: IConsultationsListState) {
        return {
            ...props,
            isInEditMode: state.isInEditMode
        }
    }

    constructor(props: IConsultationsListProps) {
        super(props);

        this.state = {
            consultations: [{description: ''}],
            isInEditMode: false,
            patientId: -1,
        };

        this.onConsultationEdit = this.onConsultationEdit.bind(this);
    }

    public onConsultationEdit = () => {
        this.setState((prevState, props) => {
            return {
                ...this.state,
                isInEditMode: true
            }
        });
    };

    public render() {
        return (
            <AutoSizer>
                {({height, width}) => (
                    <List
                        editMode={this.state.isInEditMode}
                        consultations={this.state.consultations}
                        width={width}
                        height={230}
                        rowCount={this.state.consultations.length}
                        rowHeight={55}
                        rowRenderer={this.rowRenderer}
                        onScroll={this.onListScroll}
                        className={this.state.isInEditMode ? 'mdl-list consultations-list consultations-list__edit-mode' : 'mdl-list consultations-list'}
                    />)}
            </AutoSizer>
        );
    }

    private onListScroll = () => {
        this.setState({
            isInEditMode: false
        })
    };

    private onConsultationSave = (newDescription: string, index: number) => {
        const consultation = this.state.consultations[index];
        consultation.description = newDescription;

        return putData(`/patients/${this.state.patientId}/consultation`, {...consultation})
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                return this.props.onConsultationChange && this.props.onConsultationChange().then(() => {
                    this.setState({
                        isInEditMode: false
                    });
                    return response;
                });
            })
    };

    private rowRenderer: ListRowRenderer = (listRendererProps: ListRowProps) => {
        return (
            <div
                key={listRendererProps.key}
                style={listRendererProps.style}
                className={'mdl-list__item'}>
                <ConsultationListItemDisplay index={listRendererProps.index}
                                             primary={`${moment(this.state.consultations[listRendererProps.index].dateOfConsultation).format('MMMM Do YYYY, h:mm:ss a')} - ${medicalServices[this.state.consultations[listRendererProps.index].medicalService] || ''}`}
                                             secondary={this.state.consultations[listRendererProps.index].description}
                                             onEditClick={this.onConsultationEdit}
                                             onSaveClick={this.onConsultationSave}
                                             disableEdit={this.state.isInEditMode}/>
            </div>
        );
    };
}

export default ConsultationsList;
