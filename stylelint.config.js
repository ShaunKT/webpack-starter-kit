module.exports = {
  plugins: ['stylelint-scss'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
          'local',
        ],
      },
    ],
    'selector-max-id': 3,
    indentation: 2,
    'selector-list-comma-newline-after': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'block-opening-brace-space-before': 'always',
    'declaration-block-single-line-max-declarations': 1,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment'],
      },
    ],
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands'],
      },
    ],
    'declaration-property-value-blacklist': {
      '/^border/': ['none'],
    },

    // SASS
    'at-rule-blacklist': ['extend'],
    'max-nesting-depth': 3,
    'declaration-no-important': true,
    'selector-max-compound-selectors': 3,
    'selector-no-qualifying-type': true,
    'no-duplicate-selectors': true,
    'block-no-empty': true,
    'at-rule-empty-line-before': [
      'always',
      {
        ignoreAtRules: ['import', 'first-nested'],
      },
    ],
    'at-rule-name-case': 'lower',
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,
    'string-quotes': 'single',
    'value-no-vendor-prefix': true,
    'value-list-comma-space-after': 'always-single-line',
    'shorthand-property-no-redundant-values': true,
    'comment-whitespace-inside': 'always',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'length-zero-no-unit': true,
    'number-no-trailing-zeros': true,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-block-no-duplicate-properties': true,
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
