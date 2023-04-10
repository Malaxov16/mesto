
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


const formElementEdit = document.querySelector('.popup__form_edit'); // Находим форму редактирования профиля в DOM 
const formElementAdd = document.querySelector('.popup__form_add'); // получаем форму добавления картинки
// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector('.popup__field_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementEdit.querySelector('.popup__field_type_job'); // Воспользуйтесь инструментом .querySelector()
const editButton = document.querySelector('.profile__edit-button'); //получаем кнопку редактирования
const closeButtonEdit = document.querySelector('.popup__close-button_edit'); //получаем кнопку закрытия окна редактирвоания профиля
const addButton = document.querySelector('.profile__add-button'); //получаем кнопку для добавления картинки
const closeButtonAdd = document.querySelector('.popup__close-button_add'); //получаем кнопку закрытия окна добавления картинки
const closeButtonImage = document.querySelector('.popup__close-button_image') //получаем кнопку закрытия popup для просмотра картинки

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
const popupEdit = document.querySelector('.popup_edit'); //получаем popup
    //получаем текстовые узлы имя и профессию, присваиваем их значения полям на форме
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup_add'); //получаем popup для добавления новой карточки
const popupImage = document.querySelector('.popup_image'); //получаем popup для просмотра картинки
const image = popupImage.querySelector('.popup__image'); //получаем картинку для popup
const titleImg = popupImage.querySelector('.popup__image-title'); //получаем заголовок для картинки в popup

const cardTemplate = document.querySelector('#card').content; //получаем шаблон для создания карточки
const elementsPart = document.querySelector('.elements'); //получаем секцию для карточек
const nameCardInput = formElementAdd.querySelector('.popup__field_type_title'); //получаем поле Название popup для добавления картинки
const linkCardInput = formElementAdd.querySelector('.popup__field_type_link'); //получаем поле Ссылка popup для добавления картинки

//открываем popup
function openPopup (popupName){
    //отображаем popup
    popupName.classList.add('popup_opened');
    setListenerOnOverlay(popupName);
}

//закрываем popup
function closePopup (popupName) {
    //скрываем popup
    removeListenerOnOverlay(popupName);
    popupName.classList.remove('popup_opened');
    formElementAdd.reset();
    enableValidate();
}

//открыаем popup для просмотра картинки
function openPopupImage(clickImg){
    image.src = clickImg.src;
    image.alt = clickImg.alt;
    titleImg.textContent = clickImg.alt;
    openPopup(popupImage);
}

//сохраняем данные из формы popup
function editProfile (evt) {
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

//функция создания карточки
function getCard(name, path) {
    const articleImg = cardTemplate.querySelector('.element').cloneNode(true);
    //console.log(articleImg);
    const elementImg = articleImg.querySelector('.element__image');
    const elementTitle =articleImg.querySelector('.element__title');
    elementImg.src = path;
    elementImg.alt = name;
    elementTitle.textContent = name;
    articleImg.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });
    articleImg.querySelector('.element__trash').addEventListener('click', (evt) => {evt.target.closest('.element').remove()})
    elementImg.addEventListener('click', (evt) => {openPopupImage(evt.target)});
    return articleImg;
}

//функция вставки карточки
function createCard(name, path) {
    const articleImg = getCard(name, path);
    elementsPart.prepend(articleImg);
}

function addCard (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    createCard(nameCardInput.value, linkCardInput.value);
    closePopup(popupAdd);
}

//const closePopupOverlay = () => {
//    const popupList = Array.from(document.querySelectorAll('.popup'));
//    popupList.forEach((popupElement) => {
//        popupElement.addEventListener('click', function)
//    })
//}

initialCards.forEach((item) => createCard(item.name, item.link)); //вставляем предзагружаемые карточки из массива

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', editProfile); //обработчик на кнопке "Сохранить"
formElementAdd.addEventListener('submit', function(evt) {
    addCard(evt);
    evt.target.reset();
}); //обработчик на кнопке Сохранить на форме добавления карточки

editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
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

closeButtonImage.addEventListener('click', function() {
    closePopup(popupImage)
}); //обработчик на кнопке Закрыть окна просмотра картинки

const setListenerOnOverlay = (popupName) => {
    popupName.addEventListener('click', checkClickOnOverlay);
    document.addEventListener('keydown', checkKeyOnOverlay);
}

const removeListenerOnOverlay = (popupName) => {
    popupName.removeEventListener('click', checkClickOnOverlay);
    document.removeEventListener('keydown', checkKeyOnOverlay);
}

const checkClickOnOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

const checkKeyOnOverlay = (evt) => {
    const popupName = evt.currentTarget.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(popupName);
    }
}
