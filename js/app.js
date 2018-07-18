function logout() {
  location.href= "index.html"
}

//função selecionar SEDE
var hostCities = document.querySelectorAll('.hostCity');
for(var i=0; i < hostCities.length; i++) {
  hostCities[i].addEventListener('click', selectedHostCity);
}
var selectedCity = document.getElementById('filterCity');
function selectedHostCity(event) {
  var selectedCity = document.getElementById('filterCity').innerHTML = this.id;
}


var studentsClasses = document.querySelectorAll('.studentsClass');
for(var i=0; i < studentsClasses.length; i++) {
  studentsClasses[i].addEventListener('click', selectedStudentClass);
  studentsClasses[i].addEventListener('click', panel);
}
var selectedClass = document.getElementById('filterClass');
function selectedStudentClass() {
  var selectedClass = document.getElementById('filterClass').innerHTML = this.textContent;
}

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
  panelOne.addEventListener('click', scoreHseSprint);
  panelOne.addEventListener('click', scoreTechSprint);
  panelOne.addEventListener('click', teacherRating);
  panelOne.addEventListener('click', jediRating);
  panelOne.addEventListener('click', satisfaction);
  panelOne.addEventListener('click', achievment);
  panelOne.addEventListener('click', drawChart);
  panelTwo.addEventListener('click', panelStudents);
}

//função exibir dados na aba ESTUDANTES
function panelStudents() {

  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  var divA = document.getElementById('divActiveStudents');
  var divI=document.getElementById('divInactiveStudents');
  students.innerHTML = '';
  divA.innerHTML='';
  divI.innerHTML='';

  var divActiveStudents = document.getElementById('divActiveStudents');
  divActiveStudents.innerHTML = '';
  var pActives = document.createElement('p');
  var pActivesContent = document.createTextNode('ATIVAS');
  pActives.appendChild(pActivesContent);
  document.getElementById('divActiveStudents').appendChild(pActives);

  var divInactiveStudents = document.getElementById('divInactiveStudents');
  divInactiveStudents.innerHTML = '';
  var pInactives = document.createElement('p');
  var pInactivesContent = document.createTextNode('INATIVAS');
  pInactives.appendChild(pInactivesContent);
  document.getElementById('divInactiveStudents').appendChild(pInactives);

  var studentArray = data[city][cityClass]['students'];

  for (j in data[city][cityClass]['students']) {
    if (studentArray[j]['active'] === true) {
      var ss = studentArray[j]['sprints'];
      var sumSprintTotal = 0;
      var sumSprintTotalH = 0;
      for (var i = 0 ; i < ss.length ;i++) {
        var scoreTech = ss[i]['score']['tech'];
        var scoreHse = ss[i]['score']['hse'];
        sumSprintTotal += scoreTech;
        sumSprintTotalH += scoreHse;

      }
      var percentTech = (((sumSprintTotal / ss.length) / 1800) * 100).toFixed(2);
      var percentHse = (((sumSprintTotalH / ss.length) / 1200) * 100).toFixed(2);

      var photoStudent = document.createElement('img');
      photoStudent.src = data[city][cityClass]['students'][j]['photo'];
      photoStudent.classList.add('studentPhoto');
      divActiveStudents.appendChild(photoStudent);

      var titlename = document.createElement('div');
      titlename.textContent = studentArray[j]['name'];
      titlename.classList.add('studentName');
      divActiveStudents.appendChild(titlename);

      var divtech = document.createElement('div');
      divtech.textContent = "TECH SKILLS: " + percentTech + '% ' ;
      divtech.classList.add('techSkills');
      divActiveStudents.appendChild(divtech);

      var hse = document.createElement('div');
      hse.textContent = "HSE SKILLS: " + percentHse + '%';
      hse.classList.add('hseSkills');
      divActiveStudents.appendChild(hse);

    } else {

      var photoStudent = document.createElement('img');
      photoStudent.src = data[city][cityClass]['students'][j]['photo'];
      photoStudent.classList.add('studentPhoto');
      divInactiveStudents.appendChild(photoStudent);

      var titlename = document.createElement('div');
      titlename.textContent = studentArray[j]['name'];
      titlename.classList.add('studentName');
      divInactiveStudents.appendChild(titlename);

      var divtech = document.createElement('div');
      divtech.textContent = "TECH SKILLS: " + '(inativa)';
      divtech.classList.add('techSkills');
      divInactiveStudents.appendChild(divtech);

      var hse = document.createElement('div');
      hse.textContent = "HSE SKILLS: " + '(inativa)';
      hse.classList.add('hseSkills');
      divInactiveStudents.appendChild(hse);
    }
  }
}


