/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, TemplateResult } from 'lit-element';
import { number, text } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import 'carbon-web-components/es/components/tooltip/index';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { PRICING_TABLE_HEADER_CELL_TYPES } from '../defs';
import { DDS_PRICING_TABLE } from '../../../globals/internal/feature-flags';

enum CELL_TYPES {
  TEXT = 'text',
  ICON = 'icon',
  EMPTY = 'empty',
}

const renderHeaderCell = (iterator: number): TemplateResult => {
  const cellVariations = [
    html`
      <dds-pricing-table-header-cell>
        <dds-pricing-table-header-cell-headline>Variation ${iterator}</dds-pricing-table-header-cell-headline>
        <dds-pricing-table-header-cell-caption>Starting at $X.XX per user</dds-pricing-table-header-cell-caption>
        <dds-pricing-table-header-cell-tag href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Merchandising offer</dds-pricing-table-header-cell-tag
        >
        <dds-pricing-table-header-cell-description>
          Lorem ipsum dolor sit amet consectetur.
          <bx-unordered-list>
            <bx-list-item>Lorem ipsum dolor</bx-list-item>
            <bx-list-item>sit amet</bx-list-item>
            <bx-list-item>consectetur retention adispiscing elit sed do eiusm Eiusmod tempor</bx-list-item>
          </bx-unordered-list>
        </dds-pricing-table-header-cell-description>
        <dds-pricing-table-header-cell-cta
          cta-type="local"
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Call to action</dds-pricing-table-header-cell-cta
        >
      </dds-pricing-table-header-cell>
    `,
    html`
      <dds-pricing-table-header-cell>
        <dds-pricing-table-header-cell-headline>Variation ${iterator}</dds-pricing-table-header-cell-headline>
        <dds-pricing-table-header-cell-caption>Starting at $X.XX per user</dds-pricing-table-header-cell-caption>
        <dds-pricing-table-header-cell-description>
          Lorem ipsum dolor sit amet consectetur.
          <bx-unordered-list>
            <bx-list-item>Lorem ipsum dolor</bx-list-item>
            <bx-list-item>sit amet</bx-list-item>
            <bx-list-item>consectetur retention adispiscing elit sed do eiusm Eiusmod tempor</bx-list-item>
          </bx-unordered-list>
        </dds-pricing-table-header-cell-description>
        <dds-pricing-table-header-cell-cta
          cta-type="local"
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Call to action</dds-pricing-table-header-cell-cta
        >
      </dds-pricing-table-header-cell>
    `,
    html`
      <dds-pricing-table-header-cell>
        <dds-pricing-table-header-cell-headline>Variation ${iterator}</dds-pricing-table-header-cell-headline>
        <dds-pricing-table-header-cell-caption>Starting at $X.XX per user</dds-pricing-table-header-cell-caption>
        <dds-pricing-table-header-cell-tag href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Secondary tag</dds-pricing-table-header-cell-tag
        >
        <dds-pricing-table-header-cell-description>
          Lorem ipsum dolor sit amet consectetur.
          <bx-unordered-list>
            <bx-list-item>Lorem ipsum dolor</bx-list-item>
            <bx-list-item>sit amet</bx-list-item>
            <bx-list-item>consectetur retention adispiscing elit sed do eiusm Eiusmod tempor</bx-list-item>
          </bx-unordered-list>
        </dds-pricing-table-header-cell-description>
        <dds-pricing-table-header-cell-cta
          cta-type="local"
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Call to action</dds-pricing-table-header-cell-cta
        >
      </dds-pricing-table-header-cell>
    `,
  ];
  return cellVariations[(iterator - 1) % cellVariations.length];
};

const renderHead = (columnCount: number, heading: string = ''): TemplateResult => {
  return html`
    <dds-pricing-table-head>
      <dds-pricing-table-header-row>
        <dds-pricing-table-header-cell type="${PRICING_TABLE_HEADER_CELL_TYPES.SIMPLE}">${heading}</dds-pricing-table-header-cell>
        ${(() => {
          const cells: TemplateResult[] = [];
          for (let i = 1; i < columnCount; i++) {
            cells.push(renderHeaderCell(i));
          }
          return cells;
        })()}
      </dds-pricing-table-header-row>
    </dds-pricing-table-head>
  `;
};

