import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { deleteRecipe } from '../../services/recipes';

import './list.css';

export default function List({ recipes, onItemDeleted }) {
  const handleItemClick = event => {
    event.stopPropagation();
    const { id } = event.currentTarget.dataset;
    navigate(`/recipe/${id}`);
  };

  const handleEditItemClick = event => {
    event.stopPropagation();
    const { id } = event.currentTarget.dataset;
    navigate(`/recipe/edit/${id}`);
  };

  const handleDeleteItemClick = async event => {
    event.stopPropagation();
    if(window.confirm('האם אתה למחוק מתכון זה?')) {
      const { id } = event.currentTarget.dataset;
      await deleteRecipe(id);
      onItemDeleted(id);
    }
  };

  return (
    <div className="list">
      {recipes.map(item => {
        return (
          <div data-id={item.id} onClick={handleItemClick} className="list-item" key={item.id}>
            <h3 className="list-item__title">{item.title}</h3>
            <img className="list-item__image" src={item.image} alt={item.title} />
            <div className="list-item__buttons">
              <button data-id={item.id} title="צפייה" onClick={handleItemClick}>
                <i className="fas fa-eye" />
              </button>
              <button data-id={item.id} title="עריכה" onClick={handleEditItemClick}>
                <i className="fas fa-edit" />
              </button>
              <button data-id={item.id} title="מחיקה" onClick={handleDeleteItemClick}>
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

List.propTypes = {
  recipes: PropTypes.array.isRequired,
  onItemDeleted: PropTypes.func.isRequired
};

List.defaultProps = {
  recipes: []
};
