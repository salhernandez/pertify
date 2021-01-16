export function generateRows(taskId) {
    if(taskId === 0){
        return [{
            id:0,
            subtask:"make website",
            optimistic: 1,
            nominal: 3,
            pessimistic: 12,
            expectedDuration: 4.2,
            standardDeviation: 1.8
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