const renderBodyCell = (type: CELL_TYPES): TemplateResult => {
  switch (type) {
    case CELL_TYPES.TEXT:
      return html`
        <dds-pricing-table-cell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
          Aenean posuere sem vel euismod dignissim.
          <dds-pricing-table-cell-annotation>
            Sed quis neque ultrices, convallis augue non, scelerisque massa.
          </dds-pricing-table-cell-annotation>
        </dds-pricing-table-cell>
      `;
    case CELL_TYPES.ICON:
      return html`
        <dds-pricing-table-cell icon="checkmark">
          Cell with icon
          <dds-pricing-table-cell-annotation>
            Sed quis neque ultrices, convallis augue non, scelerisque massa.
          </dds-pricing-table-cell-annotation>
        </dds-pricing-table-cell>
      `;
    default:
      return html`
        <dds-pricing-table-cell>
          <dds-pricing-table-cell-annotation>
            Sed quis neque ultrices, convallis augue non, scelerisque massa.
          </dds-pricing-table-cell-annotation>
        </dds-pricing-table-cell>
      `;
  }
};

const renderBodyRow = (
  columnCount: number,
  rowNum: number,
  cellType: CELL_TYPES,
  rowHeaders: boolean = true
): TemplateResult => html`
  <dds-pricing-table-row>
    ${(() => {
      const cells: TemplateResult[] = [
        html`
          ${rowHeaders
            ? html`
                <dds-pricing-table-header-cell scope="row">Row ${rowNum}</dds-pricing-table-header-cell>
              `
            : html`
                <dds-pricing-table-cell
                  >Row ${rowNum} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed,
                  aliquet bibendum augue. Aenean posuere sem vel euismod dignissim.</dds-pricing-table-cell
                >
              `}
        `,
      ];
      for (let i = 1; i < columnCount; i++) {
        cells.push(renderBodyCell(cellType));
      }
      return cells;
    })()}
  </dds-pricing-table-row>
`;

