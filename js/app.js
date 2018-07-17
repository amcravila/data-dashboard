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
  panelOne.addEventListener('click', teacherRating);
  panelOne.addEventListener('click', jediRating);
  panelOne.addEventListener('click', satisfaction);
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
    }

    var sectionStudents = document.getElementById('students');

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
  }
}


//função estudantes ativas e inativas
function studentStatus() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';
  var activeStudents = 0;
  var desertedStudents = 0;
  var desertionStudentsRate = 0;
  var studentStatusChart = [];
  for(var i=0; i<data[city][cityClass]['students'].length; i++){
    if(data[city][cityClass]['students'][i].active === true ){
      activeStudents++;
    }
    else{
      desertedStudents++;
    }
  }
  totalStudents = activeStudents + desertedStudents;
  desertionStudentsRate = desertedStudents/(totalStudents)*100;
  studentStatusChart.push(activeStudents);
  studentStatusChart.push(desertedStudents);
  console.log(studentStatusChart);
  return studentStatusChart;
}

//media alunas
function average() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';
  var studentArray = data[city][cityClass]['students'];
  // console.log(studentArray);
  
  for (j in data[city][cityClass]['students']) {
    var ss = studentArray[j]['sprints'];
    var sumSprintTotal = 0, sumSprintTotalH = 0;
    for (var i = 0 ; i < ss.length ;i++) {
      var notas = ss[i]['score'];
      var scoreTech = ss[i]['score']['tech'];
      // console.log(scoreTech);
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
  var totalPromoters = 0;
  var totalDetractors = 0;
  var numSprints = 0;
  var nps = 0;
  var npsChart = [];
  for(var i = 0; i < data[city][cityClass]['ratings'].length; i++){
    var sprints = "S" + (i+1);
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

//Teacher rating
function teacherRating(){
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var teacherChart = [];
  var ratingTotal = 0;
  var averageRating = 0;
  var i;
  for(var i = 0; i < data[city][cityClass]['ratings'].length; i++){
    var sprints = "S" + (i+1);
    var ratingT = data[city][cityClass]['ratings'][i].teacher;
    teacherChart.push([sprints,ratingT]);
    ratingTotal +=ratingT;
  }
  averageRating = (ratingTotal/i).toFixed(2);
  console.log(averageRating);
  console.log(teacherChart);
  return teacherChart;
}

//Jedi rating
function jediRating(){
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var jediChart = [];
  var ratingTotal = 0;
  var averageRating = 0;
  var i;
  for(var i = 0; i < data[city][cityClass]['ratings'].length; i++){
    var sprints = "S" + (i+1);
    var ratingJ = data[city][cityClass]['ratings'][i].jedi;
    jediChart.push([sprints,ratingJ]);
    ratingTotal +=ratingJ;
  }
  averageRating = (ratingTotal/i).toFixed(2);
  console.log(averageRating);
  console.log(jediChart);
  return jediChart;
}

//Students satisfaction
function satisfaction(){
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var satisfactionChart = [];
  var satisfactionAverage = 0;
  for(var i = 0; i < data[city][cityClass]['ratings'].length; i++){
    var sprints = "S" + (i+1);
    var noCumpleSprint = data[city][cityClass]['ratings'][i]['student']['no-cumple'];
    var cumpleSprint = data[city][cityClass]['ratings'][i].student.cumple;
    var superaSprint = data[city][cityClass]['ratings'][i].student.supera;
    var satisfacted = cumpleSprint + superaSprint;
    satisfactionChart.push([sprints, satisfacted]);
    satisfactionAverage += satisfacted;
  } 
  satisfactionAverage = satisfactionAverage/i;
  console.log(satisfactionAverage);
  console.log(satisfactionChart);
  return satisfactionChart;
}