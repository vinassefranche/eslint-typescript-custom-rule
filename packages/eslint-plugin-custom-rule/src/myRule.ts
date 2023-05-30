import { TSESLint, AST_NODE_TYPES } from '@typescript-eslint/utils';

type MessageIds = 'messageIdForSomeFailure' | 'messageIdForSomeOtherFailure';

const myRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    messages: {
      messageIdForSomeFailure: 'Error message for some failure',
      messageIdForSomeOtherFailure: 'Error message for some other failure',
    },
    schema: [], // no options
  },
  create: context => ({
    CallExpression: node => {
      if (node.callee.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      if (node.callee.name === 'foo') {
        return context.report({
          node: node.callee,
          messageId: 'messageIdForSomeFailure',
        });
      }
      if (node.callee.name === 'bar') {
        return context.report({
          node: node.callee,
          messageId: 'messageIdForSomeOtherFailure',
        });
      }

      return;
    },
  }),
};

export default myRule;
