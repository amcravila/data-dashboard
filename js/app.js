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

  panelOne.addEventListener('click', studentStatus);
  panelOne.addEventListener('click', netPromoterScore);
  panelOne.addEventListener('click', average);
  panelTwo.addEventListener('click', panelStudents);
}

//função exibir dados na aba ESTUDANTES
function panelStudents() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';

  var studentArray = data[city][cityClass]['students'];
  for (j in data[city][cityClass]['students']) {
    if (studentArray[j]['active'] === true) {
      var ss = studentArray[j]['sprints'];
      var sumSprintTotal = 0, sumSprintTotalH = 0;
      for (var i = 0 ; i < ss.length ;i++) {
        var scoreTech = ss[i]['score']['tech'];
        var scoreHse = ss[i]['score']['hse'];
        sumSprintTotal = sumSprintTotal + scoreTech;
        sumSprintTotalH = sumSprintTotalH + scoreHse;
      }
      var percentTech = (((sumSprintTotal / ss.length) / 1800) * 100).toFixed(2);
      var percentHse = (((sumSprintTotalH / ss.length) / 1200) * 100).toFixed(2);

      // var divActives = document.createElement('div');
      // divActives.setAttribute('id','actives');
      // students.appendChild(divActives);
      // var h2Actives = document.createElement('h2');
      // h2Actives.innerHTML = "ATIVAS";
      // divActives.appendChild(h2Actives);

      var photoStudent = document.createElement('img');
      photoStudent.src = data[city][cityClass]['students'][j]['photo'];
      photoStudent.classList.add('studentPhoto');
      students.appendChild(photoStudent);

      var titlename = document.createElement('div');
      titlename.textContent = studentArray[j]['name'];
      titlename.classList.add('studentName');
      students.appendChild(titlename);

      var divtech = document.createElement('div');
      divtech.textContent = "TECH SKILLS: " + percentTech + '% ' ;
      divtech.classList.add('techSkills');
      students.appendChild(divtech);

      var hse = document.createElement('div');
      hse.textContent = "HSE SKILLS: " + percentHse + '%';
      hse.classList.add('hseSkills');
      students.appendChild(hse);

    } else {

      // var divInactives = document.createElement('div');
      // divInactives.setAttribute('id','Inactives');
      // students.appendChild(divInactives);
      // var h2Inactives = document.createElement('h2');
      // h2Inactives.innerHTML = "INATIVAS";
      // divInactives.appendChild(h2Inactives);

      var photoStudent = document.createElement('img');
      photoStudent.src = data[city][cityClass]['students'][j]['photo'];
      photoStudent.classList.add('studentPhoto');
      students.appendChild(photoStudent);

      var titlename = document.createElement('div');
      titlename.textContent = studentArray[j]['name'];
      titlename.classList.add('studentName');
      students.appendChild(titlename);

      var divtech = document.createElement('div');
      divtech.textContent = "TECH SKILLS: " + '(inativa)';
      divtech.classList.add('techSkills');
      students.appendChild(divtech);

      var hse = document.createElement('div');
      hse.textContent = "HSE SKILLS: " + '(inativa)';
      hse.classList.add('hseSkills');
      students.appendChild(hse);
    }
  }
}


//função exibir dados na aba OVERVIEW
function studentStatus() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';

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

  console.log('total ' +totalStudents);
  console.log('ativas ' +activeStudents);
  console.log('inativas ' +desertedStudents);
  console.log('desligadas   '+ desertionStudentsRate);
}

//media alunas
function average() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';
  var studentArray = data[city][cityClass]['students'];
  console.log(studentArray);

  for (j in data[city][cityClass]['students']) {
    var ss = studentArray[j]['sprints'];
    var sumSprintTotal = 0, sumSprintTotalH = 0;
    for (var i = 0 ; i < ss.length ;i++) {
      var notas = ss[i]['score'];
      var scoreTech = ss[i]['score']['tech'];
      console.log(scoreTech);
      var scoreHse = ss[i]['score']['hse'];
      sumSprintTotal = sumSprintTotal + scoreTech;
      sumSprintTotalH = sumSprintTotalH + scoreHse;
    }
    var percentTech = (((sumSprintTotal / ss.length) / 1800) * 100).toFixed(2);
    var percentHse = (((sumSprintTotalH / ss.length) / 1200) * 100).toFixed(2);

  }
}




//função NPS
function netPromoterScore(){
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';
  var totalPromoters = 0;
  var totalDetractors = 0;
  var numSprints = 0;
  var nps = 0;
  var sprints = "";
  var npsChart = [];
  for(var i = 0; i < data[city][cityClass]['ratings'].length; i++){
    sprints = "S" + (i+1);
    var promotersSprint = data[city][cityClass]['ratings'][i].nps.promoters;
    var detractorsSprint = data[city][cityClass]['ratings'][i].nps.detractors;
    var npsSprint = promotersSprint-detractorsSprint;
    npsChart.push([sprints,npsSprint]);
    totalPromoters += promotersSprint;
    totalDetractors += detractorsSprint;
  }
  numSprints = data[city][cityClass]['ratings'].length;
  nps = (totalPromoters - totalDetractors)/numSprints;
  return npsChart;
}
