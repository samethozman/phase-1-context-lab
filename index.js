/* Your Code Here */
function createEmployeeRecord([string1, string2, string3, number]) {
    return {
        firstName: string1,
        familyName: string2,
        title: string3,
        payPerHour: number,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(x => createEmployeeRecord(x))
}

function createTimeInEvent(dateStamp) {
    const hour = dateStamp.split(' ')[1]
    const date = dateStamp.split(' ')[0]
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    }
    //return employee record
    const timeInEvents = this.timeInEvents
    timeInEvents.push(timeInObj)
    return this
}

function createTimeOutEvent (dateStamp) {
    const hour = dateStamp.split(' ')[1]
    const date = dateStamp.split(' ')[0]
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    }
    //return employee record
    const timeOutEvents = this.timeOutEvents
    timeOutEvents.push(timeOutObj)
    return this
}

function hoursWorkedOnDate (dateStamp) {
    let timeIn = ''
    let timeOut = ''
    //find timeIn events that match date stamp
    this.timeInEvents.forEach((x) => {
        if (x.date === dateStamp) {
            timeIn = x.hour
        }
    })
    //find timeOut events that match date stamp
    this.timeOutEvents.forEach((x) => {
        if (x.date === dateStamp) {
            timeOut = x.hour
        }
    })
    //calculate hours worked 
    const hoursWorked = (timeOut - timeIn)/100
    //return hours worked as integer
    return hoursWorked
    
}

function wagesEarnedOnDate (dateStamp) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateStamp)
    const wagesEarned = hoursWorked * this.payPerHour
    return wagesEarned
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, name) {
    return srcArray.find(emp => emp.firstName === name)
}

function calculatePayroll (array) {
    //reduce method 
    const reducer = (previousValue, employee) => previousValue + allWagesFor.call(employee)
    return array.reduce(reducer, 0)
    
    // //this method below also works
    // let totalPayroll = 0
    // array.forEach(employee => {
    //     totalPayroll = totalPayroll + allWagesFor.call(employee)
    // })
    // //return sum of pay owed to all employees
    // return totalPayroll
}



//examples for practice
// createEmployeeRecords([["moe", "sizlak", "barkeep", 2],
//         ["bartholomew", "simpson", "scamp", 3]])

// const example = createEmployeeRecord(["alex", "sizlak", "barkeep", 2])
// createTimeInEvent.call(example, "2015-02-26 1100")
// createTimeInEvent.call(example, "2015-02-27 1100")
// createTimeInEvent.call(example, "2015-02-28 1100")

// createTimeOutEvent.call(example, "2015-02-26 1700")
// createTimeOutEvent.call(example, "2015-02-27 1700")
// createTimeOutEvent.call(example, "2015-02-28 1700")

// const example2 = {...example}
// example2.firstName = 'sally'

// const empArray = [{...example}, {...example2}]