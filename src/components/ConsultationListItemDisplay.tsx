import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
                <div className={'consultations-list__item-primary-content'}>
                    <div style={{display: 'flex'}} hidden={this.state.isInEditMode}>
                        <Avatar style={{alignSelf: 'center'}}>
                            <LocalHospital/>
                        </Avatar>
                        <div className={'consultations-list__item-text'}>
                            <Typography variant="subheading" gutterBottom={true}
                                        className={'consultations-list__item-text--primary'}>
                                {this.props.primary}
                            </Typography>
                            <Typography variant="subheading" gutterBottom={true}
                                        className={this.props.secondary ? 'consultations-list__item-text--secondary' : 'consultations-list__item-text--secondary consultations-list__item-text--secondary-empty'}>
                                {this.props.secondary? this.props.secondary : 'No description...'}
                            </Typography>
                        </div>
                    </div>

                    <div style={{display: 'flex', flex: '1'}} hidden={!this.state.isInEditMode}>
                        <Avatar style={{alignSelf: 'center'}}>
                            <LocalHospital/>
                        </Avatar>
                        <TextField
                            id="description"
                            label="Description"
                            multiline={false}
                            rowsMax="2"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                            margin="normal"
                            fullWidth={true}
                            style={{marginLeft: 15}}
                        />
                    </div>
                </div>
                <div className={'consultations-list__item-secondary-content'}>
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
