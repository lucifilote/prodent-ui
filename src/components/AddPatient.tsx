import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

interface IAddPatientProps {
    onDialogClose: (newPatient: any, shouldSave?: boolean) => any;
    open: boolean;
}

class AddPatient extends React.Component<IAddPatientProps, {}> {
    constructor(props: IAddPatientProps) {
        super(props);

        this.state = {
            cnp: '',
            firstName: '',
            insuranceCode: '',
            lastName: ''
        }
    }

    public render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <form autoComplete="off" onSubmit={this.handleSave}>

                    <DialogTitle id="form-dialog-title">Create New Patient</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoComplete="false"
                            autoFocus={true}
                            id="firstName"
                            label="First Name"
                            type="text"
                            onChange={this.handleChange('firstName')}
                            fullWidth={true}
                            required={true}
                            style={{marginTop: 25}}
                        />
                        <TextField
                            autoComplete="false"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            onChange={this.handleChange('lastName')}
                            fullWidth={true}
                            required={true}
                            style={{marginTop: 25}}
                        />
                        <TextField
                            autoComplete="false"
                            id="cnp"
                            label="CNP"
                            type="text"
                            onChange={this.handleChange('cnp')}
                            fullWidth={true}
                            required={true}
                            style={{marginTop: 25}}
                        />
                        <TextField
                            autoComplete="false"
                            id="insuranceCode"
                            label="Insurance Number"
                            type="text"
                            onChange={this.handleChange('insuranceCode')}
                            fullWidth={true}
                            required={true}
                            style={{marginTop: 25}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type={'submit'} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }

    private handleChange = (name: string) => (event: any) => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    private handleClose = (event: any) => {
        this.props.onDialogClose(this.state);
        event.preventDefault();
    };

    private handleSave = (event: any) => {
        this.props.onDialogClose(this.state, true);
        event.preventDefault();
    }
}

export default AddPatient;
