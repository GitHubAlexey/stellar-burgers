import cypress from 'cypress';

const url = 'https://norma.nomoreparties.space/api';
const burgerConstructor = '[data-cy="burgerConstructor"]';
const main = '[data-cy="main"]';
const bun = '[data-cy="bun"]';
const sauce = '[data-cy="sauce"]';
const orderButton = '[data-cy="orderButton"]';
const orderNumber = '[data-cy="orderNumber"]';
const modal = '[data-cy="modal"]';
const modalCloseButton = '[data-cy="modalCloseButton"]';
const modalOverlay = '[data-cy="modalOverlay"]';

beforeEach(() => {
  cy.intercept('GET', `${url}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.setCookie('accessToken', 'ACCESS_TOKEN');
  localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
  cy.intercept('GET', `${url}/auth/user`, { fixture: 'login.json' });
  cy.intercept('POST', `${url}/orders`, { fixture: 'order.json' });
  cy.visit('/');
});

afterEach(() => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

describe('добавление ингредиента из списка в конструктор', () => {
  it('добавление одного ингредиента и соуса из списка в конструктор', () => {
    cy.get(main).eq(1).children('button').click();
    cy.get(burgerConstructor).should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
    cy.get(sauce).eq(2).children('button').click();
    cy.get(burgerConstructor).should(
      'contain',
      'Соус традиционный галактический'
    );
  });

  it('добавление булки', () => {
    cy.get(bun).eq(0).children('button').click();
    cy.get(burgerConstructor).should('contain', 'Краторная булка N-200i');
  });
});

describe('работа модальных окон', () => {
  beforeEach(() => {
    cy.get(bun).eq(0).click();
  });

  it('открытие модального окна ингредиента', () => {
    cy.get(modal).should('be.visible');
    cy.reload(true);
    cy.get(modal).should('be.visible');
  });

  it('закрытие по клику на крестик', () => {
    cy.get(modalCloseButton).click();
    cy.get(modal).should('not.exist');
  });

  it('закрытие по клику на оверлей', () => {
    cy.get(modalOverlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('создание заказа', () => {
  it('создание заказа', () => {
    // вызывается клик по кнопке «Оформить заказ»
    cy.get(orderButton).should('be.disabled');
    cy.get(bun).eq(0).children('button').click();
    cy.get(main).eq(1).children('button').click();
    cy.get(sauce).eq(2).children('button').click();
    cy.get(orderButton).should('be.enabled');
    cy.get(orderButton).click();

    // проверяется, что модальное окно открылось и номер заказа верный
    cy.get(modal).should('be.visible');
    cy.get(orderNumber).should('contain.text', '53401');

    // закрывается модальное окно и проверяется успешность закрытия
    cy.get(modalCloseButton).click();
    cy.get(modal).should('not.exist');

    // проверяется, что конструктор пуст
    cy.get(orderButton).should('be.disabled');
    cy.get(burgerConstructor).should('contain', 'Выберите начинку');
    cy.get(burgerConstructor).should('contain', 'Выберите булки');
  });
});
