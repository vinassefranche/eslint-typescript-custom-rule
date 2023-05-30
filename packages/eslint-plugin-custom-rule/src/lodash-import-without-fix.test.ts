import { ESLintUtils } from '@typescript-eslint/utils';

import lodashImportWithoutFix from './lodash-import-without-fix';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new ESLintUtils.RuleTester({
  parser: parserResolver as any, // yarn 2+ shenanigans
});

ruleTester.run('lodash-import-without-fix', lodashImportWithoutFix, {
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
    },
    {
      code: 'import { range, uniq } from "lodash"',
      errors: [
        {
          messageId: 'defaultMessage',
        },
      ],
    },
  ],
});
