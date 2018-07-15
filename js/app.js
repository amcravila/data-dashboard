var hostCityAQP = document.getElementById('AQP');
hostCityAQP.addEventListener('mouseover', selectedHostCity);
var hostCityCDMX = document.getElementById('CDMX');
hostCityCDMX.addEventListener('mouseover', selectedHostCity);
var hostCityLIM = document.getElementById('LIM');
hostCityLIM.addEventListener('mouseover', selectedHostCity);
var hostCitySCL = document.getElementById('SCL');
hostCitySCL.addEventListener('mouseover', selectedHostCity);

var selectedHostCity = document.getElementById('selectedFilter').innerHTML;

function selectedHostCity() {
  selectedHostCity = this.id;
}

var studentsClasses = document.querySelectorAll('.studentsClass');
for(var i=0; i < studentsClasses.length; i++) {
  studentsClasses[i].addEventListener('click', selectedClass);
}

var selectedClass = document.getElementById('selectedFilter').innerHTML;

function selectedClass() {
  selectedClass = this.textContent;
  console.log(selectedClass);
}



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
