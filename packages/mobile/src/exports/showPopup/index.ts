import Popup from '../Popup'
import modalConflict from '../modalConflict'
import createModalAPI from '../createModalAPI'

const showPopup = createModalAPI(Popup, {
  shareMask: true,
  onConflict: modalConflict.handlers.mask,
})

// @ts-ignore
window.showPopup = showPopup

export default showPopup
