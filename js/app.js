// var studentsClasses = document.querySelectorAll('.studentsClass');
// for(var i=0; i < studentsClasses.length; i++) {
//   studentsClasses[i].addEventListener('click', students);
//   studentsClasses[i].addEventListener('click', overview);
// }

// function overview(){
//   var sede = subMenu[i].value;
//   console.log(sede);
// }

var dropMenuSede = document.getElementById('dropMenuSede');
var dropMenuTurma = document.getElementById('dropMenuTurma');
dropMenuSede.addEventListener("change", studentsSede);
dropMenuTurma.addEventListener("change", studentsTurma);

function studentsSede() {
  var sede = dropMenuSede.value;
  var listaProgramadoras = document.getElementById("students");
    listaProgramadoras.innerHTML = "";
    for (turma in data[sede]){
      for (i in data[sede][turma]["students"]){
        var img = document.createElement("img");
        img.src = data[sede][turma]["students"][i]["photo"];
        listaProgramadoras.appendChild(img);
      }
    }
  };

  function studentsTurma() {
      var sede = dropMenuSede.value;
   var turma = dropMenuTurma.value;
   var listaProgramadoras = document.getElementById("students");
     listaProgramadoras.innerHTML = "";
     for (turma in data[sede]){
       for (i in data[sede][turma]["students"]){
         var img = document.createElement("img");
         img.src = data[sede][turma]["students"][i]["photo"];
         listaProgramadoras.appendChild(img);
       }
     }
   };


  // var students = document.getElementById('students');
  // students.innerHTML = "";
  // for (turma in data[sede]) {
  //   for (i in data[sede][turma]["students"]) {
  //     var img = document.createElement("img");
  //     img.src = data[sede][turma]["students"][i]["photo"];
  //     students.appendChild(img);
  //   }
  // }
// }
