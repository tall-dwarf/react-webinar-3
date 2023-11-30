import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      })
    })
  };

  /**
   * Добавление товара в корзину
   * @param code
  */
  addToCard(code) {
    const searchElement = this.state.card.find(cardItem => cardItem.code === code)
    let newCardState = null

    if (Boolean(searchElement)) {
      newCardState = this.state.card.map(itm => itm.code === code ? { ...itm, cnt: itm.cnt + 1 } : itm)
    } else {
      const productItem = this.state.list.find(cardItem => cardItem.code === code)
      newCardState = [...this.state.card, { ...productItem, cnt: 1 }]
    }

    this.setState({
      ...this.state,
      card: newCardState
    })
  }

  /**
   * Удаление товара из корзины
   * @param code
  */
  deleteOnCard(code){
    this.setState({
      ...this.state,
      card: this.state.card.filter(cItem => cItem.code !== code)
      
    })
    // Удаление 1 cnt
    // .map(cItem => cItem.code === code ? {...cItem, cnt: cItem.cnt - 1} : cItem)
    //   .filter(cItem => cItem.cnt)
  }

  /**
   * Получение полной цены всех товаров в корзине
  */
  getFullPrice(){
    return this.state.card.reduce((acc, item) => acc + (item.cnt * item.price),0)
  }
}

export default Store;
