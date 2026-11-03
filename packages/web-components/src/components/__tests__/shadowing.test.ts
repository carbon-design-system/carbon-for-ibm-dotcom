/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Class field shadowing detector across all c4d components', () => {
  it('should have zero shadowed reactive properties across all component classes', () => {
    const srcContext = (require as any).context(
      '..',
      true,
      /^(?!.*(__tests__|__stories__|story(-(angular|react|vue))?)).*\.ts$/
    );

    const auditedClasses = new Map<string, any>();
    const shadowedResults: Array<{
      className: string;
      shadowedProps: string[];
    }> = [];

    let totalPropertiesChecked = 0;

    srcContext.keys().forEach((key: string) => {
      const exports = srcContext(key);
      if (!exports) {
        return;
      }

      Object.keys(exports).forEach((exportName) => {
        const item = exports[exportName];
        if (
          typeof item === 'function' &&
          item.prototype &&
          item.elementProperties &&
          !auditedClasses.has(item.name || exportName)
        ) {
          auditedClasses.set(item.name || exportName, item);
        }
      });
    });

    // Classes whose constructor threw for a reason other than being an
    // unregistered custom element ("Illegal constructor"). Before this list
    // existed, such failures were skipped silently, which hid
    // `c4d-table-of-contents` throwing "Cannot set property _itemNodes ... which
    // has only a getter" (an initializer on a `@queryAll` field).
    const constructorFailures: string[] = [];

    auditedClasses.forEach((Clazz, className) => {
      let instance: any;
      try {
        instance = new Clazz();
      } catch (e) {
        // Unregistered classes (bases, mixins) cannot be constructed.
        if (!/Illegal constructor/i.test(String((e as Error)?.message))) {
          constructorFailures.push(`${className}: ${(e as Error)?.message}`);
        }
        return;
      }

      const shadowedProps: string[] = [];
      const elementProperties = Clazz.elementProperties;
      if (elementProperties && typeof elementProperties.keys === 'function') {
        for (const prop of elementProperties.keys()) {
          totalPropertiesChecked++;
          if (Object.prototype.hasOwnProperty.call(instance, prop)) {
            shadowedProps.push(String(prop));
          }
        }
      }

      if (shadowedProps.length > 0) {
        shadowedResults.push({
          className,
          shadowedProps,
        });
      }
    });

    // eslint-disable-next-line no-console
    console.log(
      `Shadowing detector: Audited ${auditedClasses.size} component classes, ${totalPropertiesChecked} reactive properties checked. Shadowed count: ${shadowedResults.length}`
    );

    expect(constructorFailures).toEqual([]);
    expect(shadowedResults).toEqual([]);
  });
});
