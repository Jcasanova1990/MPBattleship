import React from 'react';
import PropTypes from 'prop-types';
import './sass/ship.module.scss'; // Assuming you have a Ship-specific styling file

// Functional Component approach
const Ship = ({ length, isVertical }) => {
  const shipStyle = {
    width: isVertical ? 'var(--cell-size)' : `calc(var(--cell-size) * ${length})`,
    height: isVertical ? `calc(var(--cell-size) * ${length})` : 'var(--cell-size)',
  };

  return (
    <div className={`ship ${isVertical ? 'vertical' : 'horizontal'}`} style={shipStyle}>
      {/* Optionally, you can render more details about the ship */}
    </div>
  );
};

Ship.propTypes = {
  length: PropTypes.number.isRequired,
  isVertical: PropTypes.bool.isRequired,
};

export default Ship;
