import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React, { Component } from "react";
import SubTasks from "./SubTasks";

class App extends Component {
    render(){

        return (
            <Container>
                <Box>
                    <Paper>
                        <SubTasks/>
                    </Paper>
                </Box>
            </Container>
        );
    }
}

export default App;
