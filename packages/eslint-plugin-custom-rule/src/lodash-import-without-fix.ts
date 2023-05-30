import { TSESLint, AST_NODE_TYPES } from '@typescript-eslint/utils';

const lodashImportWithoutFix: TSESLint.RuleModule<'defaultMessage'> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    messages: {
      defaultMessage: "Don't import from full lodash module",
    },
    schema: [], // no options
  },
  create: context => ({
    ImportSpecifier: node => {
      if (
        !(
          node.parent &&
          node.parent.type === AST_NODE_TYPES.ImportDeclaration &&
          node.parent.source.value === 'lodash'
        )
      ) {
        return;
      }
      const parent = node.parent;

      const importedMethods = parent.specifiers
        .map(specifier => {
          return specifier.type === AST_NODE_TYPES.ImportSpecifier
            ? specifier.imported.name
            : null;
        })
        .filter((specifier): specifier is string => specifier !== null);

      const current = node.imported.name;

      if (importedMethods[0] !== current) {
        // we report all imported methods when handling the first one
        return;
      }

      return context.report({
        node: parent.source,
        messageId: 'defaultMessage',
      });
    },
  }),
};

export default lodashImportWithoutFix;