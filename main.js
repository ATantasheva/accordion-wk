function accordion(selector, onlyOne=false) { //дополнительный параметр для разграничения функций
  const accordionWrapper = document.querySelector(selector);
  const accordionBtns = accordionWrapper.querySelectorAll(".accordion__btn");
  accordionBtns.forEach(function (btn) {

if(onlyOne) {
  btn.addEventListener("click", showOnlyCurrentContent);
} else {
  btn.addEventListener("click", showContent);
}

    function showContent(event) {
      //чтобы по нажатию кнопки ничего не отправлялось если она находится в <form></form>
      event.preventDefault();

      //находим родителя кнопки
      const currentItem = btn.closest(".accordion__item");
      // ищем в родители нужный селектор
      const currentContent = currentItem.querySelector(".accordion__content");

      //ставим класс на item
      currentItem.classList.toggle("active");

      if (currentItem.classList.contains("active")) {
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
      } else {
        currentContent.style.maxHeight = 0;
      }
    }

    //чтобы открывался только 1 блок

    function showOnlyCurrentContent(event) {
      event.preventDefault();

      //находим родителя кнопки
      const currentItem = btn.closest(".accordion__item");
      // ищем в родители нужный селектор
      const currentContent = currentItem.querySelector(".accordion__content");

      if (currentItem.classList.contains("active")) {
        currentItem.classList.remove("active");
        currentContent.style.maxHeight = 0;
      } else {

        //убираем все активные блоки
        //ищем внутри accordionWrapper чтобы не задевать другие аккордионы на странице
        const accordionItems = accordionWrapper.querySelectorAll(".accordion__item");
        accordionItems.forEach(function (item) {
          item.classList.remove("active");
        });
     //скрываем все открытые панели
        const contentBlocks = accordionWrapper.querySelectorAll(".accordion__content");
        contentBlocks.forEach(function (block) {
         block.style.maxHeight = 0;
        });

        //делаем активным текущий блок
        currentItem.classList.add("active");
        //отображаем текущий контент
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
     
      }
    }
  });
}

accordion("#accordion-1");
accordion("#accordion-2", true); //если передаем параметр true то локига берется с функции которая открывает ТОЛЬКО один блок