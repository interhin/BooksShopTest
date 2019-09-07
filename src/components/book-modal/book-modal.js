import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

import './book-modal.css';

import { bookAddedToCart, bookCountChanged } from '../../actions';

import { connect } from 'react-redux';

import { modalClosed } from '../../actions';

class BookModal extends Component {

    render() {
        const { isModal, modalClosed, currentBook, currentCount, bookAddedToCart, bookCountChanged } = this.props;
        return (
            <>
                <Modal show={isModal} onHide={modalClosed}>
                    <Modal.Header closeButton>
                    <Modal.Title>{currentBook.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="book-modal-body">
                        <img src={currentBook.image} alt={currentBook.title}/>
                        <p>{currentBook.subtitle}</p>
                        <div className="count-of-book">
                            <NumericInput min={0} value={currentCount} onChange={(count) => bookCountChanged(count)}/>
                            <span>Количество книг</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={()=> bookAddedToCart(currentBook.id, currentCount)}>
                        Добавить в корзину
                    </Button>
                    <Button variant="secondary" onClick={modalClosed}>
                        Закрыть
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = ({ isModal, currentBook, currentCount }) => {
    return {
        isModal,
        currentBook,
        currentCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modalClosed: () => dispatch(modalClosed()),
        bookAddedToCart: (id, count) => {
            dispatch(bookAddedToCart(id, count));
            dispatch(modalClosed());
        },
        bookCountChanged: (count) => dispatch(bookCountChanged(count))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookModal);