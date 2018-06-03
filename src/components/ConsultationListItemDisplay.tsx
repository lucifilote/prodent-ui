import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Edit from '@material-ui/icons/Edit';
import LocalHospital from '@material-ui/icons/LocalHospital';
import Save from '@material-ui/icons/Save';
import * as React from 'react';

interface IConsultationListItemDisplayProps {
    disableEdit: boolean
    index: number,
    primary: string,
    secondary: string
    onEditClick: () => void;
    onSaveClick: (newDescription: string, index: number) => Promise<any>
}

interface IConsultationListItemDisplayState extends IConsultationListItemDisplayProps {
    description: string
    isInEditMode: boolean
}

class ConsultationListItemDisplay extends React.Component<IConsultationListItemDisplayProps, IConsultationListItemDisplayState> {

    constructor(props: IConsultationListItemDisplayProps) {
        super(props);
        this.state = {
            ...props,
            description: props.secondary || '',
            isInEditMode: false
        }
    }

    public render() {
        return (
            <div style={{display: 'flex', flex: 1}}>
                <div className={'mdl-list__item-primary-content'}>
                    <span style={{display: 'flex'}} hidden={this.state.isInEditMode}>
                         <Avatar>
                        <LocalHospital/>
                    </Avatar>
                    <ListItemText
                        primary={this.props.primary}
                        secondary={this.props.secondary}/>
                    </span>

                    <span style={{flex: '1'}} hidden={!this.state.isInEditMode}>
                        <TextField
                            id="description"
                            label="Description"
                            multiline={false}
                            rowsMax="2"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                            margin="normal"
                            fullWidth={true}
                        />
                    </span>
                </div>
                <div className={'mdl-list__item-secondary-content'} style={{justifyContent: 'center'}}>
                    <IconButton aria-label="Edit" hidden={this.props.disableEdit} onClick={this.handleEdit}>
                        <Edit color="primary"/>
                    </IconButton>
                    <IconButton aria-label="Save" hidden={!this.state.isInEditMode} onClick={this.handleSave}>
                        <Save color="primary"/>
                    </IconButton>
                </div>
            </div>
        );
    }

    private handleEdit = () => {
        this.setState(() => {
            this.props.onEditClick();
            return {
                isInEditMode: true
            }
        })
    };

    private handleSave = () => {
        this.props.onSaveClick(this.state.description, this.props.index)
            .then((response) => {
               this.setState({
                   isInEditMode: false
               })
            });
    };

    private handleDescriptionChange = (event: any) => {
        this.setState({
            description: event.target.value
        })
    }
}

export default ConsultationListItemDisplay;
