import { AppBar, Grid, Paper, Typography } from '@material-ui/core';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { IPerson } from '../index';
import './App.css';
import Appointment from './components/Appointment';
import ConsultationsList from './components/ConsultationsList';
import Patient from './components/Patient';
import PeopleListComponent from './components/PeopleList';
import withRoot from './withRoot';


export interface IAppState {
    medicalService: string,
    people: IPerson[];
    selectedPatient: IPerson;
}

interface IClasses {
    classes: {
        formControl: any
        center: any;
    }
}

type Props = IClasses;

class App extends React.Component<Props & WithStyles<'root'>, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            medicalService: '',
            people: [],
            selectedPatient: {
                address: {
                    countryName: '',
                    county: '',
                    locality: '',
                    number: '',
                    street: ''
                },
                birthYear: '',
                cnp: '',
                consultations: [],
                dentoPeriodontalExam: [],
                firstName: '',
                generalConditionInformation: [],
                id: -1,
                insuranceCode: '',
                lastName: ''
            }
        }
    }

    public componentDidMount() {
        fetch('/patients',)
            .then((response) => {
                return response.json();
            })
            .then((people: IPerson[]) => {
                people = people.filter((person) => person.insuranceCode != null).map((person) => {
                    Object.keys(person).forEach((key) => {
                        if (person[key] == null) {
                            person[key] = undefined;
                        }
                    });
                    return {
                        ...person,
                        consultations: person.consultations.sort(((a, b) => new Date(b.dateOfConsultation).getTime() - new Date(a.dateOfConsultation).getTime())).concat()
                    };
                });
                this.setState({
                    people,
                    selectedPatient: people[0]
                });
            });
    }

    public handlePeopleListChange = (selectedPerson: IPerson) => {
        this.setState(() => {
            return {
                ...this.state,
                selectedPatient: selectedPerson
            }
        });
    };

    public refreshSelectedPatient = () => {
        return fetch(`/patients/ ${this.state.selectedPatient.id}`)
            .then((response) => {
                return response.json();
            })
            .then((person: IPerson) => {
                this.setState({
                    ...this.state,
                    selectedPatient: {
                        ...person,
                        consultations: person.consultations.sort(((a, b) => new Date(b.dateOfConsultation).getTime() - new Date(a.dateOfConsultation).getTime())).concat()
                    }
                });
            })
    };

    public render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.center}>
                            PRO DENT
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container={true} spacing={0}>
                    <Grid item={true} xs={2} style={{position: 'relative'}}>
                        <PeopleListComponent people={this.state.people}
                                             onPersonChange={this.handlePeopleListChange}/>
                    </Grid>
                    <Grid item={true} xs={10}>
                        <Paper elevation={4}>
                            <Grid container={true} spacing={0} style={{padding: 25}}>
                                <Grid item={true} xs={8}>
                                    <Grid container={true} spacing={0} style={{padding: 15}}>
                                        <Grid item={true} xs={12}>
                                            <Typography variant="display1" gutterBottom={true}>
                                                Patient Details
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Patient address={this.state.selectedPatient.address}
                                                     firstName={this.state.selectedPatient.firstName}
                                                     lastName={this.state.selectedPatient.lastName}
                                                     cnp={this.state.selectedPatient.cnp}
                                                     insuranceCode={this.state.selectedPatient.insuranceCode}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container={true} spacing={0} style={{padding: 15}}>
                                        <Grid item={true} xs={12}>
                                            <Typography variant="display1" gutterBottom={true}>
                                                Patient Consultations
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <div style={{minHeight: '400px'}}>
                                                <ConsultationsList
                                                    consultations={this.state.selectedPatient.consultations}
                                                    patientId={this.state.selectedPatient.id}
                                                    onConsultationChange={this.refreshSelectedPatient}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item={true} xs={4}>
                                    <Grid container={true} spacing={0} style={{padding: 15}}>
                                        <Grid item={true} xs={12}>
                                            <Typography variant="display1" gutterBottom={true}>
                                                Create appointment
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Appointment patientId={this.state.selectedPatient.id}
                                                         onAppointmentSave={this.refreshSelectedPatient}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles: StyleRulesCallback<'root'> = theme => ({
    center: {
        flex: 1,
        textAlign: 'center',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    root: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
    },
    selectEmpty: {
        margin: theme.spacing.unit,
    },
});
export default withRoot(withStyles(styles, {withTheme: true})<{}>(App));
