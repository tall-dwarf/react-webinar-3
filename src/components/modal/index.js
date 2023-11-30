import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ children, title, onClose, isOpen }) {
    return (
        <div onClick={() => onClose()} className={'Modal ' + (isOpen ? 'Modal--open' : ' ')}>
            <div onClick={event => event.stopPropagation()} className='Modal-inner'>
                <div className='Modal-header'>
                    <h3 className='Modal-title'>{title}</h3>
                    <button onClick={() => onClose()}>Закрыть</button>
                </div>
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool
};



export default Modal;