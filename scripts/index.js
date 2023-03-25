
const initialCards = [
    {
      name: 'Вологда',
      link: './images/vologda.jpg'
    },
    {
      name: 'Череповец',
      link: './images/cherepovets.jpg'
    },
    {
      name: 'Андома гора',
      link: './images/andoma.jpg'
    },
    {
      name: 'Белозерск',
      link: './images/belozersk.jpg'
    },
    {
      name: 'Кирилло-Белозерский монастырь',
      link: './images/monastyr.jpg'
    },
    {
      name: 'Великий Устюг',
      link: './images/ustug.jpg'
    }
  ]; 


let formElementEdit = document.querySelector('.popup__form_edit'); // Находим форму редактирования профиля в DOM 
let formElementAdd = document.querySelector('.popup__form_add'); // получаем форму добавления картинки
// Находим поля формы в DOM
let nameInput = formElementEdit.querySelector('.popup__field_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElementEdit.querySelector('.popup__field_type_job'); // Воспользуйтесь инструментом .querySelector()
let editButton = document.querySelector('.profile__edit-button'); //получаем кнопку редактирования
let closeButtonEdit = document.querySelector('.popup__close-button_edit'); //получаем кнопку закрытия окна редактирвоания профиля
let addButton = document.querySelector('.profile__add-button'); //получаем кнопку для добавления картинки
let closeButtonAdd = document.querySelector('.popup__close-button_add'); //получаем кнопку закрытия окна добавления картинки
let closeButtonImage = document.querySelector('.popup__close-button_image') //получаем кнопку закрытия popup для просмотра картинки

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
let popupEdit = document.querySelector('.popup_edit'); //получаем popup
    //получаем текстовые узлы имя и профессию, присваиваем их значения полям на форме
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let popupAdd = document.querySelector('.popup_add'); //получаем popup для добавления новой карточки
let popupImage = document.querySelector('.popup_image'); //получаем popup для просмотра картинки

//открываем popup
function openPopup (popupName){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    //отображаем popup
    popupName.classList.add('popup_opened');
}

//закрываем popup
function closePopup (popupName) {
    popupName.classList.remove('popup_opened');
}

//открыаем popup для просмотра картинки
function openPopupImage(clickImg){
    console.log(clickImg);
    popupImage.querySelector('.popup__image').src = clickImg.src;
    popupImage.querySelector('.popup__image').alt = clickImg.alt;
    popupImage.querySelector('.popup__image-title').textContent = clickImg.alt;
    popupImage.classList.add('popup_opened');
}

//закрываем popup для прсмотра картинки
function closePopupImage (){
    popupImage.classList.remove('popup_opened');
}

//сохраняем данные из формы popup
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}


let cardTemplate = document.querySelector('#card').content; //получаем шаблон для создания карточки
console.log(cardTemplate);
let elementsPart = document.querySelector('.elements'); //получаем секцию для карточек
//функция создания карточки
function createCard(name, path) {
    let articleImg = cardTemplate.querySelector('.element').cloneNode(true);
    //console.log(articleImg);
    let elementImg = articleImg.querySelector('.element__image');
    let elementTitle =articleImg.querySelector('.element__title');
    elementImg.src = path;
    elementImg.alt = name;
    elementTitle.textContent = name;
    articleImg.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });
    articleImg.querySelector('.element__trash').addEventListener('click', (evt) => {evt.target.closest('.element').remove()})
    articleImg.querySelector('.element__image').addEventListener('click', (evt) => {openPopupImage(evt.target)});
    elementsPart.prepend(articleImg);
}

function addCard (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let nameCardInput = formElementAdd.querySelector('.popup__field_type_title');
    let linkCardInput = formElementAdd.querySelector('.popup__field_type_link');
    createCard(nameCardInput.value, linkCardInput.value);
    closePopup(popupAdd);
}


initialCards.forEach((item) => createCard(item.name, item.link));
//createCard('Вологда', './images/vologda.jpg');
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', handleFormSubmit); //обработчик на кнопке "Сохранить"
formElementAdd.addEventListener('submit', addCard); //обработчик на кнопке Сохранить на форме добавления карточки

editButton.addEventListener('click', function() {
    openPopup(popupEdit);
}); //обработчик на кнопке Редаткировать

addButton.addEventListener('click', function() { 
    openPopup(popupAdd);
}) //обработчик на кнопке Добавить

closeButtonEdit.addEventListener('click', function() {
    closePopup(popupEdit);
}); //обработчик на кнопке Закрыть окна редактирвоаняи профиля

closeButtonAdd.addEventListener('click', function() {
    closePopup(popupAdd);
}); //обработчик на кнопке Закрыть окна добавления карточки

closeButtonImage.addEventListener('click', closePopupImage);