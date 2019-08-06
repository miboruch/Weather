import ui from './dom-view';

let searchView = (function() {
  function getValueFromInput() {
    return ui.cityInput.value;
  }

  function clearInput() {
    ui.cityInput.value = '';
  }

  return {
    clearInput: clearInput,
    getValueFromInput: getValueFromInput,
  };
})();

export default searchView;
