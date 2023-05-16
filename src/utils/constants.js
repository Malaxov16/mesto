//------------------------------------------------------------
//переменные для проверки форм
export const validArguments = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_status_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorVisibleClass: 'popup__field-error_status_visible'
}; 

export const formEdit = document.querySelector('.popup__form_edit'); //получаем форму редактирования профиля
export const formAdd = document.querySelector('.popup__form_add'); // получаем форму добавления картинки


//--------------------------------------------------------------
//переменные для добавления карточек
export const vologdaImage = new URL('../images/vologda.jpg', import.meta.url);
export const cherepovetsImage = new URL('../images/cherepovets.jpg', import.meta.url);
export const andomaImage = new URL('../images/andoma.jpg', import.meta.url);
export const belozerskImage = new URL('../images/belozersk.jpg', import.meta.url);
export const monastyrImage = new URL('../images/monastyr.jpg', import.meta.url);
export const ustugImage = new URL('../images/ustug.jpg', import.meta.url);
//предзагруженные карточки
export const initialCards = [
    {
      name: 'Вологда',
      link: vologdaImage
    },
    {
      name: 'Череповец',
      link: cherepovetsImage
    },
    {
      name: 'Андома гора',
      link: andomaImage
    },
    {
      name: 'Белозерск',
      link: belozerskImage
    },
    {
      name: 'Кирилло-Белозерский монастырь',
      link: monastyrImage
    },
    {
      name: 'Великий Устюг',
      link: ustugImage
    }
  ]; 

export const editButton = document.querySelector('.profile__edit-button'); //получаем кнопку редактирования
export const addButton = document.querySelector('.profile__add-button'); //получаем кнопку для добавления картинки

//селекторы
export const containerCardSelector = '.elements';
export const templateCardSelector = '#card';