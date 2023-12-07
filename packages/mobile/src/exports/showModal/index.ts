import Modal from '../Modal'
import modalConflict from '../modalConflict'
import createModalAPI from '../createModalAPI'

const showModal = createModalAPI(Modal, {
  shareMask: true,
  onConflict: modalConflict.handlers.hidden,
})

export default showModal
