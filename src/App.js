import ReactGA from 'react-ga';
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React, { Component, Fragment } from "react";
import SubTasks from "./SubTasks";
import { Card, CardHeader, Grid, Fab, TextField, CardActions, Typography, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
const gridSpacing = 10;

var trackingId;

// npm run build runs on "production"
if (process.env.NODE_ENV === 'production') {
    trackingId = process.env.REACT_APP_TRACKING_ID;
    ReactGA.initialize(trackingId);
}


class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            tasks : [
                {
                    id: "0",
                    label: "Task",
                    value: "My Task",
                    muSequence: "1",
                    sigmaSequence: "2"
                }
            ]
        };
    }

    updateTaskLabel = (id, event) => {
        let newValue = event.target.value;
        this.setState( prevState => {
            const {tasks} = prevState;
            let updatedTasks = [...tasks];

            const indexToUpdate = updatedTasks.findIndex(item => item.id === id);
            
            updatedTasks[indexToUpdate] = {
                ...updatedTasks[indexToUpdate],
                value: newValue
            };

            return ({
                ...prevState,
                tasks: updatedTasks
            });
        });
    }

    addTask() {
        this.setState( prevState => {

            let updatedTasks = [...prevState.tasks];

            updatedTasks.push({
                id: uuidv4(),
                label: "Task",
                muSequence: "3",
                sigmaSequence: "4"
            });

            return ({
                tasks: updatedTasks
            });
        });
    }

    deleteTask = (idToDelete) => {

        this.setState(prevState => {
            const {tasks} = prevState;
            const filteredTasks = tasks.filter(item=>item.id!==idToDelete);
            return ({
                ...prevState,
                tasks: filteredTasks
            });
        });
    }

    updateCalculations = (taskId, estimatesArray) => {
        
        this.setState( prevState => {

            const updatedTasks = [...prevState.tasks];
            // find based on Id
            const taskToUpdate = prevState.tasks.find((element) => element.id === taskId);

            // calculate estimated time and standard deviation
            let updatedMuSum = 0;
            let updatedStandardDeviation = 0;

            // goes through each subtask
            estimatesArray.forEach((element) => {
                updatedMuSum += new Number(element.expectedDuration);
                updatedStandardDeviation += Math.pow(element.standardDeviation, 2);
            });

            updatedMuSum = updatedMuSum.toFixed(1);

            updatedStandardDeviation = Math.sqrt(updatedStandardDeviation);
            updatedStandardDeviation = updatedStandardDeviation.toFixed(1);

            // update object
            taskToUpdate.muSequence = updatedMuSum.toString().replace(/^0+/, "");
            taskToUpdate.sigmaSequence = updatedStandardDeviation.toString().replace(/^0+/, "");

            // find and replace object in array
            const stuff = updatedTasks.findIndex(x => x.id === taskId);
            updatedTasks[stuff] = taskToUpdate;

            return ({
                tasks: updatedTasks
            });
        });
    }

    componentDidMount(){
        if (trackingId) {
            console.log({trackingId})
            ReactGA.pageview('/homepage');
        }
    }

    render(){
        const {tasks} = this.state;
        return (
            <Box> 
                <Container
                    disableGutters={true}
                    style={{
                        // grid spacing is based on spacing * 8px
                        marginBottom: `${(gridSpacing / 2) * 8}px`
                    }}
                >
                    <Typography 
                        variant="h1" 
                        align="center"
                    >
                        PERTify
                    </Typography>
                    
                    <Typography  
                        variant="body1"
                        align="center"
                    >
                        The <a href="https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique"> Project Evaluation and Review Technique (PERT)</a> is a statistical tool used in project management, which was designed to analyze and represent the tasks involved in completing a given project.
                        The scheme provides a simple and effective way to convert estimates into probability distributions.
                        <br/>
                        <b>Conveniently, this can also be used to estimate tasks and subtasks!</b>
                            <br/>
                            <br/>
                            Subtask estimates: <b>O</b>ptimistic, <b>N</b>ominal, and <b>P</b>essimistic
                            <br/>
                            <b>O</b>ptimistic = Everything goes right
                            <br/>
                            <b>N</b>ominal  = Greatest chance of success
                            <br/>
                            <b>P</b>essimistic  = Worst case scenario
                            <br/>
                            <br/>
                            Per substask(<b>row</b>) you will see the calculated probability distribution (<b>μ</b>) and standard deviation of the probability distribution (<b>σ</b>). <b>σ</b> measures how uncertain the task is.
                            <br/>
                            At the top left of the card you will find <b>μ sequence</b> which is the sum of all the subtasks&apos; expected duration, and <b>σ sequence</b> which is the standard deviation for all the subtasks.
                        
                    </Typography>
                </Container>

                <Container>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={gridSpacing}>
                            {tasks.map((task) => (
                                <Grid key={`subtask-${task.id}`} item>
                                    <Paper elevation={3}>
                                        <Card>
                                            <CardHeader 
                                                title={
                                                    <TextField 
                                                        type="text"
                                                        value={task.value ? task.value : ""}
                                                        placeholder={task.label}
                                                        label={task.label}
                                                        onChange={(event)=> this.updateTaskLabel(task.id, event)}
                                                    />}
                                                subheader={
                                                    <Fragment>
                                                        <div>
                                                            {`μ sequence: ${task.muSequence}`}
                                                        </div>
                                                        <div>
                                                            {`σ sequence: ${task.sigmaSequence}`}
                                                        </div>
                                                    </Fragment>
                                                }
                                            />
                                            <SubTasks
                                                taskId = {task.id}
                                                updateCalculations = {this.updateCalculations}
                                            />
                                            <CardActions>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={ () => this.deleteTask(task.id) }
                                                >
                                                    Delete Task
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Paper>
                                </Grid>
                            ))}

                            <Grid item>
                                <Fab color="primary" aria-label="add" onClick={ () => this.addTask() }>
                                    <AddIcon/>
                                </Fab>
                            </Grid>

                        </Grid>
                    </Grid>
                </Container>
                <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        // grid spacing is based on spacing * 8px
                        marginTop: `${(gridSpacing) * 8}px`
                    }}
                    // minHeight="100vh"
                    >
                        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </Box>
                </Container>
            </Box>
        );
    }
}

export default App;