//função estudantes ativas e inativas
function studentStatus() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var students = document.getElementById('students');
  students.innerHTML = '';
  divActiveStudents.innerHTML = '';
  divInactiveStudents.innerHTML = '';

  document.getElementById("overview").className = "";
  var activeStudents = 0;
  var desertedStudents = 0;
  var desertionStudentsRate = 0;
  var studentStatusChart = [];
  for(var i=0; i < data[city][cityClass]['students'].length; i++){
    if(data[city][cityClass]['students'][i]['active'] === true ){
      activeStudents++;
    }
    else{
      desertedStudents++;
    }
  }
  totalStudents = activeStudents + desertedStudents;
  desertionStudentsRate = desertedStudents/(totalStudents)*100;
  studentStatusChart.push(['ativas',activeStudents]);
  studentStatusChart.push(['desistentes',desertedStudents]);
  console.log('return ' +studentStatusChart);
  return studentStatusChart;
}

//HSE notas
function scoreHseSprint() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var studentArray = data[city][cityClass]['students'];
  var scoreHseStudents = [];
  const maxSprints = 4;
  const average = 840;
  for (j in studentArray){
    var sprintsQuant = 0;
    var ss = studentArray[j]['sprints'];
    var studentScoreHse = [studentArray[j].name];
    for(var i in ss){
      var scoreHse = ss[i]['score']['hse'];
      studentScoreHse.push(scoreHse);
      sprintsQuant++;
    }
    for(var k = sprintsQuant; k<maxSprints; k++){
      studentScoreHse.push(0);
    }
    studentScoreHse.push(average);
    scoreHseStudents.push(studentScoreHse);
  }
  return scoreHseStudents;
}
//Tech notas
function scoreTechSprint() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var studentArray = data[city][cityClass]['students'];
  var scoreTechStudents = [];
  const maxSprints = 4;
  const average = 1260;
  for (j in studentArray){
    var sprintsQuant = 0;
    var ss = studentArray[j]['sprints'];
    var studentScoreTech = [studentArray[j].name];
    for(var i in ss){
      var scoreTech = ss[i]['score']['tech'];
      studentScoreTech.push(scoreTech);
      sprintsQuant++;
    }
    for(var k = sprintsQuant; k<maxSprints; k++){
      studentScoreTech.push(0);
    }
    studentScoreTech.push(average);
    scoreTechStudents.push(studentScoreTech);
  }
  return scoreTechStudents;
}

