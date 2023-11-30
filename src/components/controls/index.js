import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpen, fullPrice, cnt}) {
  return (
    <div className='Controls'>
      <div>В корзине: <strong>{cnt} товара / {fullPrice} ₽</strong></div>
      <button onClick={() => onOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  fullPrice: PropTypes.number,
  cnt: PropTypes.number
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default React.memo(Controls);
