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
    ImportDeclaration: node => {
      if (node.source.value !== 'lodash') {
        return;
      }
      const importedMethods = node.specifiers
        .map(specifier => {
          return specifier.type === AST_NODE_TYPES.ImportSpecifier
            ? specifier.imported.name
            : null;
        })
        .filter((specifier): specifier is string => specifier !== null);

      if (importedMethods.length === 0) {
        return;
      }

      return context.report({
        node: node.source,
        messageId: 'defaultMessage'
      });
    },
  }),
};

export default lodashImportWithoutFix;
