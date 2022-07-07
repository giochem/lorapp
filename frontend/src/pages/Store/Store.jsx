import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Store() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user) || {};
  const { decks, isError, isLoading, message } = useSelector((state) => state.decks) || {};
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (user) {
      dispatch();
    }
  });
  return (
    <article className="panel is-warning">
      <p className="panel-heading">Deck User</p>
      <div>his</div>
    </article>
  );
}
