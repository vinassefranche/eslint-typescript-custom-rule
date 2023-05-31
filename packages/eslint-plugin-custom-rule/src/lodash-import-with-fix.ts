import { TSESLint, AST_NODE_TYPES } from '@typescript-eslint/utils';

const lodashImportWithFix: TSESLint.RuleModule<'defaultMessage'> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    messages: {
      defaultMessage: "Don't import from full lodash module",
    },
    fixable: 'code',
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
        messageId: 'defaultMessage',
        fix: fixer => {
          return fixer.replaceText(
            node,
            importedMethods
              .map(name => `import ${name} from "lodash/${name}";`)
              .join('\n'),
          );
        },
      });
    },
  }),
};

export default lodashImportWithFix;
