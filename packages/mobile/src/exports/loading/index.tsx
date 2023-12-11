import { clamp, run, debounce } from '@fexd/tools'

import Loading from './Loading'
import { LoadingProps } from './Loading/type'
import { ModalMethodController } from '../createModalAPI/type'
import createModalAPI from '../createModalAPI'
import { LoadingMethodConfig } from './type'

let loadingCount = 0
let loadingController: ModalMethodController<LoadingProps>
const defaultConfig: LoadingMethodConfig = {}
const showLoading = createModalAPI(Loading)

const show = (config: LoadingMethodConfig = defaultConfig) => {
  if (loadingCount > 0) {
    loadingCount += 1
    return loadingController
  }

  loadingCount += 1

  const { onExited, ...props } = {
    ...defaultConfig,
    ...config,
  }

  run(loadingController, 'close')
  loadingController = showLoading({
    ...props,
    onExited: (...args: any[]) => {
      run(onExited, undefined, ...args)
      loadingCount = 0
    },
  })

  return loadingController
}

const getCount = () => loadingCount
const getController = () => loadingController

const close = debounce((forced) => {
  if (forced || loadingCount === 0) {
    run(loadingController, 'close')
  }
}, 60)

const hide = (forced = false) => {
  loadingCount = clamp(loadingCount - 1, 0)

  close(forced)
}

const loading = {
  show,
  hide,
  getCount,
  defaultConfig,
  getController,
}

export default loading
