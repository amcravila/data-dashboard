// var hostCityAQP = document.getElementById('AQP');
// console.log(hostCityAQP);
// hostCityAQP.addEventListener('mouseover', selectedHostCity);
// var hostCityCDMX = document.getElementById('CDMX');
// hostCityCDMX.addEventListener('mouseover', selectedHostCity);
// var hostCityLIM = document.getElementById('LIM');
// hostCityLIM.addEventListener('mouseover', selectedHostCity);
// var hostCitySCL = document.getElementById('SCL');
// hostCitySCL.addEventListener('mouseover', selectedHostCity);

var hostCity = document.querySelectorAll('.hostCity');
for(var i=0; i < hostCity.length; i++) {
  hostCity[i].addEventListener('mouseover', selectedHostCity);
}
function selectedHostCity() {
  var selectedHostCity = document.getElementById('selectedCity').innerHTML = this.id;
}

var studentsClasses = document.querySelectorAll('.studentsClass');
for(var i=0; i < studentsClasses.length; i++) {
  studentsClasses[i].addEventListener('click', selectedClass);
}
function selectedClass(e) {
  var selectedClass = document.getElementById('selectedClass').innerHTML = this.textContent;
  e.stopPropagation();
}

var selectedCity = document.getElementById('selectedCity');
var selectedClass = document.getElementById('selectedClass');



// function students() {
//   var students = document.getElementById('students');
//   students.innerHTML = "";
//   for (turma in data[sede]) {
//     for (i in data[sede][turma]["students"]) {
//       var img = document.createElement("img");
//       img.src = data[sede][turma]["students"][i]["photo"];
//       students.appendChild(img);
//     }
//   }
// }
