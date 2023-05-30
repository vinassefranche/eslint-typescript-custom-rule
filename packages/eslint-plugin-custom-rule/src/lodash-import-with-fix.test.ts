import { ESLintUtils } from '@typescript-eslint/utils';

import lodashImportWithFix from './lodash-import-with-fix';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new ESLintUtils.RuleTester({
  parser: parserResolver as any, // yarn 2+ shenanigans
});

ruleTester.run('lodash-import-with-fix', lodashImportWithFix, {
  valid: [
    'import range from "lodash/range"',
    'import lodashRange from "lodash/range"',
    `import range from "lodash/range"
       import uniq from "lodash/uniq"`,
  ],
  invalid: [
    {
      code: 'import { range } from "lodash"',
      errors: [
        {
          messageId: 'defaultMessage',
        },
      ],
      output: 'import range from "lodash/range";',
    },
    {
      code: 'import { range, uniq } from "lodash"',
      errors: [
        {
          messageId: 'defaultMessage',
        },
      ],
      output: `import range from "lodash/range";\nimport uniq from "lodash/uniq";`,
    },
  ],
});
