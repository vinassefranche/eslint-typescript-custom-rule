import { TSESLint } from '@typescript-eslint/utils';
import myRule from './myRule';

export const rules = {
  'my-rule': myRule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
