import cypress from 'cypress';

const url = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
  cy.intercept('GET', `${url}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.setCookie('accessToken', 'ACCESS_TOKEN');
  localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
  cy.intercept('GET', `${url}/auth/user`, { fixture: 'login.json' });
  cy.intercept('POST', `${url}/orders`, { fixture: 'order.json' });
  cy.visit('http://localhost:4000');
});

afterEach(() => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

describe('добавление ингредиента из списка в конструктор', () => {
  it('добавление одного ингредиента и соуса из списка в конструктор', () => {
    cy.get('[data-cy="main"]').eq(1).children('button').click();
    cy.get('[data-cy="burgerConstructor"]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
    cy.get('[data-cy="sauce"]').eq(2).children('button').click();
    cy.get('[data-cy="burgerConstructor"]').should(
      'contain',
      'Соус традиционный галактический'
    );
  });

  it('добавление булки', () => {
    cy.get('[data-cy="bun"]').eq(0).children('button').click();
    cy.get('[data-cy="burgerConstructor"]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });
});

describe('работа модальных окон', () => {
  beforeEach(() => {
    cy.get('[data-cy="bun"]').eq(0).click();
  });

  it('открытие модального окна ингредиента', () => {
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.reload(true);
    cy.get('[data-cy="modal"]').should('be.visible');
  });

  it('закрытие по клику на крестик', () => {
    cy.get('[data-cy="modalCloseButton"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрытие по клику на оверлей', () => {
    cy.get('[data-cy="modalOverlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('создание заказа', () => {
  it('создание заказа', () => {
    // вызывается клик по кнопке «Оформить заказ»
    cy.get('[data-cy="orderButton"]').should('be.disabled');
    cy.get('[data-cy="bun"]').eq(0).children('button').click();
    cy.get('[data-cy="main"]').eq(1).children('button').click();
    cy.get('[data-cy="sauce"]').eq(2).children('button').click();
    cy.get('[data-cy="orderButton"]').should('be.enabled');
    cy.get('[data-cy="orderButton"]').click();

    // проверяется, что модальное окно открылось и номер заказа верный
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="orderNumber"]').should('contain.text', '53401');

    // закрывается модальное окно и проверяется успешность закрытия
    cy.get('[data-cy="modalCloseButton"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // проверяется, что конструктор пуст
    cy.get('[data-cy="orderButton"]').should('be.disabled');
    cy.get('[data-cy="burgerConstructor"]').should(
      'contain',
      'Выберите начинку'
    );
    cy.get('[data-cy="burgerConstructor"]').should('contain', 'Выберите булки');
  });
});
