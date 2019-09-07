
const initialState = {
  books: [], // Массив книг
  loading: true, // Флаг загрузки чтобы показать спинер
  error: null, // Флаг ошибки при загрузке книг с помощью fetch api
  cartItems: [], // Корзина (массив обектов { id, title, total, count})
  orderTotal: 0, // Сумма покупки
  orderCount: 0, // Всего книг в корзине
  isModal: false, // Флаг открыто ли модальное окно
  currentBook: {}, // Текущая книга которая открыта в модальном окне
  currentCount: 0 // Количество книг для покупки в модальном окне
};


// Функция которая добавляет / удаляет / обновляет книги в корзине
const updateCartItems = (cartItems, item, idx) => {

  if (item.count === 0) { // Если мы книг в корзине не осталось то удаляем объект из корзины
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  }

  if (idx === -1) { // Если книги в корзине нет то добавляем
    return [
      ...cartItems,
      item
    ];
  }

  return [ // В остальных случаях обновляем книгу в корзине
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};


// Функция которая создает новый объект для корзины
// quantity - количество книг которые мы добавляем
// book - книга из общей БД, item - книга из корзины
const updateCartItem = (book, item = {}, quantity) => {

  // Если книги нет в корзине то берем id и title из book в БД
  // А количество и сумму берем за 0
  const {
    id = book.id,
    count = 0,
    title = book.title,
    total = 0 } = item;

  // Расчитываем количество и сумму
  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity*book.price
  };
};

// Обновление заказа
const updateOrder = (state, bookId, quantity) => {
  const { books, cartItems } = state;

  // Находим выбранную книгу в корзине и в БД
  const book = books.find(({id}) => id === bookId);
  const itemIndex = cartItems.findIndex(({id}) => id === bookId);
  const item = cartItems[itemIndex];

  // Обновляем корзину в зависимости от quantity
  const newItem = updateCartItem(book, item, quantity);
  const updatedCartItems = updateCartItems(cartItems, newItem, itemIndex);

  // Расчитываем количество книг и сумму в корзине
  const orderTotal = updatedCartItems.reduce((acc,cur)=>acc+cur.total,0);
  const orderCount = updatedCartItems.reduce((acc,cur)=>acc+cur.count,0);

  return {
    ...state,
    cartItems: updatedCartItems,
    orderTotal,
    orderCount
  };
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload.bookId, action.payload.count);

    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    case 'MODAL_OPENNED':
      const curBook = state.books.find((book)=> book.id === action.payload);
      return {
        ...state,
        isModal: true,
        currentBook: curBook
      }

    case 'MODAL_CLOSED':
      return {
        ...state,
        isModal: false,
        currentBook: {},
        currentCount: 0
      }

    case 'BOOK_COUNT_CHANGED':
      return {
        ...state,
        currentCount: action.payload
      }

    default:
      return state;
  }
};

export default reducer;
