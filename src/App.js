import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React, { Component, Fragment } from "react";
import SubTasks from "./SubTasks";
import { Card, CardHeader, Grid, Fab, TextField   } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            tasks : [
                {
                    id: 0,
                    label: "Task/Project",
                    muSum: "1",
                    sigmaSum: "2"
                }
            ]
        };
    }

    addTask() {
        this.setState( prevState => {

            let updatedTasks = [...prevState.tasks];

            updatedTasks.push({
                id: (prevState.tasks.length -1 ) + 1,
                label: "Task/Project",
                muSum: "3",
                sigmaSum: "4"
            });

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

                        {tasks.map((task, index) => (
                            <Grid key={`subtask-${index}`} item>
                                <Paper elevation={3}>
                                    <Card>
                                        <CardHeader 
                                            title={
                                                <TextField 
                                                    type="text"
                                                    placeholder={task.label}
                                                    label={task.label}
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
                                            hola = {task.id}
                                        />
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
