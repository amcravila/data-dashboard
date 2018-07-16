//função selecionar SEDE
var hostCities = document.querySelectorAll('.hostCity');
for(var i=0; i < hostCities.length; i++) {
  hostCities[i].addEventListener('click', selectedHostCity);
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
//   var menuDrop = document.getElementsByClassName('dropDown')[0];
//   for(var i=0; i < menuDrop.length; i++) {
//     menuDrop.setAttibuteID('id','hide');
//   }
// }


//função exibir PAINEL/ABAS
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

//está duplicando, entrando no array RATINGS
  for (i in data[city][cityClass]) {
    for (j in data[city][cityClass]['students']) {
      var img = document.createElement('img');
      img.setAttribute('id','studentPhoto');
      img.src = data[city][cityClass]['students'][j]['photo'];
      students.appendChild(img);

      var sName = document.createElement('span');
      sName.setAttribute('id','studentName');
      var studentName = document.createTextNode(data[city][cityClass]['students'][j]['name']);
      sName.appendChild(studentName);
      students.appendChild(sName);

      var tech = document.createElement('span');
      tech.textContent = "TECH SKILLS";
      tech.setAttribute('id','techSkills');
      var techSkills = document.createTextNode(data[city][cityClass]['students'][j]['sprints']['tech']);
      tech.appendChild(techSkills);
      students.appendChild(tech);
      }
    }
}



//função exibir dados na aba OVERVIEW
function panelOverview() {
  alert("clicou Overview");

  //função estudantes ativas e inativas
    var activeStudents = 0;
    var desertedStudents = 0;
    var desertionStudentsRate = 0;

    for(var i=0; i<data[city][cityClass]['students'].length; i++){
       if(data[city][cityClass]['students'][i].active === true ){
         activeStudents++;
       }
       else{
         desertedStudents++;
       }
     }
     totalStudents = activeStudents + desertedStudents;
     desertionStudentsRate = desertedStudents/(desertedStudents+activeStudents)*100;


//função NPS
  var totalPromoters = 0;
  var totalDetractors = 0;
  var numSprints = 0;
  var nps = 0;
  for(var i = 0; i < data[city][cityClass]['ratings'].length; i++){
    totalPromoters += data[city][cityClass]['ratings'][i].nps.promoters;
    totalDetractors += data[city][cityClass]['ratings'][i].nps.detractors;
  }
  numSprints = data[city][cityClass]['ratings'].length;
  nps = (totalPromotors - totalDetractors)/numSprints;


}
