import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { EditingState } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableInlineCellEditing,
    TableEditColumn,
    TableEditRow
} from "@devexpress/dx-react-grid-material-ui";

import {
    generateRows,
} from "./demo-data/generator";

const getRowId = row => row.id;

const FocusableCell = ({ onClick, ...restProps }) => (
    <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

const computeExpectedDuration = ({
    optimistic,
    nominal,
    pessimistic
}) => {

    optimistic = parseFloat(optimistic);
    nominal = parseFloat(nominal);
    pessimistic = parseFloat(pessimistic);
    
    const mu = (optimistic + (4 * nominal) + pessimistic) / 6;

    return mu;
};

const computeStandardDeviation = ({
    optimistic,
    pessimistic
}) => {

    optimistic = parseFloat(optimistic);
    pessimistic = parseFloat(pessimistic);
    
    const mu = (pessimistic - optimistic) / 6;

    return mu;
};

export default (props) => {
    const [columns] = useState([
        { name: "subtask", title: "Subtask" },
        { name: "optimistic", title: "Optimistic" },
        { name: "nominal", title: "Nominal" },
        { name: "pessimistic", title: "Pessimistic" },
        { name: "expectedDuration", title: "μ" },
        { name: "standardDeviation", title: "σ" },
    ]);
    const [rows, setRows] = useState(generateRows());
    const [startEditAction] = useState("click");
    const [selectTextOnEditStart] = useState(true);
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
                    expectedDuration: computeExpectedDuration({ 
                        optimistic: row.optimistic,
                        nominal: row.nominal,
                        pessimistic: row.pessimistic
                    }),
                    standardDeviation: computeStandardDeviation({ 
                        optimistic: row.optimistic,
                        pessimistic: row.pessimistic
                    }),
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => {
                return (
                    changed[row.id] 
                        ? 
                        { 
                            ...row,
                            ...changed[row.id],
                            expectedDuration: computeExpectedDuration({ 
                                optimistic: changed[row.id].optimistic ? changed[row.id].optimistic : row.optimistic,
                                nominal: changed[row.id].nominal ? changed[row.id].nominal : row.nominal,
                                pessimistic: changed[row.id].pessimistic ? changed[row.id].pessimistic : row.pessimistic
                            }),
                            standardDeviation: computeStandardDeviation({ 
                                optimistic: changed[row.id].optimistic ? changed[row.id].optimistic : row.optimistic,
                                pessimistic: changed[row.id].pessimistic ? changed[row.id].pessimistic : row.pessimistic
                            }),
                        } 
                        : row
                );
            });
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        props.updateCalculations(props.taskId, changedRows);
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
                <TableInlineCellEditing
                    startEditAction={startEditAction}
                    selectTextOnEditStart={selectTextOnEditStart}
                />
                <TableEditRow />
                <TableEditColumn showAddCommand showDeleteCommand/>
            </Grid>
        </Paper>
    );
};
