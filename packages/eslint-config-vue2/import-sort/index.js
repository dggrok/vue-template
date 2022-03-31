module.exports = {
  plugins: ['simple-import-sort'],

  rules: {
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          [
            // `vue` related packages come first.
            '^vue',
          ],
          [
            // Side effect imports.
            '^\\u0000',
            // Packages.
            // Things that start with a letter (or digit or underscore).
            '^\\w',
            // Packages.
            // Things that start with `@` followed by a letter.
            '^@?\\w',
            // Packages.
            // Things that start with `_` followed by a letter.
            '^_?\\w',
          ],
          [
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            '^',
            // Relative imports.
            // Anything that starts with a dot.
            '^\\.',
          ],
          [
            // Less imports.
            '^.+\\.l?ess$',
            // Scss imports.
            '^.+\\.s?css$',
            // Css imports.
            '^.+\\.css$',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 2,
  },
};
