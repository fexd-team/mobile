module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    React: 'readonly',
    JSX: 'readonly',
    globalThis: 'readonly',
  },
  rules: {
    'no-undef': 2,
    '@typescript-eslint/array-type': 1, // 数组类型建议使用泛型
    '@typescript-eslint/no-shadow': 0, // 不建议定义影子变量（上层 scope 存在同名变量的变量）
    '@typescript-eslint/consistent-type-imports': 0, // 类型类型建议使用 import type 语法
    '@typescript-eslint/no-unused-vars': 0, // 不建议定义没用过的变量
    '@typescript-eslint/no-empty-interface': 0, // 不建议空的 interface 定义
    '@typescript-eslint/no-parameter-properties': 1, // 不建议使用参数属性
    'react-hooks/exhaustive-deps': 1, // effect hooks 需要补齐依赖
    'react/self-closing-comp': 1, // 空内容标签需要自闭合
    'react/no-array-index-key': 0, // 不要使用数组下标来作为 key
    'react/no-children-prop': 1, // 不要使用 children 属性
    'no-param-reassign': 1, // 不要给参数重新赋值
  },
}
