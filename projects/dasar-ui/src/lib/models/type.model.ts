export type ClassType =
  | string
  | string[]
  | Set<string>
  | {
      [klass: string]: any;
    }
  | null
  | undefined;
export type StyleType = Partial<CSSStyleDeclaration> | { [key: string]: any } | null;
export type ScaleAttributeType = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
