import { AppBar, Grid, Paper, Typography } from '@material-ui/core';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { IPerson } from '../index';
import './App.css';
import Appointment from './components/Appointment';
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
        fetch('/patient/patients',)
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
                    return person;
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
                    <Grid item={true} xs={2}>
                        <PeopleListComponent people={this.state.people}
                                             onPersonChange={this.handlePeopleListChange}/>
                    </Grid>
                    <Grid item={true} xs={10}>
                        <Paper elevation={4}>
                            <Grid container={true} spacing={0} style={{padding: 25}}>
                                <Grid item={true} xs={6}>
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
                                </Grid>
                                <Grid item={true} xs={6}>
                                    <Grid container={true} spacing={0} style={{padding: 15}}>
                                        <Grid item={true} xs={12}>
                                            <Typography variant="display1" gutterBottom={true}>
                                                Create appointment
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Appointment/>
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
