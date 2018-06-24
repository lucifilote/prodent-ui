import { AppBar, Grid, Paper, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/es/Snackbar';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { IPerson } from '../index';
import './App.css';
import Appointment from './components/Appointment';
import ConsultationsList from './components/ConsultationsList';
import Patient from './components/Patient';
import PeopleListComponent from './components/PatientList';
import { MySnackbarContentWrapper } from './components/Snackbar';
import { postData } from './util';
import withRoot from './withRoot';

export interface IAppState {
    medicalService: string,
    noPeople: boolean;
    people: IPerson[];
    selectedPatient: IPerson;
    showSnackbar: boolean;
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
            noPeople: false,
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
            },
            showSnackbar: false
        }
    }

    public componentDidMount() {
        fetch('/patients',)
            .then((response) => {
                return response.json();
            })
            .then((people: IPerson[]) => {
                people = this.filterPatientsWithNull(people);
                this.setState({
                    noPeople: false,
                    people,
                    selectedPatient: people[0]
                });
            });
    }

    public onPeopleListChange = (selectedPerson: IPerson) => {
        this.setState(() => {
            return {
                selectedPatient: {
                    ...selectedPerson,
                    consultations: selectedPerson.consultations ? selectedPerson.consultations : []
                }
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
                        consultations: this.sortPersonConsultations(person)
                    },
                    showSnackbar: true
                });
            })
    };

    public onPersonAdded = (newPatient: any) => {
        postData('/patients', {...newPatient})
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    people: this.state.people.concat([response]),
                    showSnackbar: true
                });
            })
    };

    public onPeopleFiltered = (people: IPerson[]) => {
        if (people.length <= 0) {
            this.setState({
                noPeople: true,
                people
            })
        } else {
            this.setState({
                noPeople: false,
                people,
                selectedPatient: people[0]
            });
        }
    };

    public handleCloseSnackbar = () => {
        this.setState({
            showSnackbar: false
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
                                             onPeopleFiltering={this.onPeopleFiltered}
                                             onPersonChange={this.onPeopleListChange}
                                             onPersonAdded={this.onPersonAdded}/>
                    </Grid>
                    <Grid item={true} xs={10}>
                        <Paper elevation={4}>
                            <Grid container={true} spacing={0} style={{padding: 25}}>
                                <div className={!this.state.noPeople ? 'no-patients hidden' : 'no-patients'}>
                                    <h2>No patient selected...</h2>
                                </div>
                                <Grid item={true} xs={7}>
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
                                <Grid item={true} xs={5}>
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
                <Snackbar
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'bottom',
                    }}
                    open={this.state.showSnackbar}
                    autoHideDuration={4000}
                    onClose={this.handleCloseSnackbar}>
                    <MySnackbarContentWrapper
                        onClose={this.handleCloseSnackbar}
                        variant="success"
                        message="Successfully saved!"
                    />
                </Snackbar>
            </div>
        );
    }

    private filterPatientsWithNull(people: IPerson[]) {
        return people.filter((person) => person.insuranceCode != null).map((person) => {
            Object.keys(person).forEach((key) => {
                if (person[key] == null) {
                    person[key] = undefined;
                }
            });
            return {
                ...person,
                consultations: this.sortPersonConsultations(person)
            };
        });
    }

    private sortPersonConsultations(person: IPerson) {
        return person.consultations.sort(((a, b) => new Date(b.dateOfConsultation).getTime() - new Date(a.dateOfConsultation).getTime())).concat()
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
