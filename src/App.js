import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React, { Component, Fragment } from "react";
import SubTasks from "./SubTasks";
import { Card, CardHeader, Grid, Fab  } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

class App extends Component {
    render(){
        return (
            <Container>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={10}>
                        <Grid key={0} item>
                            <Paper elevation={3}>
                                <Card>
                                    <CardHeader 
                                        title="Task 1"
                                        subheader={
                                            <Fragment>
                                                <div>
                                                    μ: stuff
                                                </div>
                                                <div>
                                                    σ: stuff
                                                </div>
                                            </Fragment>
                                        }
                                    />
                                    <SubTasks/>
                                </Card>
                            </Paper>
                        </Grid>

                        <Grid key={1} item>
                            <Paper elevation={3}>
                                <Card>
                                    <CardHeader 
                                        title="Task 1"
                                        subheader={
                                            <Fragment>
                                                <div>
                                                    μ: stuff
                                                </div>
                                                <div>
                                                    σ: stuff
                                                </div>
                                            </Fragment>
                                        }
                                    />
                                    <SubTasks/>
                                </Card>
                            </Paper>
                        </Grid>

                        <Grid key={2} item>
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default App;
