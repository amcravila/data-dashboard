var subMenu = document.querySelectorAll('.subMenu');
for(var i=0; i < subMenu.length; i++) {
  subMenu[i].addEventListener('click', showMenu);
  subMenu[i].addEventListener('click', overview);
}

function overview(){
  var sede = subMenu[i].value;
  console.log(sede);
}
