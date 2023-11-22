---
nav:
  title: 共建指南

title: 源码目录说明
order: 30
---

项目借助 `pnpm`、采用 `monorepo` 模式进行管理，目前包含以下 2 个模块

- `/packages/mobile`：组件库主包
- `/packages/mobile-router5`：V5 路由相关组件的衍生包，主要用来做路由动画

其中：

- `docs` 目录仅包含文档内容
- `packages/*` 目录包含各模块的具体实现

---

```jsx
/**
 * inline: true
 */
import React from 'react'
import Tree from '@dumiTheme/builtins/Tree'

export default () => (
  <Tree>
    <ul>
      <li>
        docs
        <ul>
          <li>
            documents
            <ul>
              <li>
                exports
                <ul>
                  <li>
                    data
                    <small>组件在文档中的分类</small>
                    <ul>
                      <li>
                        Button
                        <ul>
                          <li>
                            demo
                            <ul>
                              <li>index.tsx</li>
                              <li>style.less</li>
                            </ul>
                          </li>
                          <li>
                            index.md
                            <small>组件的具体文档</small>
                          </li>
                        </ul>
                      </li>
                      <li>
                        ...
                        <ul>
                          <li>...</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    ...
                    <ul>
                      <li>...</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        packages
        <ul>
          <li>
            mobile
            <small>组件库主包</small>
            <ul>
              <li>
                src
                <ul>
                  <li>
                    exports
                    <small>组件库导出内容的目录</small>
                    <ul>
                      <li>
                        Button
                        <ul>
                          <li>index.tsx</li>
                          <li>style.less</li>
                          <li>
                            type.ts
                            <small>组件类型定义，建议与组件实现分开</small>
                          </li>
                        </ul>
                      </li>
                      <li>
                        ...
                        <ul>
                          <li>...</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    helpers
                    <small>各种辅助函数</small>
                    <ul>
                      <li>...</li>
                    </ul>
                  </li>
                  <li>
                    theme
                    <small>全局样式变量</small>
                    <ul>
                      <li>...</li>
                    </ul>
                  </li>
                  <li>
                    index.ts
                    <small>组件库入口文件</small>
                  </li>
                  <li>
                    style.less
                    <small>组件库样式入口文件</small>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            mobile-router5
            <small>V5 路由相关组件的衍生包，主要用来做路由动画</small>
            <ul>
              <li>...</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        scripts
        <small>项目辅助脚本</small>
        <ul>
          <li>...</li>
        </ul>
      </li>
      <li>
        templates
        <small>快捷模板目录</small>
        <ul>
          <li>...</li>
        </ul>
      </li>
      <li>
        .umirc.ts
        <small>文档站点相关配置</small>
      </li>
      <li>...</li>
    </ul>
  </Tree>
)
```
