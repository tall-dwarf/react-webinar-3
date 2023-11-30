import React from "react";
import PropTypes from 'prop-types';
import CardItem from "../cardItem/"
import "./style.css"

function Card({ cardList, fullPrice, onDelete }) {

    return (
        <div className="Card">
            <ul className="Card-list">
                {
                    cardList.map((cItem) => <CardItem key={cItem.code} onDelete={onDelete} cardItem={cItem} />)
                }
            </ul>
            <div className="Card-result">
                <strong>Итого</strong>
                <strong>{fullPrice} ₽</strong>
                <strong className="Card-result__none">Итого</strong>
            </div>
        </div>
    )
}

Card.propTypes = {
    cardList: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    fullPrice: PropTypes.number,
    onDelete: PropTypes.func
};

export default Card