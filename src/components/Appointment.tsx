import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { medicalServices } from '../medicalServices';
import { postData } from '../util';

export interface IAppointmentProps extends IAppointmentState {
    onAppointmentSave: () => void
}

export interface IAppointmentState {
    appointmentDate: Moment,
    description: string,
    formError: boolean,
    medicalService: string,
    patientId: string
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

class Appointment extends React.Component<IAppointmentProps & IProps, IAppointmentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            appointmentDate: moment(),
            description: '',
            formError: false,
            medicalService: '',
            patientId: props.patientId
        };

    }

    public render() {
        const {classes} = this.props;
        return <form onSubmit={this.handleSubmit} className={classes.formController}>
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <FormControl style={{display: 'flex', marginTop: 15, marginBottom: 16}}
                                 error={this.state.formError}>
                        <InputLabel htmlFor="medical-service">Medical Service*</InputLabel>
                        <Select
                            children={Object.keys(medicalServices).map((key, index) => <MenuItem key={index}
                                                                                                 value={key}>{medicalServices[key]}</MenuItem>)}
                            value={this.state.medicalService}
                            onChange={this.handleChange('medicalService')}
                            inputProps={{
                                id: 'medical-service',
                                name: 'medicalService'
                            }}

                        />
                    </FormControl>
                </Grid>
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
                    />
                </Grid>
                <Grid item={true} xs={12} style={{marginTop: 45}}>
                    <Typography variant="subheading" color="default">Appointment Date</Typography>
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
            formError: !(name === 'medicalService')
        });
    };

    private handleAppointmentDate = (event: Moment) => {
        this.setState({
            ...this.state,
            appointmentDate: event
        });
    };

    private handleSubmit = (event: any) => {
        if (this.state.medicalService.length <= 0) {
            this.setState({
                ...this.state,
                formError: true
            });
        } else {
            postData('/appointments', {
                dateOfAppointment: this.state.appointmentDate.toDate(),
                description: this.state.description,
                medicalService: this.state.medicalService,
                patientId: this.props.patientId
            })
                .then((response) => {
                    this.setState({
                        appointmentDate: moment(),
                        description: '',
                        formError: false,
                        medicalService: '',
                        patientId: this.props.patientId
                    });
                    this.props.onAppointmentSave();
                });
        }
        event.preventDefault();
    }
}

export default withStyles(styles)(Appointment);
