module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    "indentation": 2,
    "color-named" : "never",
    "number-leading-zero": null,
    "property-no-unknown": [ true, {
      "ignoreProperties": [
        "composes", "-webkit-transition"
      ]
    }],
    "unit-whitelist": ["em", "rem", "s", "px", "%", "vh", "vw", "deg", "ms"],
    'declaration-empty-line-before': null,
    'selector-class-pattern':
      '^[\\w]+(-[\\w\\d]+)*(__[\\w]+(-[\\w\\d]+)*)?(--[\\w]+(-[\\w\\d]+)*)?(:{1,2}.+)?$',
  },
  ignoreFiles: ['**/reset.css'],
};
