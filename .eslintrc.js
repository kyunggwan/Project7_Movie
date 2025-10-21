module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // 사용하지 않는 변수는 무시 (off)
    'no-unused-vars': 'off',
    // console.log는 무시 (개발 시 유용)
    'no-console': 'off',
    // debugger는 오류로 유지 (실수로 남겨두면 안됨)
    'no-debugger': 'error'
  }
};
