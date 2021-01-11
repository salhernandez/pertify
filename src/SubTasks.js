import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import GridMUI from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { EditingState } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableInlineCellEditing,
    Toolbar,
} from "@devexpress/dx-react-grid-material-ui";

import {
    Plugin,
    Template,
    TemplatePlaceholder,
} from "@devexpress/dx-react-core";

import {
    generateRows,
} from "./demo-data/generator";

const getRowId = row => row.id;

const styles = () => ({
    input: {
        fontSize: "14px",
        width: "90px",
    },
    label: {
        fontSize: "14px",
    },
    container: {
        maxWidth: "18em",
    },
    selector: {
        height: "32px",
    },
});

const StartEditActionSelectorBase = (props) => {
    const { defaultAction, changeAction, classes } = props;
    return (
        <GridMUI
            container
            alignItems="center"
            className={classes.container}
        >
            <Typography
                className={classes.label}
            >
        Start Edit Action:
        &nbsp;
            </Typography>
            <Select
                onChange={e => changeAction(e.target.value)}
                value={defaultAction}
                className={classes.selector}
                input={(
                    <OutlinedInput
                        classes={{ input: classes.input }}
                        labelWidth={0}
                        margin="dense"
                    />
                )}
            >
                <MenuItem value="click">Click</MenuItem>
                <MenuItem value="doubleClick">Double Click</MenuItem>
            </Select>
        </GridMUI>
    );
};
const StartEditActionSelector = withStyles(styles, { name: "StartEditActionSelector" })(StartEditActionSelectorBase);

const SelectTextCheckerBase = (props) => {
    const { isSelectText, changeSelectText, classes } = props;
    return (
        <FormControlLabel
            control={(
                <Checkbox
                    checked={isSelectText}
                    onChange={e => changeSelectText(e.target.checked)}
                    color="primary"
                />
            )}
            classes={{ label: classes.label }}
            label="Select Text On Focus"
        />
    );
};
const SelectTextChecker = withStyles(styles, { name: "SelectTextChecker" })(SelectTextCheckerBase);

const EditPropsPanel = props => (
    <Plugin name="EditPropsPanel">
        <Template name="toolbarContent">
            <SelectTextChecker {...props} />
            <TemplatePlaceholder />
            <StartEditActionSelector {...props} />
        </Template>
    </Plugin>
);

const FocusableCell = ({ onClick, ...restProps }) => (
    <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

export default () => {
    const [columns] = useState([
        { name: "subtask", title: "Subtask" },
        { name: "optimistic", title: "Optimistic" },
        { name: "nominal", title: "Nominal" },
        { name: "pessimistic", title: "Pessimistic" },
        { name: "expectedDuration", title: "μ" },
        { name: "standardDeviation", title: "σ" },
    ]);
    const [rows, setRows] = useState(generateRows());
    const [startEditAction, setStartEditAction] = useState("click");
    const [selectTextOnEditStart, setSelectTextOnEditStart] = useState(true);
    const [editingStateColumnExtensions] = useState([
        { columnName: "expectedDuration", editingEnabled: false },
        { columnName: "standardDeviation", editingEnabled: false },
    ]);

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState 
                    onCommitChanges={commitChanges}
                    columnExtensions={editingStateColumnExtensions} 
                />
                <Table cellComponent={FocusableCell} />
                <TableHeaderRow />
                <Toolbar />
                <EditPropsPanel
                    defaultAction={startEditAction}
                    changeAction={setStartEditAction}
                    isSelectText={selectTextOnEditStart}
                    changeSelectText={setSelectTextOnEditStart}
                />
                <TableInlineCellEditing
                    startEditAction={startEditAction}
                    selectTextOnEditStart={selectTextOnEditStart}
                />
            </Grid>
        </Paper>
    );
};
