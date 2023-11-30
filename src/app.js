import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Card from "./components/card"
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const list = store.getState().list;

  const callbacks = {
    onAddToCard: useCallback((code) => {
      store.addToCard(code)
    }, [store]),

    onDeleteInCard: useCallback((code) => {
      store.deleteOnCard(code)
    }, [store]),
  }

  return (
    <React.Fragment>
      <Modal
        onClose={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
        title="Корзина">
        <Card
          onDelete={callbacks.onDeleteInCard}
          fullPrice={store.getFullPrice()}
          cardList={store.getState().card} />
      </Modal>
      <PageLayout>
        <Head title='Приложение на чистом JS' />
        <Controls
          cnt={store.getState().card.length}
          fullPrice={store.getFullPrice()}
          onOpen={() => setModalIsOpen(true)} />
        <List list={list}
          onAction={callbacks.onAddToCard} />
      </PageLayout>
    </React.Fragment>
  );
}

export default App;
