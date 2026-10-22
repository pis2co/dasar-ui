import { TemplateRef } from '@angular/core';
import { ClassType, StyleType } from '../../models/type.model';

export type DasarToastVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type DasarToastPlacement =
  'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
export type DasarToastCloseReason = 'button' | 'timeout' | 'destroy';
export type DasarToastState = 'entering' | 'visible' | 'leaving';

export interface DasarToastRef {
  readonly id: number;
  close(): void;
  update(options: Partial<DasarToastOptions>): void;
}

export interface DasarToastContext {
  $implicit: DasarToastItem;
  toast: DasarToastItem;
  close: () => void;
}

export interface DasarToastOptions {
  label?: string;
  caption?: string;
  description?: string;
  content?: string | TemplateRef<DasarToastContext>;
  duration?: number;
  closeable?: boolean;
  icon?: string;
  to?: string;
  variant?: DasarToastVariant;
  aliveOnHover?: boolean;
  onEnter?: (ref: DasarToastRef) => void;
  onClose?: (ref: DasarToastRef, reason: DasarToastCloseReason) => void;
  onLeave?: (ref: DasarToastRef) => void;
}

export interface DasarToastItem {
  id: number;
  options: DasarToastOptions;
  state: DasarToastState;
  ref: DasarToastRef;
}

export interface DasarToastConfig {
  duration?: number;
  closeable?: boolean;
  variant?: DasarToastVariant;
  aliveOnHover?: boolean;
  closeIconName?: string;
  max?: number;
  placement?: DasarToastPlacement;
  scrollable?: boolean;
  blur?: string;
  containerClass?: ClassType;
  containerStyle?: StyleType;
}
