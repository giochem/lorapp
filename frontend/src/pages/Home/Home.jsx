import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllDecksPublic, likeDeck, reset } from '../../reducers/deck.reducer';

export default function Home() {
  const navigate = useNavigate();
  const { decks, isError, isLoading, message } = useSelector((state) => state.decks) || {};
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    cards: [],
    links: [],
  });
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    if (isError) {
      console.log(message);
      navigate('/error');
    }
    dispatch(getAllDecksPublic());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, navigate]);
  const handleLikeDeck = (id, like) => (e) => {
    e.preventDefault();

    const data = {
      id,
      like: {
        icon: like.icon,
        number: like.number + 1,
      },
    };
    dispatch(likeDeck(data));
  };
  const displayCardModal = (index) => (e) => {
    e.preventDefault();
    setModal({
      cards: decks[index].cards,
      links: decks[index].links,
    });
    setIsModal(true);
  };
  const closeCardModal = (e) => {
    e.preventDefault();
    setIsModal(false);
  };
  return (
    <>
      {!isLoading && (
        <>
          <div className={isModal ? 'modal is-active' : 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Deck</p>
                <button className="delete is-large" aria-label="close" onClick={closeCardModal}></button>
              </header>
              <div className="modal-content modal-card-body">
                {modal.cards.map((card, index) => (
                  <figure key={index} className="image is-9by16">
                    <img src={card} alt="card" />
                  </figure>
                ))}
              </div>
              <footer className="modal-card-foot columns">
                {modal.links.map((e, index) => (
                  <a key={index} href={e} className="column">
                    link{index}
                  </a>
                ))}
              </footer>
            </div>
          </div>
          <div className="columns buttons is-multiline is-centered is-mobile">
            {decks.map((deck, index) => (
              <div
                key={index}
                className="button column is-one-fifth message is-white"
                onClick={displayCardModal(index)}
              >
                <div className="message-header">{deck.name}</div>
                <figure className="image is-9by16">
                  <img src={deck.logo} alt="img" />
                </figure>
                <button className="button" onClick={handleLikeDeck(deck._id, deck.like)}>
                  <span className="icon">
                    <i className="fas fa-heart"></i>
                  </span>
                </button>
                <span className="button is-static">{deck.like.number}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
