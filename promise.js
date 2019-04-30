// Job requirement is major of Informatic Engineering (IE)
let jobRequirement = "IE";

let status = "Submit";
let testResult = null;
let failTest = null;

let applicant = { name: "Ikhsan Fauji", major: "IE", verify: false};

class SelectionResult {

  constructor(selection, name, value, verify){
    this.selection = selection;
    this.name = name;
    this.value = value;
    this.next = verify;
  }
  
}

function getRandomValue() {
  return Math.floor(Math.random() * (100 - 50 + 1) ) + 50; 
}

// step 1
function apply(data) {
  console.log("1. Aplicants submit CV to HR...");
  console.log("---------------------------------");

  hr(data, review);
}

function hr(data, callback) {
  if (callback) {
    callback(data); 
  } else {
    // step 5
    console.log("6. HR follow up psikotest result to User");
    console.log("---------------------------------");
    user(data).then(success, fail);
  }
}

// step 2
function review(data) {
  console.log("2. CV review process...");
  console.log("---------------------------------");

  let selection = "HR";
  if (data.major === jobRequirement) {
    testResult = new SelectionResult(selection, data.name, null, true);
    console.log("3. HR give notification to applicants about Psikotest...");
    console.log(testResult);
    console.log("---------------------------------");

    status = "Psikotest";
  } else {
    console.log("3. HR reject applicants because of majors is not match.");
    console.log(testResult);
    console.log("---------------------------------");

    testResult = new SelectionResult(selection, data.name, null, false);
    status = "Reject";    
  }
}

// step 3
function psikotest(aplicant, callback) {
    let val = getRandomValue();
    aplicant.value = val; 
    aplicant.selection = "Psikotest";
    // step 4
    callback(aplicant);
}

// step 5
function user(aplicant) {
  return new Promise((resolve, reject) => {
    let dataPoint = getRandomValue();
    aplicant.value = dataPoint; 
    aplicant.selection = "User Verification";

    console.log("7. User send confirmation Interview to HR");
    console.log("---------------------------------");

    if (dataPoint >= 70) {
      resolve(aplicant);
    } else {
      aplicant.next = false;
      reject(aplicant);
    }
  });
}

// step 8
function userInterview(aplicant) {
  return new Promise((resolve, reject) => {
    let interviewPoint = 80; //getRandomValue();
    aplicant.value = interviewPoint; 
    aplicant.selection = "User Interview";

    console.log("10. User give confirmation about result of Interview to HR");
    console.log("---------------------------------");

    if (interviewPoint >= 75) {
      resolve(aplicant);
    } else {
      aplicant.next = false;
      reject(aplicant);
    }
  });
}

// step 6 & 9
function success(data) {  
  hr(data, sendNotification);
}
// step 6 & 9
function fail(data) {
  hr(data, sendNotification);
}

// step 4
function giveTestResult(data) {
  console.log("5. Applicants give the result of Psikotest to HR");
  console.log(testResult);
  console.log("---------------------------------");

  hr(data);
}

// step 6, 7, 9, 10
// sen notification for applicants by HR
function sendNotification(data) {  
  if (data.next === true){
    if (data.selection === "Psikotest") {
      status = "User Verification";
    } else if (data.selection === "User Verification") {
      
      console.log("8. HR give notification to applicants about User Interview...");
      console.log(testResult);
      console.log("---------------------------------");
      
      status = "User Interview";
    } else if (data.selection === "User Interview") {
      console.log("11. HR give notification to applicants about the result of User Interview...");
      console.log("---------------------------------");

      status = "Accepted";
    } 
  } else {
    status = "Reject";
  }
}

// step 11
function workingInCompany(data) {
  console.log("Welcome "+ data.name +" this is your first day.");
  console.log("Happy working");
}

function notif(status) {
  if (status == "Psikotest") {
    console.log("4. Applicants follow up Psikotest");
    console.log("---------------------------------");
    
    psikotest(testResult, giveTestResult);      
  } else if (status == "User Interview") {
    console.log("9. Applicants follow up User Interview");
    console.log("---------------------------------");

    userInterview(testResult).then(success, fail);      
  } else if (status == "Accepted") {
    console.log(status +" notification");
    console.log("Congratulation you accepted in our company");  
    console.log(testResult);
    console.log("---------------------------------");

    // step 11
    workingInCompany(testResult);
  } else {
    console.log(status +" notification");
    console.log("You not acceepted");    
    console.log(testResult);
  }
}

// apply job
apply(applicant);

// check notif
setTimeout(() => {
  notif(status);
}, 500);

setTimeout(() => {
  notif(status);
}, 1500);

setTimeout(() => {
  notif(status);
}, 2000);
