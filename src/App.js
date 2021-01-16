import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React, { Component, Fragment } from "react";
import SubTasks from "./SubTasks";
import { Card, CardHeader, Grid, Fab, TextField, CardActions } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";


class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            tasks : [
                {
                    id: "0",
                    label: "Task/Project",
                    value: "My Task",
                    muSum: "1",
                    sigmaSum: "2"
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
                label: "Task/Project",
                muSum: "3",
                sigmaSum: "4"
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
            taskToUpdate.muSum = updatedMuSum.toString().replace(/^0+/, "");
            taskToUpdate.sigmaSum = updatedStandardDeviation.toString().replace(/^0+/, "");

            // find and replace object in array
            const stuff = updatedTasks.findIndex(x => x.id == taskId);
            updatedTasks[stuff] = taskToUpdate;


            return ({
                tasks: updatedTasks
            });
        });
    }

    render(){
        const {tasks} = this.state;
        return (
            <Container>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={10}>

                        {tasks.map((task) => (
                            <Grid key={`subtask-${task.id}`} item>
                                <Paper elevation={3}>
                                    <Card>
                                        <CardHeader 
                                            title={
                                                <TextField 
                                                    type="text"
                                                    value={task.value ? task.value : undefined}
                                                    placeholder={task.label}
                                                    label={task.label}
                                                    onChange={(event)=> this.updateTaskLabel(task.id, event)}
                                                />}
                                            subheader={
                                                <Fragment>
                                                    <div>
                                                        {`μ => sum: ${task.muSum}`}
                                                    </div>
                                                    <div>
                                                        {`σ => sqrt (sum squared): ${task.sigmaSum}`}
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
        );
    }
}

export default App;