//alunas atingiram as medias
function achievment() {
  var city = selectedCity.textContent;
  var cityClass = selectedClass.textContent;
  var studentArray = data[city][cityClass]['students'];
  var scoreTechStudents = [];
  var scoreHseStudents = [];
  var scoreTechArray = [];
  var scoreHseArray = [];
  var sprint = 0;
  var actStudents = 0;

  for (j in studentArray){
    if(studentArray[j].active === true){
      actStudents++;
      var ss = studentArray[j]['sprints'];
      var sumSprintTotal = 0, sumSprintTotalH = 0;
      var numSprints = 0;
      for(var i in ss){
        var sprint = ss[i]['number'];
        var scoreTech = ss[i]['score']['tech'];
        var scoreHse = ss[i]['score']['hse'];
        scoreHseStudents.push([sprint,scoreHse]);
        scoreTechStudents.push([sprint,scoreTech]);
        sumSprintTotal +=scoreTech;
        sumSprintTotalH +=scoreHse;
        numSprints++;
      }
      scoreTechArray.push(parseFloat((sumSprintTotal/numSprints).toFixed(2)));
      scoreHseArray.push(parseFloat((sumSprintTotalH/numSprints).toFixed(2)));

      const averageHse = 840;
      const averageTech = 1260;
      var upAverage = 0;

      var scoreTechTotal = [];
      var scoreHseTotal = [];
      for(var k = 0; k<scoreTechArray.length; k++){
        if(!isNaN(scoreTechArray[k])){
          scoreTechTotal.push(scoreTechArray[k]);
          scoreHseTotal.push(scoreHseArray[k]);

        }
        if(scoreTechArray[k]>= averageTech && scoreHseArray[k]>= averageHse){
          console.log('notas ' +scoreTechArray[k], scoreHseArray[k]);
          upAverage++;
        }
      }
    }
  }
  var achievment = [['Não atingiram', (actStudents-upAverage)],['Atingiram a média', upAverage]];
  return achievment;
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
  console.log(npsChart);
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

//GRAFICOS
google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(studentStatus);
google.charts.setOnLoadCallback(scoreHseSprint);
google.charts.setOnLoadCallback(scoreTechSprint);
google.charts.setOnLoadCallback(netPromoterScore);
google.charts.setOnLoadCallback(teacherRating);
google.charts.setOnLoadCallback(jediRating);
google.charts.setOnLoadCallback(satisfaction);
google.charts.setOnLoadCallback(achievment);

function drawChart() {
  // studentStatus
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Status');
  data.addColumn('number', 'Quant. de alunas')
  data.addRows(studentStatus());
  // Set chart options MELHORAR APARÊNCIA!!
  var options = {
    'title':'Enrollment',
    "chartArea": {top: 50, width:"60%", height:"60%"},
    "width": 430,
    "height": 270
  };
  var chart = new google.visualization.PieChart(document.getElementById("status"));
  chart.draw(data, options);

  //netPromoterScore
  var data1 = new google.visualization.DataTable();
  data1.addColumn('string', 'Sprint');
  data1.addColumn('number', 'NPS')
  data1.addRows(netPromoterScore());
  var options1 ={
    width: 400,
    legend: { position: 'none' },
    xAxis:{
      side: 'bottom',
      label: 'NPS'
    },
    vAxis: {
      title: "Média NPS",
      titleTextStyle: {fontSize: 11},
      ticks: [0,20,40,60,80,100],
      maxValue: 100
    },
    bar: { groupWidth: "90%" }
  }
  var visualization = new google.visualization.ColumnChart(document.getElementById("nps"));
  visualization.draw(data1, options1);

  //teacherRating
  var data2 = new google.visualization.DataTable();
  data2.addColumn('string', 'Sprint');
  data2.addColumn('number', 'Nota')
  data2.addRows(teacherRating());
  var options2 ={
    width: 400,
    legend: { position: 'none' },
    xAxis:{
      side: 'bottom',
      label: 'Sprints'
    },
    vAxis: {
      title: "Nota Professor",
      titleTextStyle: {fontSize: 12},
      ticks: [0,1,2,3,4,5],
      maxValue: 5
    },
    bar: { groupWidth: "90%" }
  }
  var visualization2 = new google.visualization.ColumnChart(document.getElementById("teacher"));
  visualization2.draw(data2, options2);

  //jediRating
  var data3 = new google.visualization.DataTable();
  data3.addColumn('string', 'Sprint');
  data3.addColumn('number', 'Nota')
  data3.addRows(jediRating());
  var options3 ={
    width: 400,
    legend: { position: 'none' },
    xAxis:{
      side: 'bottom',
      label: 'Sprints'
    },
    vAxis: {
      title: "Nota Jedi",
      titleTextStyle: {fontSize: 12},
      ticks: [0,1,2,3,4,5],
      maxValue: 5
    },
    bar: { groupWidth: "90%" }
  }
  var visualization3 = new google.visualization.ColumnChart(document.getElementById("jedi"));
  visualization3.draw(data3, options3);

  //satisfaction
  var data4 = new google.visualization.DataTable();
  data4.addColumn('string', 'Sprint');
  data4.addColumn('number', 'porc. satis')
  data4.addRows(netPromoterScore());
  var options4 ={
    width: 400,
    legend: { position: 'none' },
    xAxis:{
      side: 'bottom',
      label: 'NPS'
    },
    vAxis: {
      title: "Satisfação com a <L>",
      titleTextStyle: {fontSize: 11},
      ticks: [0,20,40,60,80,100],
      maxValue: 100
    },
    bar: { groupWidth: "90%" }
  }
  var visualization4 = new google.visualization.ColumnChart(document.getElementById("satisfacted"));
  visualization4.draw(data4, options4);

  //alunas que atingiram a média
  var data5 = new google.visualization.DataTable();
  data5.addColumn('string', 'Status');
  data5.addColumn('number', 'Quant. de alunas')
  data5.addRows(achievment());
  // Set chart options MELHORAR APARÊNCIA!!
  var options5 = {
    'title':'Achievment',
    "chartArea": {top: 50, width:"60%", height:"60%"},
    "width": 430,
    "height": 270
  };
  var chart2 = new google.visualization.PieChart(document.getElementById("achievment"));
  chart2.draw(data5, options5);

  //HSE score
  var data7 = new google.visualization.DataTable();
  data7.addColumn('string', 'Aluna');
  data7.addColumn('number','S1');
  data7.addColumn('number','S2');
  data7.addColumn('number','S4');
  data7.addColumn('number','S4');
  data7.addColumn('number','Average');
  data7.addRows(scoreHseSprint());

  var options7 = {
    chart: {
      title: 'HSE notas',
      subtitle: 'Sprint 1, Sprint 2, Sprint 3 and Sprint 4: Alunas',
    },
    vAxis: {
      title: "HSE notas",
      titleTextStyle: {fontSize: 12},
      ticks: [0,200,400,600,800,1000,1200],
      maxValue: 1200
    },
    seriesType: 'bars',
    series: {4: {type: 'line'}
    }
  };
  var chart7 = new google.visualization.ColumnChart(document.getElementById("hse"));
  chart7.draw(data7, options7);


  //Tech score
  var data6 = new google.visualization.DataTable();
  data6.addColumn('string', 'Aluna');
  data6.addColumn('number','S1');
  data6.addColumn('number','S2');
  data6.addColumn('number','S4');
  data6.addColumn('number','S4');
  data6.addColumn('number','Average');
  data6.addRows(scoreTechSprint());

  var options6 = {
    chart: {
      title: 'tech notas',
      subtitle: 'Sprint 1, Sprint 2, Sprint 3, Sprint 4, and Average: Alunas',
    },
    vAxis: {
      title: "tech notas",
      titleTextStyle: {fontSize: 12},
      ticks: [0,300,600,900,1200,1500,1800],
      maxValue: 1800
    },
    seriesType: 'bars',
    series: {4: {type: 'line'}
    }
  };
  var chart6 = new google.visualization.ColumnChart(document.getElementById("tech"));
  chart6.draw(data6, options6);
}
