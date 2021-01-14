export function generateRows(taskId) {
    if(taskId === 0){
        return [{
            id:0,
            subtask:"make website",
            optimistic: "1",
            nominal: "3",
            pessimistic: "1",
            expectedDuration: "4.166666666666667",
            standardDeviation: "1.8333333333333333"
        }];
    } else {
        return [{
            id:0,
            subtask:"",
            optimistic: "",
            nominal: "",
            pessimistic: "",
            expectedDuration: "",
            standardDeviation: ""
        }]
    }
}
