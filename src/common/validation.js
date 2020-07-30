export const AddTask = (data) => {
    console.log('ddddddddddddd',data)
    return new Promise((resolve, reject) => {
        let errors = {};
        let formIsValid = true;

        // Task
        if (data.Task.length == 0) {
            formIsValid = false;
            errors["Task"] = "Task is required!";
            reject(errors)
        }
        
        // asign user Name
        if (data.assignTo.length == 0) {
            formIsValid = false;
            errors["assignTo"] = "Assign User is required!";
            reject(errors)
        }
        if (data.assignTo.length > 0) {
            if (!(data.assignTo.match(/^[a-zA-Z ]{2,30}$/))) {
               formIsValid = false;
               errors["assignTo"] = "Provided Name is Invalid";
               reject(errors)
            }
         }

        // asign Status Name
        if (data.status.length == 0) {
            formIsValid = false;
            errors["status"] = "Task status is required!";
            reject(errors)
        }

        resolve(formIsValid)

    })
}