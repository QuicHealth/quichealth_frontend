import React from 'react';
import * as actionTypes from './../actionTypes';

export const showSidebar= () => dispatch => {
    dispatch({
        type: actionTypes.SHOW_SIDEBAR
    })
}

export const notShowSidebar = () => dispatch => {
    dispatch({
      type: actionTypes.NOT_SHOW_SIDEBAR
  })

} 