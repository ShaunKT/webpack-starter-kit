module.exports = {
  plugins: ['stylelint-scss'],
  rules: {
    // CSS formatting
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
        ignore: ['after-comment']
      }
    ],

    // Comments
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands']
      }
    ],

    // Border
    'declaration-property-value-blacklist': {
      '/^border/': ['none']
    },

    // SASS
    // All @includes after properties
    // Nested selectors after properties

    // Variables dash-dashed
    // This regexp matches:
    // $button-text-background-color--hover-hola
    // regex under construction
    // 'scss/dollar-variable-pattern': '\b[a-z]+(?:-)+(\b[a-z]+(?:-))*',

    // forbid extend
    'at-rule-blacklist': ['extend'],

    // Nesting depth
    'max-nesting-depth': 3,

    // Specificity
    // "id,class,type",
    // selector-max-specificity
    'declaration-no-important': true,
    'selector-max-compound-selectors': 3,
    'selector-no-qualifying-type': true,

    // Selectors
    'no-duplicate-selectors': true,

    // Blocks
    'block-no-empty': true,
    'at-rule-empty-line-before': [
      'always',
      {
        // Allow mixins to have an empty line before
        ignoreAtRules: ['import', 'first-nested'],
      },
    ],
    // More styling rules for more consistency
    'at-rule-name-case': 'lower',

    // Colors
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,

    // strings
    'string-quotes': 'single',

    // Values
    // Disallow vendor prefix, they are added by autoprefixer
    'value-no-vendor-prefix': true,
    'value-list-comma-space-after': 'always-single-line',

    // Disallows margin: 1px 1px 1px 1px;
    'shorthand-property-no-redundant-values': true,

    // Comments
    'comment-whitespace-inside': 'always',

    // Functions
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',

    // Numbers
    // unitless zero and no trailing zeros
    'length-zero-no-unit': true,
    'number-no-trailing-zeros': true,

    // Syntax
    'declaration-block-trailing-semicolon': 'always',

    // Declaration blocks
    'declaration-block-no-duplicate-properties': true,

    // Prevents adding unnecesary Specificity or complicated sass stuff
    'scss/selector-no-redundant-nesting-selector': true
  }
};
