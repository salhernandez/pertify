import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React, { Component, Fragment } from "react";
import SubTasks from "./SubTasks";
import { Card, CardHeader, Grid, Fab, TextField   } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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
                                        title={
                                            <TextField 
                                                id="text"
                                                type="text"
                                                placeholder="Task/Project Name"
                                                label="Task/Project Name"
                                            />}
                                        subheader={
                                            <Fragment>
                                                <div>
                                                    {"μ => sum: ..."}
                                                </div>
                                                <div>
                                                    {"σ => sqrt (sum squared): ..."}
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
                                        title={
                                            <TextField 
                                                id="text"
                                                type="text"
                                                placeholder="Task/Project Name"
                                                label="Task/Project Name"
                                            />}
                                        subheader={
                                            <Fragment>
                                                <div>
                                                    {"μ => sum: ..."}
                                                </div>
                                                <div>
                                                    {"σ => sqrt (sum squared): ..."}
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
