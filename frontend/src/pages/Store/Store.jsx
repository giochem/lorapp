import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDecksUser, deleteDeckUser, reset } from '../../reducers/deck.reducer';

export default function Store() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = sessionStorage.getItem('token');
  const { decks, isError, isLoading, message } = useSelector((state) => state.decks) || {};

  useEffect(() => {
    if (isError) {
      console.log(message);
      navigate('/login');
    }
    if (user) {
      dispatch(getDecksUser());
    }
    return () => dispatch(reset());
  }, [isError, message, user, dispatch, navigate]);
  const handleDeleteDeck = (deckId) => (e) => {
    e.preventDefault();
    dispatch(deleteDeckUser(deckId));
  };
  return (
    <>
      {!isLoading && (
        <article className="panel is-warning">
          <p className="box panel-heading">Deck User</p>
          <div className="columns is-multiline is-centered">
            {decks.map((e, index) => (
              <div key={index} className="column is-one-fifth message is-white">
                <div className="message-header">
                  <p>{e.name}</p>
                  <button value={e._id} className="delete" onClick={handleDeleteDeck(e._id)}></button>
                </div>
                <figure className="image is-9by16">
                  <img src={e.logo} alt="img" />
                </figure>
                <div className="buttons"></div>
              </div>
            ))}
          </div>
        </article>
      )}
    </>
  );
}
