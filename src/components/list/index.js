import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAction, onSelectItem, btnText}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item btnText={btnText} item={item} onAction={onAction} onSelect={onSelectItem}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAction: PropTypes.func,
  btnText: PropTypes.string
};

List.defaultProps = {
  onAction: () => {
  },
  btnText: 'Добавить'
}

export default React.memo(List);
