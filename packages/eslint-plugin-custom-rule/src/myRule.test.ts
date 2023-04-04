import { ESLintUtils } from '@typescript-eslint/utils';

import myRule from './myRule';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new ESLintUtils.RuleTester({
  parser: parserResolver as any, // yarn 2+ shenanigans
});

ruleTester.run('my-rule', myRule, {
  valid: ['notFooBar()', 'const foo = 2', 'const bar = 2'],
  invalid: [
    {
      code: 'foo()',
      errors: [{ messageId: 'messageIdForSomeFailure' }],
      output: 'fooBar()',
    },
    {
      code: 'bar()',
      errors: [{ messageId: 'messageIdForSomeOtherFailure' }],
      output: 'fooBar()',
    },
  ],
});
