/* 
* --------------------------------------------------------------------------------------------
* @case  : Pelamar Pekerjaan
* @author: Ikhsan Fauji
* --------------------------------------------------------------------------------------------
*/

/* 
* --------------------------------------------------------------------------------------------
* atribut / variable jobRequirement adalah yang menjadi syarat pertama intuk melamar
* jika tidak terpenuhi maka pelamar akan di tolak
* --------------------------------------------------------------------------------------------
*/

// Job requirement is major of Informatic Engineering (IE)
let jobRequirement = "IE";


/* 
* --------------------------------------------------------------------------------------------
* atribut / variable status adalah status proses lamaran dari pelamar
* Submit            ==> Pertama kali daftar
* Psikotest         ==> Status jika pelamar lolos ke tahap Pikotest
* User Verification ==> Tahap dimana hasil psikotest di lihat oleh user 
*                       untuk kemudian di tetntukan lanjut atau tidak ke tahap User Interview
* User Interview    ==> Tahap User Interview
* Accepted          ==> Jika Pelamar diterima
* Reject            ==> Jika Pelamar ditolak
* --------------------------------------------------------------------------------------------
*/

// applicants status
let status = "Submit";


/* 
* --------------------------------------------------------------------------------------------
* atribut / variable testResult merupakan data hasil dari setiap seleksi yang dijalani oleh pelamar
* --------------------------------------------------------------------------------------------
*/

// test result data
let testResult = null;


/* 
* --------------------------------------------------------------------------------------------
* atribut / variable applicant mewakili pelamar beserta data dari pelamar atau CV
* --------------------------------------------------------------------------------------------
*/

// applicants data
let applicant = { name: "Ikhsan Fauji", major: "IE"};


/* 
* --------------------------------------------------------------------------------------------
* class SelectionResult diguakan untuk membuat format dari hasil seleksi pertama kali
* atribut :
* selection = Tahap seleksi
* name      = Nama dari pelamar
* value     = Nilai dari setiap seleksi
* next      = Status untuk mengklasifikasikan lajut ketahap selanjutnya atau tidak
* --------------------------------------------------------------------------------------------
*/

// Selection Result
class SelectionResult {

  constructor(selection, name, value, verify){
    this.selection = selection;
    this.name = name;
    this.value = value;
    this.next = verify;
  }
  
}


/* 
* --------------------------------------------------------------------------------------------
* fungsi getRandomValue() digunakan untuk mencari nilai secara random pada setiap seleksi
* --------------------------------------------------------------------------------------------
*/

// get random value
function getRandomValue() {
  return Math.floor(Math.random() * (100 - 50 + 1) ) + 50; 
}


/* 
* --------------------------------------------------------------------------------------------
* apply() => Proses pertama pelamar submit lamaran / CV ke HR
* --------------------------------------------------------------------------------------------
*/

// step 1
function apply(data) {
  console.log("1. Aplicants submit CV to HR...");
  console.log("---------------------------------");

  hr(data, review);
}


/* 
* --------------------------------------------------------------------------------------------
* HR bertugas Mereview Job Requirements, Mengirim notifikasi dan follow up terhadap User
* --------------------------------------------------------------------------------------------
*/

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


/* 
* --------------------------------------------------------------------------------------------
* Proses review data data lamaran dari user sesuai jobRequirement, jika tidak sesuai maka akan ditolak
* --------------------------------------------------------------------------------------------
*/

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


/* 
* --------------------------------------------------------------------------------------------
* Proses Psikotest, pada proses ini pelamar akan mendapatkan nilai psikotest dari hasil 
* generateRandomValue( asumsinya adalah hasil dari psikotest yang dilakukan oleh pelamar
* kemudian pelamar menyerahkan hasil Psikotest kepada HR
* --------------------------------------------------------------------------------------------
*/
// step 4
function psikotest(aplicant, callback) {
    let val = getRandomValue();
    aplicant.value = val; 
    aplicant.selection = "Psikotest";
    // step 5
    callback(aplicant);
}


/* 
* --------------------------------------------------------------------------------------------
* Setelah HR memberikan data psikotest pelamar user akan memverivikasi apakah pelamar layak lanjut
* ketahap selanjutnya dengan kriteria nilai verivikasi >= 70, kemudian user mengkonfirmasi kepada HR
* --------------------------------------------------------------------------------------------
*/

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
      reject(aplicant);
    }
  });
}


/* 
* --------------------------------------------------------------------------------------------
* Jika HR Sudah memberikan notifikasi kepada pelamar, pelamar akan datang untuk interview User
* Pada tahap ini grade nilai untuk lulus adalah >= 75
* untuk mempersingkat waktu agar dapat langsung terlihat hasilnya saya set nilai pelamar ke 80
* Jika ingin melihat hasil dari random, aktifkan fungsi getRandomValue()
* Setelah proses interview, User akan mengkonfirmasi hasil Interview kepada HR
* --------------------------------------------------------------------------------------------
*/

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
      reject(aplicant);
    }
  });
}


/* 
* --------------------------------------------------------------------------------------------
* Callback lolos seleksi
* --------------------------------------------------------------------------------------------
*/

// step 3, 6, 7, 9, 10
function success(data) {  
  hr(data, sendNotification);
}


/* 
* --------------------------------------------------------------------------------------------
* Callback gagal seleksi
* --------------------------------------------------------------------------------------------
*/

// step 3, 6, 7, 9, 10, 11
function fail(data) {
  data.next = false;
  hr(data, sendNotification);
}


/* 
* --------------------------------------------------------------------------------------------
* Proses pelamar memberikan hasil psikotest kepada HR
* --------------------------------------------------------------------------------------------
*/

// step 5
function giveTestResult(data) {
  console.log("5. Applicants give the result of Psikotest to HR");
  console.log(testResult);
  console.log("---------------------------------");

  hr(data);
}


/* 
* --------------------------------------------------------------------------------------------
* Proses mengirimkan notifikasi kepada pelamar oleh HR
* --------------------------------------------------------------------------------------------
*/

// step 6, 7, 9, 10, 11
// send notification for applicants by HR
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
      // step 11
      console.log("11. HR give notification to applicants about the result of User Interview...");
      console.log("---------------------------------");

      status = "Accepted";
    } 
  } else {
    status = "Reject";
  }
}


/* 
* --------------------------------------------------------------------------------------------
* Jika pelamar diterima, pelamar akan mulai bekerja di kantor
* --------------------------------------------------------------------------------------------
*/

// step 12
function workingInCompany(data) {
  console.log("Welcome "+ data.name +" this is your first day in our Company.");
  console.log("Happy working");
}


/* 
* --------------------------------------------------------------------------------------------
* Proses cek notifikasi
* --------------------------------------------------------------------------------------------
*/

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

    // step 12
    workingInCompany(testResult);
  } else {
    console.log(status +" notification");
    console.log("You not acceepted");    
    console.log(testResult);
  }
}


/* 
* --------------------------------------------------------------------------------------------
* Proses mulai pendaftaran
* --------------------------------------------------------------------------------------------
*/

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
}, 2500);
