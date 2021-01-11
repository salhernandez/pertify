import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React, { Component, Fragment } from "react";
import SubTasks from "./SubTasks";
import { Card, CardHeader  } from '@material-ui/core';

class App extends Component {
    render(){

        return (
            <Container>
                <Box>
                    <Paper>
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
                </Box>
            </Container>
        );
    }
}

export default App;
