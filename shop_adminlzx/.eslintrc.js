module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  // extends: ["plugin:vue/essential"],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.VUE_APP_MODE === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.VUE_APP_MODE === 'production' ? 'warn' : 'off',
    'no-trailing-spaces':0,
  }
}
