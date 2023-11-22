import { isString, run, delay } from '@fexd/tools'

import { ModalStoreData } from '../modalStore/type'
import { ModalLevel } from '../BasicModal/type'
import { ModalConflictHandler as BasicModalConflictHandler } from '../Modal/type'
import { CreateConfig } from './type'

const isRegExp = (val: any): boolean => val instanceof RegExp

interface ModalConflictHandler extends BasicModalConflictHandler {
  config: CreateConfig | CreateConfig[]
}

function create(config: CreateConfig = {}): ModalConflictHandler {
  const {
    levels: getLevels = (currentLevel) => [currentLevel],
    types,
    conflictProps = {},
    filter: customizedFilter = () => true,
  } = config
  const conflictHandler: ModalConflictHandler = ({ current, store }) => {
    const levels = run(getLevels, undefined, current.level)
    const checkAllLevels = !levels
    const checkAllTypes = !types

    function levelFilter(modalData: ModalStoreData) {
      if (checkAllLevels) {
        return true
      }

      return (levels as ModalLevel[])?.includes(modalData.level) ?? true
    }
    function typeFilter(modalData: ModalStoreData) {
      if (checkAllTypes) {
        return true
      }
      const targetType = (modalData.type as string) ?? ''
      const typeMatcher = (type: unknown) => {
        switch (true) {
          case isString(type):
            return type === targetType
          case isRegExp(type):
            return (type as RegExp).test(targetType)
          default:
            return true
        }
      }

      return types?.some(typeMatcher) ?? true
    }
    const allVisibleModal = store.getAll()
    const matchedVisibleModal = allVisibleModal
      .filter((modalData) => levelFilter(modalData) && typeFilter(modalData))
      .filter((modalData) => customizedFilter(current, modalData))

    const conflictModalList = matchedVisibleModal.filter(
      (modalData) => modalData.zIndex > current.zIndex, // 互斥必要条件：zIndex 更高
    )

    // 是否互斥
    const conflict = conflictModalList.length > 0

    return conflict
      ? run(conflictProps, undefined, {
          conflict,
          matchedVisibleModal,
          conflictModalList,
          current,
        })
      : {}
  }

  conflictHandler.config = config

  return conflictHandler
}

const merge = (...conflictHandlers: ModalConflictHandler[]): ModalConflictHandler => {
  const mergedConflictHandler: ModalConflictHandler = (params) => {
    const mergedConflictProps = conflictHandlers
      .map((handler) => handler(params))
      .reduce(
        (mergedProps, props) => ({
          ...mergedProps,
          ...props,
        }),
        {},
      )

    return mergedConflictProps
  }

  mergedConflictHandler.config = conflictHandlers.map((handler) => handler.config) as CreateConfig[]

  return mergedConflictHandler
}

const extend = (conflictHandler: ModalConflictHandler, config: CreateConfig): ModalConflictHandler =>
  create({
    ...(conflictHandler.config as CreateConfig),
    ...config,
  })

const modalConflict = {
  create,
  merge,
  extend,
  handlers: {
    mask: create({
      conflictProps: {
        contentMask: true,
      },
    }),
    hidden: create({
      conflictProps: {
        contentVisible: false,
      },
    }),
    offsetByPlacement: create({
      filter: (current, modalData) => modalData?.props?.placement === current?.props?.placement, // placement 相同时认为是互斥
      conflictProps: (conflictInfo) => {
        if (conflictInfo?.current?.props?.placement === 'center') {
          return {
            contentVisible: !conflictInfo?.conflict,
          }
        }

        return delay(16) // 尽量等待其他冲突任务的 contentVisible 计算（通常为同步计算）完成
          .then(() =>
            !conflictInfo?.conflict
              ? {
                  style: {
                    transition: 'all 0.2s',
                    [conflictInfo?.current?.props?.placement === 'top' ? 'top' : 'bottom']: 0,
                  },
                }
              : {
                  style: {
                    transition: 'all 0.2s',
                    [conflictInfo?.current?.props?.placement === 'top' ? 'top' : 'bottom']:
                      conflictInfo.conflictModalList
                        .filter((data) => data?.props?.contentVisible) // 过滤掉 content 不可见的元素
                        .reduce((offset, data) => offset + data?.contentRef?.current!?.offsetHeight, 0),
                  },
                },
          )
      },
    }),
  },
}

export default modalConflict
