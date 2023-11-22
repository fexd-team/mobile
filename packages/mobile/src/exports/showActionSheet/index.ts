import ActionSheet from '../ActionSheet'
import modalConflict from '../modalConflict'
import createModalAPI from '../createModalAPI'

const showActionSheet = createModalAPI(ActionSheet, {
  shareMask: true,
  onConflict: modalConflict.handlers.mask,
})

export default showActionSheet
