import { RuleTester } from '@typescript-eslint/rule-tester';

import myRule from './myRule';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser: parserResolver as any, // yarn 2+ shenanigans
});

ruleTester.run('my-rule', myRule, {
  valid: ['notFooBar()', 'const foo = 2', 'const bar = 2'],
  invalid: [
    {
      code: 'foo()',
      errors: [{ messageId: 'messageIdForSomeFailure' }],
    },
    {
      code: 'bar()',
      errors: [{ messageId: 'messageIdForSomeOtherFailure' }],
    },
  ],
});
