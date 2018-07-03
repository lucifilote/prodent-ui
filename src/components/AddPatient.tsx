import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import * as React from 'react';
import IntegrationAutosuggest from './AutoSuggest';

interface IAddPatientProps {
    onDialogClose: (newPatient: any, shouldSave?: boolean) => any;
    open: boolean;
}

class AddPatient extends React.Component<IAddPatientProps> {
    constructor(props: IAddPatientProps) {
        super(props);

        this.state = {
            address: {
                countryName: '',
                county: '',
                locality: ''
            },
            cnp: '',
            firstName: '',
            insuranceCode: '',
            lastName: '',
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
                        <Grid container={true} spacing={8}>
                            <Grid container={true} spacing={16}>
                                <Grid item={true} xs={6}>
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
                                </Grid>
                                <Grid item={true} xs={6}>
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
                                </Grid>
                            </Grid>
                            <Grid container={true} spacing={16}>
                                <Grid item={true} xs={6}>
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
                                </Grid>
                                <Grid item={true} xs={6}>
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
                                </Grid>

                            </Grid>
                            <Grid container={true} spacing={16} style={{marginTop: 25}}>
                                <Grid item={true} xs={6}>
                                    <IntegrationAutosuggest placeholder={'Start searching for a country...'}
                                                            onSuggestionChange={this.handleCountryChange}/>
                                </Grid>
                                <Grid item={true} xs={3}>
                                    <TextField
                                        autoComplete="false"
                                        id="city"
                                        label="City"
                                        type="text"
                                        onChange={this.handleChange('locality')}
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item={true} xs={3}>
                                    <TextField
                                        autoComplete="false"
                                        id="county"
                                        label="County"
                                        type="text"
                                        onChange={this.handleChange('county')}
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>
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

    private handleCountryChange = (value: string) => {
        this.setState((prevState: any) => ({
            ...this.state,
            address: {
                ...prevState.address,
                countryName: value
            }
        }));
    };

    private handleClose = (event: any) => {
        this.props.onDialogClose(this.state);
        event.preventDefault();
    };

    private handleSave = (event: any) => {
        console.log(this.state);
        const patient = {
            address: {
                ...(this.state as any).address,
                county: (this.state as any).county,
                locality: (this.state as any).locality,
            },
            cnp: (this.state as any).cnp,
            firstName: (this.state as any).firstName,
            insuranceCode: (this.state as any).insuranceCode,
            lastName: (this.state as any).lastName,

        };
        this.props.onDialogClose(patient, true);
        event.preventDefault();
    }
}

export default AddPatient;
