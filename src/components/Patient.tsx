import { Grid, TextField, withStyles } from '@material-ui/core';
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

const styles = (theme: any) => ({});

class Patient extends React.Component<IPatientProps & IProps, IPatientProps> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <form>
                <Grid item={true} xs={12}>
                    <Grid container={true} spacing={8} className={'black-text'}>
                        <Grid item={true} xs={6} >
                            <TextField
                                id="firstName"
                                label="First Name"
                                disabled={true}
                                value={this.props.firstName}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item={true} xs={6}>
                            <TextField
                                id="lastName"
                                label="Last Name"
                                disabled={true}
                                value={this.props.lastName}
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
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item={true} xs={7}>
                            <TextField
                                id="cnp"
                                label="CNP"
                                disabled={true}
                                value={this.props.cnp}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item={true} xs={5}>
                            <TextField
                                id="insuranceCode"
                                label="Insurance number"
                                disabled={true}
                                value={this.props.insuranceCode}
                                margin="normal"
                                fullWidth={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </form>

        );
    }

    private getAddressString = () => {
        if (this.props.address) {
            const keys = Object.keys(this.props.address);
            if (keys.length > 0) {
                return keys.map(key => this.props.address![key]).join(', ');
            }
        }
        return '';
    };
}

export default withStyles(styles)(Patient);
