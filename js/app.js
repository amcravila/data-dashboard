var subMenu = document.querySelectorAll('.subMenu');
for(var i=0; i < subMenu.length; i++) {
  subMenu[i].addEventListener('click', showMenu);
}

function showMenu() {
 var itemMenu = this.getElementsByClassName('itemMenu')[0];
 if (itemMenu.classList.contains('hide')) {
   itemMenu.classList.remove('hide');
   itemMenu.classList.add('show');
 // } else {
 //   itemMenu.classList.remove('show');
 //   itemMenu.classList.add('hide');
 // }
}
}
//https://www.w3schools.com/howto/howto_js_dropdown.asp
// function showMenu() {
//   if (!event.target.matches('.subMenu')) {
//
//     var itemMenu = document.getElementsByClassName('itemMenu');
//     for (var i = 0; i < itemMenu.length; i++) {
//       var openDropdown = itemMenu[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }
