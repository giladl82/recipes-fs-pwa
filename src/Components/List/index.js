import React from 'react';
import PropTypes from 'prop-types';

import { navigate } from '@reach/router';
import './list.css';

List.propTypes = {
  recipes: PropTypes.array.isRequired
};

List.defaultProps = {
  recipes: []
};

export default function List({ recipes }) {
  const handleItemClick = event => {
    const { id } = event.currentTarget.dataset;
    navigate(`/item/${id}`);
  };

  return (
    <div className='list'>
      {recipes.map(item => {
        console.log(item.id);
        return (
          <div key={'fff'} data-id={item.id} onClick={handleItemClick} className='list-item' key={item.id}>
            <h3 className='list-item__title'>{item.title}</h3>
            <img className='list-item__image' src={item.image} alt={item.title} />
            <div className='list-item__buttons'>
              <button title='צפייה' onClick={handleItemClick}>
                <i className='fas fa-eye' />
              </button>
              <button title='עריכה'>
                <i className='fas fa-edit' />
              </button>
              <button title='מחיקה'>
                <i className='fas fa-trash' />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  );
}