export const Default = !DDS_PRICING_TABLE
  ? undefined
  : ({ parameters }) => {
      const { colSpan1, colSpan2, colSpan3, colSpan4, highlightCol, highlightLabel, columnCount, heading } =
        parameters?.props?.PricingTable ?? {};
      return html`
        <div style="margin-bottom: 2rem;">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit, erat eu sodales facilisis, purus elit
            faucibus urna, eu iaculis enim lectus sit amet massa. Fusce ornare tristique mattis. Suspendisse ac feugiat orci, in
            tincidunt nibh. Donec vehicula mauris non lorem tincidunt posuere. Integer auctor nunc sit amet magna gravida commodo.
            Fusce nisl massa, scelerisque mollis dapibus ac, pharetra vel nibh. Quisque congue nulla enim, vitae auctor orci
            aliquet vitae. In hac habitasse platea dictumst.
          </p>
          <p>
            In hac habitasse platea dictumst. Aenean cursus et risus nec bibendum. Sed semper enim a eros accumsan, sit amet
            tempus dolor blandit. Praesent ut tellus eu nisl blandit blandit. Nulla dignissim nisl quis accumsan volutpat. Proin
            sit amet tempus risus. Nulla tellus neque, interdum sit amet lacus quis, condimentum pulvinar turpis. Vivamus
            consequat volutpat nisi vel dignissim. Pellentesque quis pretium orci. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Fusce sagittis, nibh non pellentesque consectetur, velit ipsum gravida est, sit amet commodo tellus
            lorem non erat. Nullam lobortis, nunc mattis lacinia feugiat, risus elit mattis lorem, ac tincidunt leo nibh vel
            massa. Cras ut est at massa efficitur posuere vel id felis. Donec nec diam vitae dolor varius lobortis sit amet in
            nibh. Donec pretium posuere nulla sit amet tristique.
          </p>
          <p>
            Donec pulvinar, urna eu pretium placerat, nibh nisl pharetra velit, eget tempor justo purus sed urna. Praesent
            accumsan et arcu id mollis. Nulla feugiat fermentum eros at lobortis. Mauris ultrices dictum augue, suscipit porttitor
            elit vulputate eget. Duis leo ipsum, dignissim at mi vel, pulvinar ullamcorper nisl. Nunc quis odio eu lectus
            convallis dictum. Proin at cursus turpis. Pellentesque laoreet leo in pellentesque ornare. In iaculis tellus ut lectus
            imperdiet egestas. Nullam lobortis sapien at odio rutrum rutrum. Morbi at sem vestibulum, dictum ante quis, aliquam
            turpis.
          </p>
          <p>
            Maecenas mi quam, hendrerit vel aliquam non, malesuada non ante. Nam egestas laoreet purus, vitae aliquam massa
            ultrices eu. Morbi condimentum augue et dui luctus, vel porttitor ipsum bibendum. In ornare nisl at aliquam
            pellentesque. Nullam auctor aliquet ornare. Vivamus suscipit id ipsum molestie rhoncus. Donec blandit imperdiet urna
            ac tempor. Suspendisse eu quam diam. Maecenas placerat suscipit eros, et tristique magna euismod at. Maecenas pretium
            ipsum sed elit ultrices sodales. Etiam sagittis arcu id enim bibendum, sed vestibulum felis iaculis.
          </p>
          <p>
            Proin pulvinar turpis id lectus maximus, ut lobortis ex vulputate. Nunc a suscipit magna. Nullam et orci at elit
            convallis hendrerit vel id neque. Sed tellus mi, auctor gravida enim non, congue suscipit augue. Nulla cursus
            tristique feugiat. Nam volutpat neque arcu, ut lobortis dui aliquam non. Phasellus sollicitudin, sem vel aliquam
            blandit, turpis tellus vulputate lacus, sed ultricies mi odio vitae orci. Duis nec nisi vitae risus tincidunt cursus
            non ut erat. Vivamus faucibus felis dui, a vulputate lorem eleifend vel. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </div>
        <dds-pricing-table
          col-span-1="${colSpan1 ?? ''}"
          col-span-2="${colSpan2 ?? ''}"
          col-span-3="${colSpan3 ?? ''}"
          col-span-4="${colSpan4 ?? ''}"
          highlight-column="${highlightCol}"
          highlight-label="${highlightLabel}"
        >
          ${renderHead(columnCount, heading)}
          <dds-pricing-table-body>
            ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
            ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)} ${renderBodyRow(columnCount, 5, CELL_TYPES.ICON)}
            ${renderBodyRow(columnCount, 6, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 7, CELL_TYPES.TEXT)}
            ${renderBodyRow(columnCount, 8, CELL_TYPES.TEXT)} ${renderBodyRow(columnCount, 9, CELL_TYPES.TEXT)}
            ${renderBodyRow(columnCount, 10, CELL_TYPES.TEXT)} ${renderBodyRow(columnCount, 11, CELL_TYPES.TEXT)}
            ${renderBodyRow(columnCount, 12, CELL_TYPES.TEXT)} ${renderBodyRow(columnCount, 13, CELL_TYPES.TEXT)}
          </dds-pricing-table-body>
        </dds-pricing-table>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit, erat eu sodales facilisis, purus elit faucibus
          urna, eu iaculis enim lectus sit amet massa. Fusce ornare tristique mattis. Suspendisse ac feugiat orci, in tincidunt
          nibh. Donec vehicula mauris non lorem tincidunt posuere. Integer auctor nunc sit amet magna gravida commodo. Fusce nisl
          massa, scelerisque mollis dapibus ac, pharetra vel nibh. Quisque congue nulla enim, vitae auctor orci aliquet vitae. In
          hac habitasse platea dictumst.
        </p>
        <p>
          In hac habitasse platea dictumst. Aenean cursus et risus nec bibendum. Sed semper enim a eros accumsan, sit amet tempus
          dolor blandit. Praesent ut tellus eu nisl blandit blandit. Nulla dignissim nisl quis accumsan volutpat. Proin sit amet
          tempus risus. Nulla tellus neque, interdum sit amet lacus quis, condimentum pulvinar turpis. Vivamus consequat volutpat
          nisi vel dignissim. Pellentesque quis pretium orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          sagittis, nibh non pellentesque consectetur, velit ipsum gravida est, sit amet commodo tellus lorem non erat. Nullam
          lobortis, nunc mattis lacinia feugiat, risus elit mattis lorem, ac tincidunt leo nibh vel massa. Cras ut est at massa
          efficitur posuere vel id felis. Donec nec diam vitae dolor varius lobortis sit amet in nibh. Donec pretium posuere nulla
          sit amet tristique.
        </p>
        <p>
          Donec pulvinar, urna eu pretium placerat, nibh nisl pharetra velit, eget tempor justo purus sed urna. Praesent accumsan
          et arcu id mollis. Nulla feugiat fermentum eros at lobortis. Mauris ultrices dictum augue, suscipit porttitor elit
          vulputate eget. Duis leo ipsum, dignissim at mi vel, pulvinar ullamcorper nisl. Nunc quis odio eu lectus convallis
          dictum. Proin at cursus turpis. Pellentesque laoreet leo in pellentesque ornare. In iaculis tellus ut lectus imperdiet
          egestas. Nullam lobortis sapien at odio rutrum rutrum. Morbi at sem vestibulum, dictum ante quis, aliquam turpis.
        </p>
        <p>
          Maecenas mi quam, hendrerit vel aliquam non, malesuada non ante. Nam egestas laoreet purus, vitae aliquam massa ultrices
          eu. Morbi condimentum augue et dui luctus, vel porttitor ipsum bibendum. In ornare nisl at aliquam pellentesque. Nullam
          auctor aliquet ornare. Vivamus suscipit id ipsum molestie rhoncus. Donec blandit imperdiet urna ac tempor. Suspendisse
          eu quam diam. Maecenas placerat suscipit eros, et tristique magna euismod at. Maecenas pretium ipsum sed elit ultrices
          sodales. Etiam sagittis arcu id enim bibendum, sed vestibulum felis iaculis.
        </p>
        <p>
          Proin pulvinar turpis id lectus maximus, ut lobortis ex vulputate. Nunc a suscipit magna. Nullam et orci at elit
          convallis hendrerit vel id neque. Sed tellus mi, auctor gravida enim non, congue suscipit augue. Nulla cursus tristique
          feugiat. Nam volutpat neque arcu, ut lobortis dui aliquam non. Phasellus sollicitudin, sem vel aliquam blandit, turpis
          tellus vulputate lacus, sed ultricies mi odio vitae orci. Duis nec nisi vitae risus tincidunt cursus non ut erat.
          Vivamus faucibus felis dui, a vulputate lorem eleifend vel. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit, erat eu sodales facilisis, purus elit faucibus
          urna, eu iaculis enim lectus sit amet massa. Fusce ornare tristique mattis. Suspendisse ac feugiat orci, in tincidunt
          nibh. Donec vehicula mauris non lorem tincidunt posuere. Integer auctor nunc sit amet magna gravida commodo. Fusce nisl
          massa, scelerisque mollis dapibus ac, pharetra vel nibh. Quisque congue nulla enim, vitae auctor orci aliquet vitae. In
          hac habitasse platea dictumst.
        </p>
        <p>
          In hac habitasse platea dictumst. Aenean cursus et risus nec bibendum. Sed semper enim a eros accumsan, sit amet tempus
          dolor blandit. Praesent ut tellus eu nisl blandit blandit. Nulla dignissim nisl quis accumsan volutpat. Proin sit amet
          tempus risus. Nulla tellus neque, interdum sit amet lacus quis, condimentum pulvinar turpis. Vivamus consequat volutpat
          nisi vel dignissim. Pellentesque quis pretium orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          sagittis, nibh non pellentesque consectetur, velit ipsum gravida est, sit amet commodo tellus lorem non erat. Nullam
          lobortis, nunc mattis lacinia feugiat, risus elit mattis lorem, ac tincidunt leo nibh vel massa. Cras ut est at massa
          efficitur posuere vel id felis. Donec nec diam vitae dolor varius lobortis sit amet in nibh. Donec pretium posuere nulla
          sit amet tristique.
        </p>
        <p>
          Donec pulvinar, urna eu pretium placerat, nibh nisl pharetra velit, eget tempor justo purus sed urna. Praesent accumsan
          et arcu id mollis. Nulla feugiat fermentum eros at lobortis. Mauris ultrices dictum augue, suscipit porttitor elit
          vulputate eget. Duis leo ipsum, dignissim at mi vel, pulvinar ullamcorper nisl. Nunc quis odio eu lectus convallis
          dictum. Proin at cursus turpis. Pellentesque laoreet leo in pellentesque ornare. In iaculis tellus ut lectus imperdiet
          egestas. Nullam lobortis sapien at odio rutrum rutrum. Morbi at sem vestibulum, dictum ante quis, aliquam turpis.
        </p>
        <p>
          Maecenas mi quam, hendrerit vel aliquam non, malesuada non ante. Nam egestas laoreet purus, vitae aliquam massa ultrices
          eu. Morbi condimentum augue et dui luctus, vel porttitor ipsum bibendum. In ornare nisl at aliquam pellentesque. Nullam
          auctor aliquet ornare. Vivamus suscipit id ipsum molestie rhoncus. Donec blandit imperdiet urna ac tempor. Suspendisse
          eu quam diam. Maecenas placerat suscipit eros, et tristique magna euismod at. Maecenas pretium ipsum sed elit ultrices
          sodales. Etiam sagittis arcu id enim bibendum, sed vestibulum felis iaculis.
        </p>
        <p>
          Proin pulvinar turpis id lectus maximus, ut lobortis ex vulputate. Nunc a suscipit magna. Nullam et orci at elit
          convallis hendrerit vel id neque. Sed tellus mi, auctor gravida enim non, congue suscipit augue. Nulla cursus tristique
          feugiat. Nam volutpat neque arcu, ut lobortis dui aliquam non. Phasellus sollicitudin, sem vel aliquam blandit, turpis
          tellus vulputate lacus, sed ultricies mi odio vitae orci. Duis nec nisi vitae risus tincidunt cursus non ut erat.
          Vivamus faucibus felis dui, a vulputate lorem eleifend vel. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit, erat eu sodales facilisis, purus elit faucibus
          urna, eu iaculis enim lectus sit amet massa. Fusce ornare tristique mattis. Suspendisse ac feugiat orci, in tincidunt
          nibh. Donec vehicula mauris non lorem tincidunt posuere. Integer auctor nunc sit amet magna gravida commodo. Fusce nisl
          massa, scelerisque mollis dapibus ac, pharetra vel nibh. Quisque congue nulla enim, vitae auctor orci aliquet vitae. In
          hac habitasse platea dictumst.
        </p>
        <p>
          In hac habitasse platea dictumst. Aenean cursus et risus nec bibendum. Sed semper enim a eros accumsan, sit amet tempus
          dolor blandit. Praesent ut tellus eu nisl blandit blandit. Nulla dignissim nisl quis accumsan volutpat. Proin sit amet
          tempus risus. Nulla tellus neque, interdum sit amet lacus quis, condimentum pulvinar turpis. Vivamus consequat volutpat
          nisi vel dignissim. Pellentesque quis pretium orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          sagittis, nibh non pellentesque consectetur, velit ipsum gravida est, sit amet commodo tellus lorem non erat. Nullam
          lobortis, nunc mattis lacinia feugiat, risus elit mattis lorem, ac tincidunt leo nibh vel massa. Cras ut est at massa
          efficitur posuere vel id felis. Donec nec diam vitae dolor varius lobortis sit amet in nibh. Donec pretium posuere nulla
          sit amet tristique.
        </p>
        <p>
          Donec pulvinar, urna eu pretium placerat, nibh nisl pharetra velit, eget tempor justo purus sed urna. Praesent accumsan
          et arcu id mollis. Nulla feugiat fermentum eros at lobortis. Mauris ultrices dictum augue, suscipit porttitor elit
          vulputate eget. Duis leo ipsum, dignissim at mi vel, pulvinar ullamcorper nisl. Nunc quis odio eu lectus convallis
          dictum. Proin at cursus turpis. Pellentesque laoreet leo in pellentesque ornare. In iaculis tellus ut lectus imperdiet
          egestas. Nullam lobortis sapien at odio rutrum rutrum. Morbi at sem vestibulum, dictum ante quis, aliquam turpis.
        </p>
        <p>
          Maecenas mi quam, hendrerit vel aliquam non, malesuada non ante. Nam egestas laoreet purus, vitae aliquam massa ultrices
          eu. Morbi condimentum augue et dui luctus, vel porttitor ipsum bibendum. In ornare nisl at aliquam pellentesque. Nullam
          auctor aliquet ornare. Vivamus suscipit id ipsum molestie rhoncus. Donec blandit imperdiet urna ac tempor. Suspendisse
          eu quam diam. Maecenas placerat suscipit eros, et tristique magna euismod at. Maecenas pretium ipsum sed elit ultrices
          sodales. Etiam sagittis arcu id enim bibendum, sed vestibulum felis iaculis.
        </p>
        <p>
          Proin pulvinar turpis id lectus maximus, ut lobortis ex vulputate. Nunc a suscipit magna. Nullam et orci at elit
          convallis hendrerit vel id neque. Sed tellus mi, auctor gravida enim non, congue suscipit augue. Nulla cursus tristique
          feugiat. Nam volutpat neque arcu, ut lobortis dui aliquam non. Phasellus sollicitudin, sem vel aliquam blandit, turpis
          tellus vulputate lacus, sed ultricies mi odio vitae orci. Duis nec nisi vitae risus tincidunt cursus non ut erat.
          Vivamus faucibus felis dui, a vulputate lorem eleifend vel. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit, erat eu sodales facilisis, purus elit faucibus
          urna, eu iaculis enim lectus sit amet massa. Fusce ornare tristique mattis. Suspendisse ac feugiat orci, in tincidunt
          nibh. Donec vehicula mauris non lorem tincidunt posuere. Integer auctor nunc sit amet magna gravida commodo. Fusce nisl
          massa, scelerisque mollis dapibus ac, pharetra vel nibh. Quisque congue nulla enim, vitae auctor orci aliquet vitae. In
          hac habitasse platea dictumst.
        </p>
        <p>
          In hac habitasse platea dictumst. Aenean cursus et risus nec bibendum. Sed semper enim a eros accumsan, sit amet tempus
          dolor blandit. Praesent ut tellus eu nisl blandit blandit. Nulla dignissim nisl quis accumsan volutpat. Proin sit amet
          tempus risus. Nulla tellus neque, interdum sit amet lacus quis, condimentum pulvinar turpis. Vivamus consequat volutpat
          nisi vel dignissim. Pellentesque quis pretium orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          sagittis, nibh non pellentesque consectetur, velit ipsum gravida est, sit amet commodo tellus lorem non erat. Nullam
          lobortis, nunc mattis lacinia feugiat, risus elit mattis lorem, ac tincidunt leo nibh vel massa. Cras ut est at massa
          efficitur posuere vel id felis. Donec nec diam vitae dolor varius lobortis sit amet in nibh. Donec pretium posuere nulla
          sit amet tristique.
        </p>
        <p>
          Donec pulvinar, urna eu pretium placerat, nibh nisl pharetra velit, eget tempor justo purus sed urna. Praesent accumsan
          et arcu id mollis. Nulla feugiat fermentum eros at lobortis. Mauris ultrices dictum augue, suscipit porttitor elit
          vulputate eget. Duis leo ipsum, dignissim at mi vel, pulvinar ullamcorper nisl. Nunc quis odio eu lectus convallis
          dictum. Proin at cursus turpis. Pellentesque laoreet leo in pellentesque ornare. In iaculis tellus ut lectus imperdiet
          egestas. Nullam lobortis sapien at odio rutrum rutrum. Morbi at sem vestibulum, dictum ante quis, aliquam turpis.
        </p>
        <p>
          Maecenas mi quam, hendrerit vel aliquam non, malesuada non ante. Nam egestas laoreet purus, vitae aliquam massa ultrices
          eu. Morbi condimentum augue et dui luctus, vel porttitor ipsum bibendum. In ornare nisl at aliquam pellentesque. Nullam
          auctor aliquet ornare. Vivamus suscipit id ipsum molestie rhoncus. Donec blandit imperdiet urna ac tempor. Suspendisse
          eu quam diam. Maecenas placerat suscipit eros, et tristique magna euismod at. Maecenas pretium ipsum sed elit ultrices
          sodales. Etiam sagittis arcu id enim bibendum, sed vestibulum felis iaculis.
        </p>
        <p>
          Proin pulvinar turpis id lectus maximus, ut lobortis ex vulputate. Nunc a suscipit magna. Nullam et orci at elit
          convallis hendrerit vel id neque. Sed tellus mi, auctor gravida enim non, congue suscipit augue. Nulla cursus tristique
          feugiat. Nam volutpat neque arcu, ut lobortis dui aliquam non. Phasellus sollicitudin, sem vel aliquam blandit, turpis
          tellus vulputate lacus, sed ultricies mi odio vitae orci. Duis nec nisi vitae risus tincidunt cursus non ut erat.
          Vivamus faucibus felis dui, a vulputate lorem eleifend vel. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas.
        </p>
      `;
    };

