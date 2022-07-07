import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCardsUser, createCard, deleteCard, reset } from '../../reducers/card.reducer';
import { createDeck } from '../../reducers/deck.reducer';

export default function Creator() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user) || {};
  const { cards, isError, isLoading, message } = useSelector((state) => state.cards) || {};
  const [form, setForm] = useState({
    name: '',
    logo: '',
    status: 'public',
    links: [],
    cards: [],
  });
  const [link, setLink] = useState('');
  const [card, setCard] = useState({
    name: '',
    image: '',
  });
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (user) {
      dispatch(getAllCardsUser());
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, message, user, dispatch]);
  const handleChange = (e) => {
    e.preventDefault();
    const targetName = e.target.name;
    let value;
    if (targetName === 'cards' || targetName === 'links') {
      value = [...form[targetName], e.target.value];
    } else {
      value = e.target.value;
    }
    setForm({ ...form, [targetName]: value });
    if (targetName === 'links') {
      setLink('');
    }
  };
  const postDeck = (e) => {
    e.preventDefault();
    dispatch(createDeck(form));
    setForm({
      name: '',
      logo: '',
      status: 'public',
      links: [],
      cards: [],
    });
  };
  const changeCard = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    setCard({ ...card, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      let form = new FormData();
      form.append('image', card.image);
      form.append('name', card.name);
      dispatch(createCard(form));
      setCard({
        name: '',
        image: '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCard = (e) => {
    e.preventDefault();
    dispatch(deleteCard(e.target.value));
  };
  return (
    <>
      {!isLoading && (
        <>
          <article className="panel is-success">
            <p className="panel-heading">Card</p>
            <div className="mb-3">
              <input
                className="input is-success"
                placeholder="Enter name"
                type="text"
                name="name"
                value={card.name}
                onChange={changeCard('name')}
              />
            </div>
            <div className="file has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={changeCard('image')}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                {card.image && <span className="file-name">{card.image.name}</span>}
              </label>
            </div>
            <div className="box">
              <button className="button is-success" onClick={handleSubmit}>
                Create Card
              </button>
            </div>
          </article>
          <article className="panel is-success">
            <p className="panel-heading">Deck</p>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input is-success"
              type="text"
              placeholder="Deck Name"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="input is-link"
              type="text"
              placeholder="Link Deck"
            />
            {form.links.map((e, index) => (
              <div key={index} className="notification is-link">
                <button className="delete"></button>
                {e}
              </div>
            ))}
            <div className="box buttons">
              <button value={link} name="links" onClick={handleChange} className="button is-link">
                Add Link
              </button>
              <button onClick={postDeck} className=" button is-success">
                Create Deck
              </button>
            </div>
            <div className="columns is-multiline is-centered">
              {form.logo && (
                <div className="column is-one-fifth">
                  <span className="tag is-warning">Logo</span>

                  <figure className="image is-9by16">
                    <img src={form.logo} alt="logo" />
                  </figure>
                </div>
              )}

              {form.cards.map((e, index) => (
                <div key={index} className="column is-one-fifth">
                  <span className="tag is-warning">Card</span>
                  <figure className="image is-9by16">
                    <img src={e} alt="img" />
                  </figure>
                </div>
              ))}
            </div>
          </article>
          <article className="panel is-warning">
            <p className="panel-heading">Card User</p>
            <div className="panel-block">
              <p className="control has-icons-left">
                <input className="input" type="text" placeholder="Search" />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div>
            <p className="panel-tabs buttons">
              <button className="button is-active">All</button>
              <button className="button">Champions</button>
              <button className="button">Followers</button>
              <button className="button">Spells</button>
              <button className="button">Landmarks</button>
              <button className="button">Keyword (beta)</button>
            </p>

            <div className="columns is-multiline is-centered">
              {cards.map((e, index) => (
                <div key={index} className="column is-one-fifth message is-white">
                  <div className="message-header">
                    {e.name}
                    <button value={e._id} className="delete" onClick={handleDeleteCard}></button>
                  </div>
                  <figure className="image is-9by16">
                    <img src={e.image} alt="img" />
                  </figure>
                  <div className="buttons">
                    <button name="logo" value={e.image} className="button is-warning" onClick={handleChange}>
                      Add logo
                    </button>
                    <button name="cards" value={e.image} className="button is-warning" onClick={handleChange}>
                      Add card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </>
      )}
    </>
  );
}
