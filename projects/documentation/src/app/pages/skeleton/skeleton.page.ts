import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { SkeletonBasicExample } from './examples/basic/skeleton-basic.example';
import { SkeletonTypesExample } from './examples/types/skeleton-types.example';
import { SkeletonSizesExample } from './examples/sizes/skeleton-sizes.example';
import { SkeletonRepeatExample } from './examples/repeat/skeleton-repeat.example';
import { SkeletonCircleExample } from './examples/circle/skeleton-circle.example';
import { SkeletonRadiusExample } from './examples/radius/skeleton-radius.example';
import { SkeletonAnimatedExample } from './examples/animated/skeleton-animated.example';
import { SkeletonFullWidthExample } from './examples/full-width/skeleton-full-width.example';
import { SkeletonCardPatternExample } from './examples/card-pattern/skeleton-card-pattern.example';
import { SkeletonThemeExample } from './examples/theme/skeleton-theme.example';

// @ts-ignore
import basicHtml from './examples/basic/skeleton-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/skeleton-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import typesHtml from './examples/types/skeleton-types.example.html' with { loader: 'text' };
// @ts-ignore
import typesTs from './examples/types/skeleton-types.example.ts' with { loader: 'text' };

// @ts-ignore
import sizesHtml from './examples/sizes/skeleton-sizes.example.html' with { loader: 'text' };
// @ts-ignore
import sizesTs from './examples/sizes/skeleton-sizes.example.ts' with { loader: 'text' };

// @ts-ignore
import repeatHtml from './examples/repeat/skeleton-repeat.example.html' with { loader: 'text' };
// @ts-ignore
import repeatTs from './examples/repeat/skeleton-repeat.example.ts' with { loader: 'text' };

// @ts-ignore
import circleHtml from './examples/circle/skeleton-circle.example.html' with { loader: 'text' };
// @ts-ignore
import circleTs from './examples/circle/skeleton-circle.example.ts' with { loader: 'text' };

// @ts-ignore
import radiusHtml from './examples/radius/skeleton-radius.example.html' with { loader: 'text' };
// @ts-ignore
import radiusTs from './examples/radius/skeleton-radius.example.ts' with { loader: 'text' };

// @ts-ignore
import animatedHtml from './examples/animated/skeleton-animated.example.html' with {
  loader: 'text',
};
// @ts-ignore
import animatedTs from './examples/animated/skeleton-animated.example.ts' with { loader: 'text' };

// @ts-ignore
import fullWidthHtml from './examples/full-width/skeleton-full-width.example.html' with {
  loader: 'text',
};
// @ts-ignore
import fullWidthTs from './examples/full-width/skeleton-full-width.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import cardPatternHtml from './examples/card-pattern/skeleton-card-pattern.example.html' with {
  loader: 'text',
};
// @ts-ignore
import cardPatternTs from './examples/card-pattern/skeleton-card-pattern.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import themeHtml from './examples/theme/skeleton-theme.example.html' with { loader: 'text' };
// @ts-ignore
import themeTs from './examples/theme/skeleton-theme.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    SkeletonBasicExample,
    SkeletonTypesExample,
    SkeletonSizesExample,
    SkeletonRepeatExample,
    SkeletonCircleExample,
    SkeletonRadiusExample,
    SkeletonAnimatedExample,
    SkeletonFullWidthExample,
    SkeletonCardPatternExample,
    SkeletonThemeExample,
  ],
  templateUrl: './skeleton.page.html',
  selector: 'app-skeleton-page',
  standalone: true,
})
export class SkeletonDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected typesHtml = typesHtml;
  protected typesTs = typesTs;

  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;

  protected repeatHtml = repeatHtml;
  protected repeatTs = repeatTs;

  protected circleHtml = circleHtml;
  protected circleTs = circleTs;

  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;

  protected animatedHtml = animatedHtml;
  protected animatedTs = animatedTs;

  protected fullWidthHtml = fullWidthHtml;
  protected fullWidthTs = fullWidthTs;

  protected cardPatternHtml = cardPatternHtml;
  protected cardPatternTs = cardPatternTs;

  protected themeHtml = themeHtml;
  protected themeTs = themeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'type',
      type: "'text' | 'box'",
      defaultValue: "'text'",
      description:
        'Shape of the placeholder. text is a thin rounded line, box is a rectangular block.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'Default line height and box dimensions when width and height are not set.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Corner radius. Ignored when circle is set.',
    },
    {
      name: 'width',
      type: 'string | number | null',
      defaultValue: 'null',
      description: 'Width of each item. Numbers are treated as pixels, strings as any CSS length.',
    },
    {
      name: 'height',
      type: 'string | number | null',
      defaultValue: 'null',
      description: 'Height of each item. Numbers are treated as pixels, strings as any CSS length.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Stretches each item to the container width.',
    },
    {
      name: 'repeat',
      type: 'number',
      defaultValue: '1',
      description:
        'Number of items rendered. The last of a multi-line text block is slightly shorter.',
    },
    {
      name: 'animated',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Applies the shimmer animation. Respects prefers-reduced-motion.',
    },
    {
      name: 'circle',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Renders a square item with a circular mask, for example for avatars.',
    },
    {
      name: 'container-class / container-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the skeleton container.',
    },
    {
      name: 'item-class / item-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style applied to every skeleton item.',
    },
  ];
}
