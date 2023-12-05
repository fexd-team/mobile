import React from 'react'
import { classnames, run } from '@fexd/tools'
import { EllipsisHorizontal } from '@fexd/icons'
import createFC from '../createFC'
import { StepsProps } from './type'
import Step from './Item'

interface StepsType extends React.FC<StepsProps> {
  Item: typeof Step
}

export const prefix = 'exd-steps'

const Steps: StepsType = createFC<StepsProps, HTMLDivElement>(function Steps(
  { value = 1, data = [], type, checked = false, children, className, ...props },
  forwardedRef,
) {
  const current = value - 1

  // 某一步骤
  const StepItem = createFC<any>(({ step, index }, ref) => {
    return (
      <Step
        icon={step.icon}
        step={index + 1}
        title={step.title}
        type={
          step.error
            ? 'error'
            : current > index
            ? checked
              ? 'completed'
              : 'process'
            : current === index
            ? 'process'
            : 'default'
        }
      >
        {step?.description}
      </Step>
    )
  })

  // 省略步骤
  const PassStep = createFC<any>(({ type }, ref) => {
    return <Step type={type} icon={() => <EllipsisHorizontal style={{ background: '#fff' }} />} />
  })

  // 省略掉在前面已完成的步骤的组件，省略步骤在第二个位置
  const PassBeforeSteps = createFC<any>((props, ref) => {
    return (
      <>
        <StepItem step={data[0]} index={0} />
        <PassStep status="process" />
        <StepItem step={data[data.length - 2]} index={data.length - 2} />
        <StepItem step={data[data.length - 1]} index={data.length - 1} />
      </>
    )
  })

  // 省略掉后面还没进行到的步骤的组件，省略步骤在第三个位置
  const PassAfterSteps = createFC<any>((props, ref) => {
    const isLessThanOne = current <= 0
    return (
      <>
        <StepItem step={data[isLessThanOne ? 0 : current]} index={isLessThanOne ? 0 : current} />
        <StepItem step={data[isLessThanOne ? 1 : current + 1]} index={isLessThanOne ? 1 : current + 1} />
        <PassStep />
        <StepItem step={data[data.length - 1]} index={data.length - 1} />
      </>
    )
  })

  // 省略掉前面已完成的组件，省略步骤在第一个位置
  const PassAllBeforeSteps = createFC<any>((props, ref) => {
    return (
      <>
        <PassStep status="process" />
        <StepItem step={data[data.length - 3]} index={data.length - 3} />
        <StepItem step={data[data.length - 2]} index={data.length - 2} />
        <StepItem step={data[data.length - 1]} index={data.length - 1} />
      </>
    )
  })

  return (
    <div {...props} className={classnames(prefix, className)} ref={forwardedRef}>
      <ul
        className={classnames(`${prefix}-container`, {
          [`${prefix}-container-flex`]: type === 'flex' || (data?.length > 0 && data?.length < 3),
        })}
      >
        {data?.length > 0 &&
          data?.length < 5 &&
          data.map((step, index: number) => (
            <Step
              key={index}
              icon={step.icon}
              step={index + 1}
              title={step.title}
              type={
                step.error
                  ? 'error'
                  : current > index
                  ? checked
                    ? 'completed'
                    : 'process'
                  : current === index
                  ? 'process'
                  : 'default'
              }
            >
              {step?.description}
            </Step>
          ))}
        {data?.length > 0 &&
          data.length >= 5 &&
          (current > data.length - 3 ? (
            <PassBeforeSteps />
          ) : current === data.length - 3 ? (
            <PassAllBeforeSteps />
          ) : (
            <PassAfterSteps />
          ))}
        {data?.length <= 0 && run(children)}
      </ul>
    </div>
  )
}) as StepsType

Steps.Item = Step
Steps.defaultProps = {
  value: 1,
  data: [],
  checked: false,
}

export default Steps