export const WithoutRowHeaders = !DDS_PRICING_TABLE
  ? undefined
  : ({ parameters }) => {
      const { colSpan1, colSpan2, colSpan3, colSpan4, highlightCol, highlightLabel, columnCount, heading } =
        parameters?.props?.PricingTable ?? {};
      return html`
        <dds-pricing-table
          col-span-1="${colSpan1 ?? ''}"
          col-span-2="${colSpan2 ?? ''}"
          col-span-3="${colSpan3 ?? ''}"
          col-span-4="${colSpan4 ?? ''}"
          highlight-column="${highlightCol}"
          highlight-label="${highlightLabel}"
        >
          ${renderHead(columnCount, heading)}
          <dds-pricing-table-body>
            ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON, false)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY, false)}
            ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT, false)} ${renderBodyRow(columnCount, 4, CELL_TYPES.TEXT, false)}
            ${renderBodyRow(columnCount, 5, CELL_TYPES.ICON, false)} ${renderBodyRow(columnCount, 6, CELL_TYPES.ICON, false)}
            ${renderBodyRow(columnCount, 7, CELL_TYPES.EMPTY, false)} ${renderBodyRow(columnCount, 8, CELL_TYPES.TEXT, false)}
            ${renderBodyRow(columnCount, 9, CELL_TYPES.EMPTY, false)} ${renderBodyRow(columnCount, 10, CELL_TYPES.TEXT, false)}
          </dds-pricing-table-body>
        </dds-pricing-table>
      `;
    };
