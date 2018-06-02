import { FormControl, Grid, TextField, withStyles } from '@material-ui/core';
import * as React from 'react';
import { IAddress } from '../../index';

export interface IPatientProps {
    address?: IAddress,
    birthYear?: string | number,
    cnp?: string,
    firstName?: string;
    insuranceCode?: string;
    lastName?: string;
}

interface IProps {
    classes: {
        textField: any
    }
}

const styles = (theme: any) => ({
    container: {
        display: 'grid',
        gridGap: `${theme.spacing.unit * 3}px`,
        gridTemplateColumns: 'repeat(12, 1fr)',
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        // width: 200,
    }
});

class Patient extends React.Component<IPatientProps & IProps, IPatientProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            address: {
                countryName: '',
                county: '',
                locality: '',
                number: '',
                street: ''
            },
            birthYear: '',
            cnp: '',
            firstName: '',
            insuranceCode: '',
            lastName: ''
        }
    }

    public componentWillReceiveProps(newProps: IPatientProps) {
        this.setState({...newProps});
    }

    public render() {
        const {classes} = this.props;
        return (
            <FormControl onSubmit={this.handleSubmit}>
                <Grid item={true} xs={12}>
                    <Grid container={true} spacing={8}>
                        <Grid item={true} xs={6}>
                            <TextField
                                id="lastName"
                                label="Last Name"
                                className={classes.textField}
                                disabled={true}
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item={true} xs={6}>
                            <TextField
                                id="firstName"
                                label="First Name"
                                className={classes.textField}
                                disabled={true}
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField
                                id="address"
                                label="Address"
                                multiline={true}
                                rowsMax="2"
                                disabled={true}
                                value={this.getAddressString()}
                                className={classes.textField}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item={true} xs={7}>
                            <TextField
                                id="cnp"
                                label="CNP"
                                className={classes.textField}
                                disabled={true}
                                value={this.state.cnp}
                                onChange={this.handleChange('cnp')}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item={true} xs={5}>
                            <TextField
                                id="insuranceCode"
                                label="Insurance number"
                                className={classes.textField}
                                disabled={true}
                                value={this.state.insuranceCode}
                                onChange={this.handleChange('insuranceCode')}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>

        );
    }

    private getAddressString = () => {
        if (this.state.address) {
            const keys = Object.keys(this.state.address);
            if (keys.length > 0) {
                return keys.map(key => this.state.address![key]).join(', ');
            }
        }
        return '';
    };

    private handleChange = (name: string) => (event: any) => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    private handleSubmit = (event: any) => {
        alert('A name was submitted: ' + this.state);
        event.preventDefault();
    }
}

export default withStyles(styles)(Patient);
