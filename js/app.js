//função selecionar SEDE
var hostCities = document.querySelectorAll('.hostCity');
for(var i=0; i < hostCities.length; i++) {
  hostCities[i].addEventListener('mouseover', selectedHostCity);
}

var selectedCity = document.getElementById('filterCity');

function selectedHostCity(event) {
  var selectedCity = document.getElementById('filterCity').innerHTML = this.id;
}


//função selecionar TURMA
var studentsClasses = document.querySelectorAll('.studentsClass');
for(var i=0; i < studentsClasses.length; i++) {
  studentsClasses[i].addEventListener('click', selectedStudentClass);
  studentsClasses[i].addEventListener('click', panel);
  // studentsClasses[i].addEventListener('mouseup', closeMenu);
}

var selectedClass = document.getElementById('filterClass');

function selectedStudentClass() {
  var selectedClass = document.getElementById('filterClass').innerHTML = this.textContent;
}

// function closeMenu(){
//   var menuDrop = document.getElementsByClassName('dropDown');
//   for(var i=0; i < menuDrop.length; i++) {
//     menuDrop.setAttribute('id', 'hide');
//   }
// }


//função exibir PAINE/ABAS
function panel() {
  var panelOne = document.createElement('li');
  var tabOverview = document.createTextNode('OVERVIEW');
  panelOne.appendChild(tabOverview);
  document.getElementById('tabs').appendChild(panelOne);

  var panelTwo = document.createElement('li');
  var tabStudents = document.createTextNode('ESTUDANTES');
  panelTwo.appendChild(tabStudents);
  document.getElementById('tabs').appendChild(panelTwo);

  var studentsClasses = document.querySelectorAll('.studentsClass');
    for(var i=0; i < studentsClasses.length; i++) {
    studentsClasses[i].removeEventListener('click', panel);
  }

  panelOne.addEventListener('click', panelOverview);
  panelTwo.addEventListener('click', panelStudents);
}



//função exibir dados na aba ESTUDANTES
function panelStudents() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';

//função estudantes ativas e inativas
  var activeStudents = 0;
  var desertionStudentsRate = 0;
  var desertedStudents = 0;

  for(var i=0; i<data[city][cityClass]['students'].length; i++){
     if(data[city][cityClass]['students'][i].active === true ){
       activeStudents++;
     }
     else{
       desertedStudents++;
     }
   }



//está duplicando, entrando no array RATINGS
  for (i in data[city][cityClass]) {
    for (j in data[city][cityClass]['students']) {
      var img = document.createElement('img');
      img.src = data[city][cityClass]['students'][j]['photo'];
      students.appendChild(img);
      var pName = document.createElement('p');
      var studentName = document.createTextNode(data[city][cityClass]['students'][j]['name']);        pName.appendChild(studentName);
      students.appendChild(pName);
      }
    }
}



//função exibir dados na aba OVERVIEW
function panelOverview() {
  alert("clicou Overview");
}