if (WithoutRowHeaders) {
  // @ts-ignore
  WithoutRowHeaders.story = {
    name: 'Without row headers',
  };
}

export const WithSubheaders = !DDS_PRICING_TABLE
  ? undefined
  : ({ parameters }) => {
      const { colSpan1, colSpan2, colSpan3, colSpan4, columnCount, highlightCol, highlightLabel, heading } =
        parameters?.props?.PricingTable ?? {};
      return html`
        <dds-pricing-table
          col-span-1="${colSpan1 ?? ''}"
          col-span-2="${colSpan2 ?? ''}"
          col-span-3="${colSpan3 ?? ''}"
          col-span-4="${colSpan4 ?? ''}"
          highlight-column="${highlightCol}"
          highlight-label="${highlightLabel}"
        >
          ${renderHead(columnCount, heading)}
          <dds-pricing-table-body>
            <dds-pricing-table-group title="Group 1">
              ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
              ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
            </dds-pricing-table-group>
            <dds-pricing-table-group title="Group 2">
              ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
              ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
            </dds-pricing-table-group>
            <dds-pricing-table-group title="Group 3">
              ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
              ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
            </dds-pricing-table-group>
          </dds-pricing-table-body>
        </dds-pricing-table>
      `;
    };
if (WithSubheaders) {
  // @ts-ignore
  WithSubheaders.story = {
    name: 'With subheaders',
  };
}

export default !DDS_PRICING_TABLE
  ? undefined
  : {
      title: 'Components/Pricing Table',
      parameters: {
        ...readme.parameters,
        knobs: {
          PricingTable: ({ groupId }) => ({
            heading: text('section heading', 'Optional section heading', groupId),
            columnCount: number('number of columns', 3, { min: 1, max: 8 }, groupId),
            highlightCol: number('highlighted column', 2, { min: 0, max: 8 }, groupId),
            highlightLabel: text('highlighted label', 'Featured', groupId),
            colSpan1: textNullable('col-span-1', '', groupId),
            colSpan2: textNullable('col-span-2', '', groupId),
            colSpan3: textNullable('col-span-3', '', groupId),
            colSpan4: textNullable('col-span-4', '', groupId),
          }),
        },
      },
      propsSet: {
        default: {
          PricingTable: {
            heading: 'Optional section heading',
            columnCount: 3,
            highlightCol: 2,
            highlightLabel: 'Featured',
            colSpan1: '',
            colSpan2: '',
            colSpan3: '',
            colSpan4: '',
          },
        },
      },
      decorators: [
        story => html`
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--col-lg-16">
                ${story()}
              </div>
            </div>
          </div>
        `,
      ],
    };
