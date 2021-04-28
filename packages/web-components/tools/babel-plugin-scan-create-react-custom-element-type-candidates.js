/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { dirname, isAbsolute, normalize, relative, resolve, sep } = require('path');

function isExternal(source) {
  if (source[0] === '.') {
    return false;
  }
  const tokens = normalize(source).split(sep);
  const moduleName = tokens.slice(0, source[0] === '@' ? 2 : 1).join(sep);
  try {
    require.resolve(`${moduleName}/package.json`);
    return true;
  } catch {
    return false;
  }
}

function createMetadataVisitor() {
  const resolveModule = (dir, source) => {
    try {
      return require.resolve(source);
    } catch {
      return resolve(dir, source);
    }
  };

  const getParentClassImportSource = path => {
    const { parentPath } = path;
    if (path.isImportDefaultSpecifier() && parentPath.isImportDeclaration && parentPath.get('source').isStringLiteral()) {
      return parentPath.get('source').node.value;
    }
    return undefined;
  };

  /**
   * Metadata harvested from `@property` decorator.
   *
   * @typedef {object} PropertyMetadata
   * @property {string} [type] The property type.
   * @property {string|boolean} [attribute]
   *   The attribute name the property maps to.
   *   `false` means there is no corresponding attribute.
   */

  /**
   * @param {string} path The Babel path of the superclass.
   * @returns {PropertyMetadata}
   *   The given Babel path itself if it's an identifier.
   *   The first argument if the given Babel path is a function, assuming it as a mixin call.
   */
  const getTarget = path => {
    if (path.isIdentifier()) {
      return path;
    }
    if (path.isCallExpression()) {
      return getTarget(path.get('arguments.0'));
    }
    return null;
  };

  /**
   * A visitor to find if the file should generate a React component, and the path of parent class implementation.
   * The gathered metadata is stored in the context, `isCandidate` for the former, `parentDescriptorSource` for the latter.
   */
  const metadataVisitor = {
    ClassDeclaration(path, context) {
      const { file } = context;
      const superClass = getTarget(path.get('superClass'));
      if (superClass) {
        const parentClassImportSource = getParentClassImportSource(superClass.scope.getBinding(superClass.node.name).path);
        if (parentClassImportSource) {
          const relativeTarget = relative(
            resolve(__dirname, '../src/components'),
            resolveModule(dirname(file.opts.filename), parentClassImportSource)
          );
          if (!isAbsolute(relativeTarget) && !relativeTarget.startsWith('..')) {
            context.parentDescriptorSource = parentClassImportSource;
          }
        }
      }
    },

    ImportDeclaration(path, context) {
      const { source } = path.node;
      const { file } = context;
      if (source) {
        const { value: sourceValue } = source;
        if (!isExternal(sourceValue)) {
          const resolved = resolveModule(dirname(file.opts.filename), sourceValue);
          const relativeTarget = relative(resolve(__dirname, '../src'), resolved);
          if (!isAbsolute(relativeTarget) && !relativeTarget.startsWith('..')) {
            context.dependencies.add(resolved);
          }
        }
      }
    },

    ExportDefaultDeclaration(path, context) {
      const { source } = path.node;
      const { file } = context;
      if (source) {
        const { value: sourceValue } = source;
        if (!isExternal(sourceValue)) {
          const resolved = resolveModule(dirname(file.opts.filename), sourceValue);
          const relativeTarget = relative(resolve(__dirname, '../src'), resolved);
          if (!isAbsolute(relativeTarget) && !relativeTarget.startsWith('..')) {
            context.dependencies.add(resolved);
          }
        }
      } else {
        const leadingComments = path.get('leadingComments');
        context.isCandidate =
          leadingComments &&
          (Array.isArray(leadingComments) ? leadingComments : [leadingComments]).find(item =>
            /^\s*[@#]__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__\s*$/.test(item.node && item.node.value)
          );
      }
    },

    ExportNamedDeclaration(path, context) {
      const { source } = path.node;
      const { file } = context;
      if (source) {
        const { value: sourceValue } = source;
        if (!isExternal(sourceValue)) {
          const resolved = resolveModule(dirname(file.opts.filename), sourceValue);
          const relativeTarget = relative(resolve(__dirname, '../src'), resolved);
          if (!isAbsolute(relativeTarget) && !relativeTarget.startsWith('..')) {
            context.dependencies.add(resolved);
          }
        }
      }
    },
  };

  return metadataVisitor;
}

module.exports = function generateCreateReactCustomElementType(api, { candidates = new Set(), dependencies = new Set() } = {}) {
  const metadataVisitor = createMetadataVisitor();

  /**
   * A Babel plugin that first gathers metadata of custom element properties/events from AST,
   * then creates another AST of `createReactCustomElementType()` and replaces the original AST with the created one.
   */
  return {
    name: 'create-react-custom-element-type',
    visitor: {
      Program(path, { file }) {
        const harvestedDependencies = new Set();
        const context = { dependencies: harvestedDependencies, file };
        // Gathers metadata of custom element properties and events, into `context`
        path.traverse(metadataVisitor, context);

        if (context.isCandidate) {
          candidates.add(file.opts.filename);
          if (context.parentDescriptorSource && !isExternal(context.parentDescriptorSource)) {
            candidates.add(resolve(dirname(file.opts.filename), context.parentDescriptorSource));
          }
          // eslint-disable-next-line no-restricted-syntax
          for (const dependency of harvestedDependencies) {
            if (!candidates.has(dependency)) {
              dependencies.add(dependency);
            }
          }
        }
      },
    },
  };
};

module.exports.createMetadataVisitor = createMetadataVisitor;
