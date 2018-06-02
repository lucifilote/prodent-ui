import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, withStyles } from '@material-ui/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { medicalServices } from '../medicalServices';

export interface IAppointmentProps {
    description: string;
    medicalService: string;
    appointmentDate: Moment;
}

interface IProps {
    classes: {
        formController: any
    }
}

const styles = (theme: any) => ({
    formController: {
        display: 'flex'
    }
});

class Appointment extends React.Component<IAppointmentProps & IProps, IAppointmentProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            appointmentDate: moment(),
            description: '',
            medicalService: ''
        };

    }

    public render() {
        const {classes} = this.props;
        return <form onSubmit={this.handleSubmit} className={classes.formController}>
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <TextField
                        id="description"
                        label="Description"
                        multiline={true}
                        rowsMax="2"
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                        margin="normal"
                        fullWidth={true}
                        required={true}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <FormControl style={{display: 'flex', marginTop: 22}}>
                        <InputLabel htmlFor="medical-service">Medical Service</InputLabel>
                        <Select
                            children={Object.keys(medicalServices).map((key, index) => <MenuItem key={index}
                                                                                                 value={key}>{medicalServices[key]}</MenuItem>)}
                            value={this.state.medicalService}
                            onChange={this.handleChange('medicalService')}
                            inputProps={{
                                id: 'medical-service',
                                name: 'medicalService',
                                required: true
                            }}

                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12} style={{marginTop: 15}}>
                    <DatePicker
                        inline={true}
                        selected={this.state.appointmentDate}
                        onChange={this.handleAppointmentDate}
                        showTimeSelect={true}
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                    />
                </Grid>
                <Button variant="raised" color="primary" size="large" type={'submit'}>
                    SAVE
                </Button>
            </Grid>
        </form>;
    }

    private handleChange = (name: string) => (event: any) => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    private handleAppointmentDate = (event: Moment) => {
        this.setState({
            ...this.state,
            appointmentDate: event
        });
    };

    private handleSubmit = (event: any) => {
        alert('A name was submitted: ' + this.state);
        event.preventDefault();
    }
}

export default withStyles(styles)(Appointment);
