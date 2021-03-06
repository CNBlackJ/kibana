/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@kbn/i18n';
import { schema } from '@kbn/config-schema';
import { CoreSetup, Plugin } from 'kibana/server';
import { COLOR_MAPPING_SETTING, palette, systemPalette } from '../common';
import { ExpressionsServerSetup } from '../../expressions/server';

interface SetupDependencies {
  expressions: ExpressionsServerSetup;
}

export class ChartsServerPlugin implements Plugin<object, object> {
  public setup(core: CoreSetup, dependencies: SetupDependencies) {
    dependencies.expressions.registerFunction(palette);
    dependencies.expressions.registerFunction(systemPalette);
    core.uiSettings.register({
      [COLOR_MAPPING_SETTING]: {
        name: i18n.translate('charts.advancedSettings.visualization.colorMappingTitle', {
          defaultMessage: 'Color mapping',
        }),
        value: JSON.stringify({
          Count: '#00A69B',
        }),
        type: 'json',
        description: i18n.translate('charts.advancedSettings.visualization.colorMappingText', {
          defaultMessage:
            'Maps values to specific colors in <strong>Visualize</strong> charts and <strong>TSVB</strong>. This setting does not apply to <strong>Lens.</strong>',
        }),
        deprecation: {
          message: i18n.translate(
            'charts.advancedSettings.visualization.colorMappingTextDeprecation',
            {
              defaultMessage: 'This setting is deprecated and will not be supported as of 8.0.',
            }
          ),
          docLinksKey: 'visualizationSettings',
        },
        category: ['visualization'],
        schema: schema.string(),
      },
    });

    return {};
  }

  public start() {
    return {};
  }

  public stop() {}
}
