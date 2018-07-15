// var subMenu = document.querySelectorAll('.subMenu');
// for(var i=0; i < subMenu.length; i++) {
//   subMenu[i].addEventListener('click', showMenu);
//   subMenu[i].addEventListener('click', overview);
// }
//
// function overview(){
//   var sede = subMenu[i].value;
//   console.log(sede);
// }

var studentsClasses = document.querySelectorAll('.studentsClass');
for(var i=0; i < studentsClasses.length; i++) {
  studentsClasses[i].addEventListener('click', students);
  studentsClasses[i].addEventListener('click', overview);
}

function students() {
  console.log ('função estudantes OK');
}

//código da NOSSASPROGRAMADORAS
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
