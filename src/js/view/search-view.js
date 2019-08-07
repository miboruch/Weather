import ui from './dom-view';

let searchView = (function() {
  function getValueFromInput() {
    return ui.cityInput.value;
  }

  function clearInput() {
    ui.cityInput.value = '';
  }

  function addErrorClass() {
    ui.cityInput.classList.add('city-input--error');
  }

  function removeErrorClass() {
    ui.cityInput.classList.remove('city-input--error');
  }

  return {
    clearInput: clearInput,
    getValueFromInput: getValueFromInput,
    addErrorClass: addErrorClass,
    removeErrorClass: removeErrorClass,
  };
})();

export default searchView;
