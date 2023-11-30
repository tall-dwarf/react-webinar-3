import React from "react";
import PropTypes from 'prop-types';
import "./style.css"

function CardItem({ cardItem, onDelete }) {


    return (
        <li className="Card-item">
            <div className="Card-item__info">
                <span className="">1</span>
                <h4 className="Card-item__title">{cardItem.title}</h4>
            </div>
            <div className="Card-item__main">
                <span>{cardItem.price} ₽</span>
                <span>{cardItem.cnt} шт</span>
                <button onClick={() => onDelete(cardItem.code)}>Удалить</button>
            </div>
        </li>
    )
}

CardItem.propTypes = {
    cardItem: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        cnt: PropTypes.cnt
    }).isRequired,
    onDelete: PropTypes.func,
};


export default CardItem