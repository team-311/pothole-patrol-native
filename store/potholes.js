import axios from 'axios';

const defaultPotholes = {
  localPotholes: []
}

export default function(state = defaultPotholes, action) {
  switch (action.type) {
    default:
      return state;
  }
}
