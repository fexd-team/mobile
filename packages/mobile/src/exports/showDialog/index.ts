import Dialog from '../Dialog'
import modalConflict from '../modalConflict'
import createModalAPI from '../createModalAPI'

const showDialog = createModalAPI(Dialog, {
  shareMask: true,
  onConflict: modalConflict.handlers.hidden,
})

export default showDialog
