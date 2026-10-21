import {
  DasarThemeButton,
  DasarThemeButtonGroup,
  DasarThemeCalendar,
  DasarThemeDivider,
  DasarThemeAlert,
  DasarThemeCheckbox,
  DasarThemeRadio,
  DasarThemeCard,
  DasarThemeChip,
  DasarThemeColors,
  DasarThemeConfig,
  DasarThemeDatepicker,
  DasarThemeInput,
  DasarThemeSelect,
  DasarThemeCommon,
  DasarThemeMenu,
  DasarThemeMode,
  DasarThemeTabs,
  DasarThemeOverlay,
  DasarThemeModal,
  DasarThemeDrawer,
  DasarThemeTree,
  DasarThemeSkeleton,
} from '@models/theme.model';
import {
  DASAR_THEME_PROVIDER,
  defaultDarkCommonTokens,
  defaultLightCommonTokens,
} from '../components/dasar-theme-provider/dasar-theme-provider';
import { dasarVariables } from '../styles/theme';
import {
  DOCUMENT,
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export const commonMap: Record<keyof DasarThemeCommon, string> = {
  primaryColor: '--dasar-theme-primary-color',
  primaryHoverColor: '--dasar-theme-primary-hover-color',
  primaryActiveColor: '--dasar-theme-primary-active-color',
  primarySurfaceColor: '--dasar-theme-primary-surface-color',
  textPrimaryColor: '--dasar-theme-text-primary-color',
  textSecondaryColor: '--dasar-theme-text-secondary-color',
  textDisabledColor: '--dasar-theme-text-disabled-color',
  textInverseColor: '--dasar-theme-text-inverse-color',
  bgDefaultColor: '--dasar-theme-bg-default-color',
  bgSurfaceColor: '--dasar-theme-bg-surface-color',
  bgWindowColor: '--dasar-theme-bg-window-color',
  bgHoverColor: '--dasar-theme-bg-hover-color',
  borderSubtleColor: '--dasar-theme-border-subtle-color',
  borderStrongColor: '--dasar-theme-border-strong-color',
  fontSans: '--dasar-font-sans',
  fontHero: '--dasar-font-hero',
  fontWeightRegular: '--dasar-font-weight-regular',
  fontWeightMedium: '--dasar-font-weight-medium',
  fontWeightSemibold: '--dasar-font-weight-semibold',
  fontWeightBold: '--dasar-font-weight-bold',
  fontSizeXss: '--dasar-font-size-xss',
  fontSizeXs: '--dasar-font-size-xs',
  fontSizeSm: '--dasar-font-size-sm',
  fontSizeBase: '--dasar-font-size-base',
  fontSizeLg: '--dasar-font-size-lg',
  fontSizeXl: '--dasar-font-size-xl',
  lineHeightNormal: '--dasar-line-height-normal',
  lineHeightTight: '--dasar-line-height-tight',
};
export const buttonMap: Record<keyof DasarThemeButton, string> = {
  fontWeight: '--dasar-btn-font-weight',
  gap: '--dasar-btn-gap',
  heightXs: '--dasar-btn-height-xs',
  paddingHorizontalXs: '--dasar-btn-padding-horizontal-xs',
  iconSizeXs: '--dasar-btn-icon-size-xs',
  heightSm: '--dasar-btn-height-sm',
  paddingHorizontalSm: '--dasar-btn-padding-horizontal-sm',
  iconSizeSm: '--dasar-btn-icon-size-sm',
  heightMd: '--dasar-btn-height-md',
  paddingHorizontalMd: '--dasar-btn-padding-horizontal-md',
  iconSizeMd: '--dasar-btn-icon-size-md',
  heightLg: '--dasar-btn-height-lg',
  paddingHorizontalLg: '--dasar-btn-padding-horizontal-lg',
  iconSizeLg: '--dasar-btn-icon-size-lg',
  heightXl: '--dasar-btn-height-xl',
  paddingHorizontalXl: '--dasar-btn-padding-horizontal-xl',
  iconSizeXl: '--dasar-btn-icon-size-xl',
  radiusNone: '--dasar-btn-radius-none',
  radiusXs: '--dasar-btn-radius-xs',
  radiusSm: '--dasar-btn-radius-sm',
  radiusMd: '--dasar-btn-radius-md',
  radiusLg: '--dasar-btn-radius-lg',
  radiusXl: '--dasar-btn-radius-xl',
  radiusFull: '--dasar-btn-radius-full',
  disabledBg: '--dasar-btn-disabled-bg',
  disabledBorder: '--dasar-btn-disabled-border',
  disabledColor: '--dasar-btn-disabled-color',
  primaryBg: '--dasar-btn-primary-bg',
  primaryBorder: '--dasar-btn-primary-border',
  primaryColor: '--dasar-btn-primary-color',
  primaryHoverBg: '--dasar-btn-primary-hover-bg',
  primaryHoverBorder: '--dasar-btn-primary-hover-border',
  primaryFocusRing: '--dasar-btn-primary-focus-ring',
  primarySubtleBg: '--dasar-btn-primary-subtle-bg',
  primarySubtleColor: '--dasar-btn-primary-subtle-color',
  primarySubtleHoverBg: '--dasar-btn-primary-subtle-hover-bg',
  primarySubtleHoverColor: '--dasar-btn-primary-subtle-hover-color',
  primaryOutlineBorder: '--dasar-btn-primary-outline-border',
  primaryOutlineColor: '--dasar-btn-primary-outline-color',
  primaryOutlineHoverBg: '--dasar-btn-primary-outline-hover-bg',
  successBg: '--dasar-btn-success-bg',
  successBorder: '--dasar-btn-success-border',
  successColor: '--dasar-btn-success-color',
  successFocusRing: '--dasar-btn-success-focus-ring',
  successSubtleBg: '--dasar-btn-success-subtle-bg',
  successSubtleColor: '--dasar-btn-success-subtle-color',
  successSubtleHoverBg: '--dasar-btn-success-subtle-hover-bg',
  successSubtleHoverColor: '--dasar-btn-success-subtle-hover-color',
  successOutlineBorder: '--dasar-btn-success-outline-border',
  successOutlineColor: '--dasar-btn-success-outline-color',
  successOutlineHoverBg: '--dasar-btn-success-outline-hover-bg',
  warningBg: '--dasar-btn-warning-bg',
  warningBorder: '--dasar-btn-warning-border',
  warningColor: '--dasar-btn-warning-color',
  warningFocusRing: '--dasar-btn-warning-focus-ring',
  warningSubtleBg: '--dasar-btn-warning-subtle-bg',
  warningSubtleColor: '--dasar-btn-warning-subtle-color',
  warningSubtleHoverBg: '--dasar-btn-warning-subtle-hover-bg',
  warningSubtleHoverColor: '--dasar-btn-warning-subtle-hover-color',
  warningOutlineBorder: '--dasar-btn-warning-outline-border',
  warningOutlineColor: '--dasar-btn-warning-outline-color',
  warningOutlineHoverBg: '--dasar-btn-warning-outline-hover-bg',
  dangerBg: '--dasar-btn-danger-bg',
  dangerBorder: '--dasar-btn-danger-border',
  dangerColor: '--dasar-btn-danger-color',
  dangerFocusRing: '--dasar-btn-danger-focus-ring',
  dangerSubtleBg: '--dasar-btn-danger-subtle-bg',
  dangerSubtleColor: '--dasar-btn-danger-subtle-color',
  dangerSubtleHoverBg: '--dasar-btn-danger-subtle-hover-bg',
  dangerSubtleHoverColor: '--dasar-btn-danger-subtle-hover-color',
  dangerOutlineBorder: '--dasar-btn-danger-outline-border',
  dangerOutlineColor: '--dasar-btn-danger-outline-color',
  dangerOutlineHoverBg: '--dasar-btn-danger-outline-hover-bg',
  secondaryBg: '--dasar-btn-secondary-bg',
  secondaryBorder: '--dasar-btn-secondary-border',
  secondaryColor: '--dasar-btn-secondary-color',
  secondaryHoverBg: '--dasar-btn-secondary-hover-bg',
  secondaryFocusRing: '--dasar-btn-secondary-focus-ring',
  secondarySubtleBg: '--dasar-btn-secondary-subtle-bg',
  secondarySubtleColor: '--dasar-btn-secondary-subtle-color',
  secondarySubtleHoverBg: '--dasar-btn-secondary-subtle-hover-bg',
  secondarySubtleHoverColor: '--dasar-btn-secondary-subtle-hover-color',
  secondaryOutlineBorder: '--dasar-btn-secondary-outline-border',
  secondaryOutlineColor: '--dasar-btn-secondary-outline-color',
  secondaryOutlineHoverBg: '--dasar-btn-secondary-outline-hover-bg',
  ghostColor: '--dasar-btn-ghost-color',
  ghostHoverBg: '--dasar-btn-ghost-hover-bg',
  ghostHoverColor: '--dasar-btn-ghost-hover-color',
  ghostFocusRing: '--dasar-btn-ghost-focus-ring',
};
export const buttonGroupMap: Record<keyof DasarThemeButtonGroup, string> = {
  gap: '--dasar-btn-group-gap',
  radius: '--dasar-btn-group-radius',
  dividerColor: '--dasar-btn-group-divider-color',
  focusZIndex: '--dasar-btn-group-focus-z-index',
};
export const inputMap: Record<keyof DasarThemeInput, string> = {
  wrapperGap: '--dasar-input-wrapper-gap',
  gap: '--dasar-input-gap',
  color: '--dasar-input-color',
  labelFontsize: '--dasar-input-label-font-size',
  labelFontWeight: '--dasar-input-label-font-weight',
  labelColor: '--dasar-input-label-color',
  labelRightFontsize: '--dasar-input-label-right-font-size',
  labelRightColor: '--dasar-input-label-right-color',
  heightXs: '--dasar-input-height-xs',
  paddingHorizontalXs: '--dasar-input-padding-horizontal-xs',
  heightSm: '--dasar-input-height-sm',
  paddingHorizontalSm: '--dasar-input-padding-horizontal-sm',
  heightMd: '--dasar-input-height-md',
  paddingHorizontalMd: '--dasar-input-padding-horizontal-md',
  heightLg: '--dasar-input-height-lg',
  paddingHorizontalLg: '--dasar-input-padding-horizontal-lg',
  heightXl: '--dasar-input-height-xl',
  paddingHorizontalXl: '--dasar-input-padding-horizontal-xl',
  radiusNone: '--dasar-input-radius-none',
  radiusXs: '--dasar-input-radius-xs',
  radiusSm: '--dasar-input-radius-sm',
  radiusMd: '--dasar-input-radius-md',
  radiusLg: '--dasar-input-radius-lg',
  radiusXl: '--dasar-input-radius-xl',
  radiusFull: '--dasar-input-radius-full',
  outlineBg: '--dasar-input-outline-bg',
  outlineBorder: '--dasar-input-outline-border',
  outlineHoverBorder: '--dasar-input-outline-hover-border',
  outlineFocusBorder: '--dasar-input-outline-focus-border',
  outlineFocusRing: '--dasar-input-outline-focus-ring',
  filledBg: '--dasar-input-filled-bg',
  filledBorder: '--dasar-input-filled-border',
  filledHoverBg: '--dasar-input-filled-hover-bg',
  filledFocusBg: '--dasar-input-filled-focus-bg',
  filledFocusBorder: '--dasar-input-filled-focus-border',
  filledFocusRing: '--dasar-input-filled-focus-ring',
  errorBorder: '--dasar-input-error-border',
  errorFocusRing: '--dasar-input-error-focus-ring',
  disabledBg: '--dasar-input-disabled-bg',
  disabledBorder: '--dasar-input-disabled-border',
  disabledOpacity: '--dasar-input-disabled-opacity',
  placeholderColor: '--dasar-input-placeholder-color',
  autofillBg: '--dasar-input-autofill-bg',
  autofillColor: '--dasar-input-autofill-color',
  hintFontSize: '--dasar-input-hint-font-size',
  hintColor: '--dasar-input-hint-color',
  hintErrorColor: '--dasar-input-hint-error-color',
};
export const calendarMap: Record<keyof DasarThemeCalendar, string> = {
  calendarBg: '--dasar-calendar-bg',
  outlineBorder: '--dasar-calendar-outline-border',
  outlineBg: '--dasar-calendar-outline-bg',
  padding: '--dasar-calendar-padding',
  paddingMd: '--dasar-calendar-padding-md',
  radiusNone: '--dasar-calendar-radius-none',
  radiusXs: '--dasar-calendar-radius-xs',
  radiusSm: '--dasar-calendar-radius-sm',
  radiusMd: '--dasar-calendar-radius-md',
  radiusLg: '--dasar-calendar-radius-lg',
  radiusXl: '--dasar-calendar-radius-xl',
  radiusFull: '--dasar-calendar-radius-full',
  headerMarginBottom: '--dasar-calendar-header-margin-bottom',
  headerGap: '--dasar-calendar-header-gap',
  titleGap: '--dasar-calendar-title-gap',
  chevronColor: '--dasar-calendar-chevron-color',
  titleFontWeight: '--dasar-calendar-title-font-weight',
  titleColor: '--dasar-calendar-title-color',
  titleFontSize: '--dasar-calendar-title-font-size',
  actionsGap: '--dasar-calendar-actions-gap',
  gridBorder: '--dasar-calendar-grid-border',
  gridRadiusNone: '--dasar-calendar-grid-radius-none',
  gridRadiusXs: '--dasar-calendar-grid-radius-xs',
  gridRadiusSm: '--dasar-calendar-grid-radius-sm',
  gridRadiusMd: '--dasar-calendar-grid-radius-md',
  gridRadiusLg: '--dasar-calendar-grid-radius-lg',
  gridRadiusXl: '--dasar-calendar-grid-radius-xl',
  gridRadiusFull: '--dasar-calendar-grid-radius-full',
  weekdayFontWeight: '--dasar-calendar-weekday-font-weight',
  weekdayColor: '--dasar-calendar-weekday-color',
  weekdayPaddingBottom: '--dasar-calendar-weekday-padding-bottom',
  weekdayFontSize: '--dasar-calendar-weekday-font-size',
  cellBg: '--dasar-calendar-cell-bg',
  otherMonthBg: '--dasar-calendar-other-month-bg',
  dashboardCellPadding: '--dasar-calendar-dashboard-cell-padding',
  dashboardCellMinHeight: '--dasar-calendar-dashboard-cell-min-height',
  dashboardCellPaddingSm: '--dasar-calendar-dashboard-cell-padding-sm',
  dashboardCellMinHeightSm: '--dasar-calendar-dashboard-cell-min-height-sm',
  dashboardCellPaddingMd: '--dasar-calendar-dashboard-cell-padding-md',
  dashboardCellMinHeightMd: '--dasar-calendar-dashboard-cell-min-height-md',
  dashboardCellHoverBg: '--dasar-calendar-dashboard-cell-hover-bg',
  dashboardBoxSize: '--dasar-calendar-dashboard-box-size',
  todayColor: '--dasar-calendar-today-color',
  todayBg: '--dasar-calendar-today-bg',
  selectedIndicator: '--dasar-calendar-selected-indicator',
  dashboardSelectedBg: '--dasar-calendar-dashboard-selected-bg',
  dropdownCellHeight: '--dasar-calendar-dropdown-cell-height',
  dropdownCellHoverBg: '--dasar-calendar-dropdown-cell-hover-bg',
  dropdownNumberFontWeight: '--dasar-calendar-dropdown-number-font-weight',
  dropdownNumberColor: '--dasar-calendar-dropdown-number-color',
  dropdownNumberFontSize: '--dasar-calendar-dropdown-number-font-size',
  dropdownBoxSize: '--dasar-calendar-dropdown-box-size',
  dropdownOtherMonthColor: '--dasar-calendar-dropdown-other-month-color',
  dropdownSelectedBg: '--dasar-calendar-dropdown-selected-bg',
  dropdownSelectedColor: '--dasar-calendar-dropdown-selected-color',
  dropdownSelectedFontWeight: '--dasar-calendar-dropdown-selected-font-weight',
  dropdownTodayBorder: '--dasar-calendar-dropdown-today-border',
  dropdownTodayColor: '--dasar-calendar-dropdown-today-color',
  pickerBorder: '--dasar-calendar-picker-border',
  pickerBg: '--dasar-calendar-picker-bg',
  pickerRadius: '--dasar-calendar-picker-radius',
  pickerMaxHeight: '--dasar-calendar-picker-max-height',
  pickerCellBorder: '--dasar-calendar-picker-cell-border',
  pickerCellFontWeight: '--dasar-calendar-picker-cell-font-weight',
  pickerCellColor: '--dasar-calendar-picker-cell-color',
  pickerCellBg: '--dasar-calendar-picker-cell-bg',
  pickerCellRadius: '--dasar-calendar-picker-cell-radius',
  pickerCellHeight: '--dasar-calendar-picker-cell-height',
  pickerCellHoverBg: '--dasar-calendar-picker-cell-hover-bg',
  pickerCellHoverBorder: '--dasar-calendar-picker-cell-hover-border',
  pickerSelectedBg: '--dasar-calendar-picker-selected-bg',
  pickerSelectedColor: '--dasar-calendar-picker-selected-color',
  pickerSelectedBorder: '--dasar-calendar-picker-selected-border',
  pickerSelectedFontWeight: '--dasar-calendar-picker-selected-font-weight',
};
export const datepickerMap: Record<keyof DasarThemeDatepicker, string> = {
  disabledOpacity: '--dasar-datepicker-disabled-opacity',
  disabledBg: '--dasar-datepicker-disabled-bg',
  wrapperGap: '--dasar-datepicker-wrapper-gap',
  errorBorder: '--dasar-datepicker-error-border',
  errorFocusRing: '--dasar-datepicker-error-focus-ring',
  labelFontsize: '--dasar-datepicker-label-font-size',
  labelFontWeight: '--dasar-datepicker-label-font-weight',
  labelColor: '--dasar-datepicker-label-color',
  labelMarginBottom: '--dasar-datepicker-label-margin-bottom',
  labelRightFontsize: '--dasar-datepicker-label-right-font-size',
  labelRightFontWeight: '--dasar-datepicker-label-right-font-weight',
  labelRightColor: '--dasar-datepicker-label-right-color',
  hintFontSize: '--dasar-datepicker-hint-font-size',
  hintColor: '--dasar-datepicker-hint-color',
  hintErrorColor: '--dasar-datepicker-hint-error-color',
  triggerColor: '--dasar-datepicker-trigger-color',
  gap: '--dasar-datepicker-gap',
  radiusSm: '--dasar-datepicker-radius-sm',
  triggerValueColor: '--dasar-datepicker-trigger-value-color',
  iconColor: '--dasar-datepicker-icon-color',
  clearIconColor: '--dasar-datepicker-clear-icon-color',
  heightXs: '--dasar-datepicker-height-xs',
  paddingHorizontalXs: '--dasar-datepicker-padding-horizontal-xs',
  heightSm: '--dasar-datepicker-height-sm',
  paddingHorizontalSm: '--dasar-datepicker-padding-horizontal-sm',
  heightMd: '--dasar-datepicker-height-md',
  paddingHorizontalMd: '--dasar-datepicker-padding-horizontal-md',
  heightLg: '--dasar-datepicker-height-lg',
  paddingHorizontalLg: '--dasar-datepicker-padding-horizontal-lg',
  heightXl: '--dasar-datepicker-height-xl',
  paddingHorizontalXl: '--dasar-datepicker-padding-horizontal-xl',
  radiusNone: '--dasar-datepicker-radius-none',
  radiusXs: '--dasar-datepicker-radius-xs',
  radiusMd: '--dasar-datepicker-radius-md',
  radiusLg: '--dasar-datepicker-radius-lg',
  radiusXl: '--dasar-datepicker-radius-xl',
  radiusFull: '--dasar-datepicker-radius-full',
  outlineBg: '--dasar-datepicker-outline-bg',
  outlineBorder: '--dasar-datepicker-outline-border',
  outlineHoverBorder: '--dasar-datepicker-outline-hover-border',
  outlineFocusBorder: '--dasar-datepicker-outline-focus-border',
  outlineFocusRing: '--dasar-datepicker-outline-focus-ring',
  filledBg: '--dasar-datepicker-filled-bg',
  filledBorder: '--dasar-datepicker-filled-border',
  filledHoverBg: '--dasar-datepicker-filled-hover-bg',
  filledFocusBg: '--dasar-datepicker-filled-focus-bg',
  filledFocusBorder: '--dasar-datepicker-filled-focus-border',
  filledFocusRing: '--dasar-datepicker-filled-focus-ring',
  subtleBg: '--dasar-datepicker-subtle-bg',
  subtleBorder: '--dasar-datepicker-subtle-border',
  subtleHoverBg: '--dasar-datepicker-subtle-hover-bg',
  subtleFocusBg: '--dasar-datepicker-subtle-focus-bg',
  dropdownShadow: '--dasar-datepicker-dropdown-shadow',
  dropdownBg: '--dasar-datepicker-dropdown-bg',
  dropdownBorder: '--dasar-datepicker-dropdown-border',
  dropdownRadius: '--dasar-datepicker-dropdown-radius',
  dropdownZIndex: '--dasar-datepicker-dropdown-z-index',
  dropdownWidth: '--dasar-datepicker-dropdown-width',
};
export const chipMap: Record<keyof DasarThemeChip, string> = {
  closeMarginRight: '--dasar-chip-close-margin-right',
  closeMarginLeft: '--dasar-chip-close-margin-left',
  closeHoverBg: '--dasar-chip-close-hover-bg',
  closePadding: '--dasar-chip-close-padding',
  innerGap: '--dasar-chip-inner-gap',
};
export const dividerMap: Record<keyof DasarThemeDivider, string> = {
  color: '--dasar-divider-color',
  thickness: '--dasar-divider-thickness',
  spacing: '--dasar-divider-spacing',
  dashStyle: '--dasar-divider-dash-style',
  labelColor: '--dasar-divider-label-color',
  labelFontSize: '--dasar-divider-label-font-size',
  labelGap: '--dasar-divider-label-gap',
  labelOffset: '--dasar-divider-label-offset',
  verticalMinHeight: '--dasar-divider-vertical-min-height',
};
export const alertMap: Record<keyof DasarThemeAlert, string> = {
  padding: '--dasar-alert-padding',
  gap: '--dasar-alert-gap',
  radius: '--dasar-alert-radius',
  radiusNone: '--dasar-alert-radius-none',
  radiusXs: '--dasar-alert-radius-xs',
  radiusSm: '--dasar-alert-radius-sm',
  radiusMd: '--dasar-alert-radius-md',
  radiusLg: '--dasar-alert-radius-lg',
  radiusXl: '--dasar-alert-radius-xl',
  radiusFull: '--dasar-alert-radius-full',
  borderWidth: '--dasar-alert-border-width',
  fontSize: '--dasar-alert-font-size',
  titleFontSize: '--dasar-alert-title-font-size',
  titleFontWeight: '--dasar-alert-title-font-weight',
  titleGap: '--dasar-alert-title-gap',
  closePadding: '--dasar-alert-close-padding',
  closeHoverBg: '--dasar-alert-close-hover-bg',
  leaveDuration: '--dasar-alert-leave-duration',
  primaryBg: '--dasar-alert-primary-bg',
  primaryColor: '--dasar-alert-primary-color',
  primaryBorder: '--dasar-alert-primary-border',
  primaryIconColor: '--dasar-alert-primary-icon-color',
  secondaryBg: '--dasar-alert-secondary-bg',
  secondaryColor: '--dasar-alert-secondary-color',
  secondaryBorder: '--dasar-alert-secondary-border',
  secondaryIconColor: '--dasar-alert-secondary-icon-color',
  successBg: '--dasar-alert-success-bg',
  successColor: '--dasar-alert-success-color',
  successBorder: '--dasar-alert-success-border',
  successIconColor: '--dasar-alert-success-icon-color',
  warningBg: '--dasar-alert-warning-bg',
  warningColor: '--dasar-alert-warning-color',
  warningBorder: '--dasar-alert-warning-border',
  warningIconColor: '--dasar-alert-warning-icon-color',
  dangerBg: '--dasar-alert-danger-bg',
  dangerColor: '--dasar-alert-danger-color',
  dangerBorder: '--dasar-alert-danger-border',
  dangerIconColor: '--dasar-alert-danger-icon-color',
};
export const checkboxMap: Record<keyof DasarThemeCheckbox, string> = {
  gap: '--dasar-checkbox-gap',
  hintGap: '--dasar-checkbox-hint-gap',
  sizeSm: '--dasar-checkbox-size-sm',
  sizeMd: '--dasar-checkbox-size-md',
  sizeLg: '--dasar-checkbox-size-lg',
  radius: '--dasar-checkbox-radius',
  borderWidth: '--dasar-checkbox-border-width',
  borderColor: '--dasar-checkbox-border-color',
  bg: '--dasar-checkbox-bg',
  checkedBg: '--dasar-checkbox-checked-bg',
  checkColor: '--dasar-checkbox-check-color',
  focusColor: '--dasar-checkbox-focus-color',
  errorColor: '--dasar-checkbox-error-color',
  disabledOpacity: '--dasar-checkbox-disabled-opacity',
  labelColor: '--dasar-checkbox-label-color',
  labelFontSizeSm: '--dasar-checkbox-label-font-size-sm',
  labelFontSizeMd: '--dasar-checkbox-label-font-size-md',
  labelFontSizeLg: '--dasar-checkbox-label-font-size-lg',
  hintColor: '--dasar-checkbox-hint-color',
  hintFontSize: '--dasar-checkbox-hint-font-size',
  groupGap: '--dasar-checkbox-group-gap',
};
export const radioMap: Record<keyof DasarThemeRadio, string> = {
  gap: '--dasar-radio-gap',
  hintGap: '--dasar-radio-hint-gap',
  sizeSm: '--dasar-radio-size-sm',
  sizeMd: '--dasar-radio-size-md',
  sizeLg: '--dasar-radio-size-lg',
  dotSize: '--dasar-radio-dot-size',
  borderWidth: '--dasar-radio-border-width',
  borderColor: '--dasar-radio-border-color',
  bg: '--dasar-radio-bg',
  checkedColor: '--dasar-radio-checked-color',
  focusColor: '--dasar-radio-focus-color',
  errorColor: '--dasar-radio-error-color',
  disabledOpacity: '--dasar-radio-disabled-opacity',
  labelColor: '--dasar-radio-label-color',
  labelFontSizeSm: '--dasar-radio-label-font-size-sm',
  labelFontSizeMd: '--dasar-radio-label-font-size-md',
  labelFontSizeLg: '--dasar-radio-label-font-size-lg',
  hintColor: '--dasar-radio-hint-color',
  hintFontSize: '--dasar-radio-hint-font-size',
  groupGap: '--dasar-radio-group-gap',
};
export const selectMap: Record<keyof DasarThemeSelect, string> = {
  wrapperGap: '--dasar-select-wrapper-gap',
  labelFontsize: '--dasar-select-label-font-size',
  labelFontWeight: '--dasar-select-label-font-weight',
  labelColor: '--dasar-select-label-color',
  labelRightFontsize: '--dasar-select-label-right-font-size',
  labelRightColor: '--dasar-select-label-right-color',
  paddingLeft: '--dasar-select-padding-left',
  radiusSm: '--dasar-select-radius-sm',
  gap: '--dasar-select-gap',
  color: '--dasar-select-color',
  outlineBg: '--dasar-select-outline-bg',
  outlineBorder: '--dasar-select-outline-border',
  outlineHoverBorder: '--dasar-select-outline-hover-border',
  outlineFocusBorder: '--dasar-select-outline-focus-border',
  outlineFocusRing: '--dasar-select-outline-focus-ring',
  filledBg: '--dasar-select-filled-bg',
  filledBorder: '--dasar-select-filled-border',
  filledHoverBg: '--dasar-select-filled-hover-bg',
  filledFocusBg: '--dasar-select-filled-focus-bg',
  filledFocusBorder: '--dasar-select-filled-focus-border',
  filledFocusRing: '--dasar-select-filled-focus-ring',
  errorBorder: '--dasar-select-error-border',
  errorFocusRing: '--dasar-select-error-focus-ring',
  disabledBg: '--dasar-select-disabled-bg',
  disabledBorder: '--dasar-select-disabled-border',
  disabledOpacity: '--dasar-select-disabled-opacity',
  heightXs: '--dasar-select-height-xs',
  paddingHorizontalXs: '--dasar-select-padding-horizontal-xs',
  heightSm: '--dasar-select-height-sm',
  paddingHorizontalSm: '--dasar-select-padding-horizontal-sm',
  heightMd: '--dasar-select-height-md',
  paddingHorizontalMd: '--dasar-select-padding-horizontal-md',
  heightLg: '--dasar-select-height-lg',
  paddingHorizontalLg: '--dasar-select-padding-horizontal-lg',
  heightXl: '--dasar-select-height-xl',
  paddingHorizontalXl: '--dasar-select-padding-horizontal-xl',
  radiusNone: '--dasar-select-radius-none',
  radiusXs: '--dasar-select-radius-xs',
  radiusMd: '--dasar-select-radius-md',
  radiusLg: '--dasar-select-radius-lg',
  radiusXl: '--dasar-select-radius-xl',
  radiusFull: '--dasar-select-radius-full',
  valueColor: '--dasar-select-value-color',
  placeholderColor: '--dasar-select-placeholder-color',
  searchColor: '--dasar-select-search-color',
  searchPlaceholderColor: '--dasar-select-search-placeholder-color',
  loaderColor: '--dasar-select-loader-color',
  arrowColor: '--dasar-select-arrow-color',
  dropdownMaxHeight: '--dasar-select-dropdown-max-height',
  dropdownBg: '--dasar-select-dropdown-bg',
  dropdownBorder: '--dasar-select-dropdown-border',
  dropdownRadius: '--dasar-select-dropdown-radius',
  dropdownShadow: '--dasar-select-dropdown-shadow',
  dropdownZIndex: '--dasar-select-dropdown-z-index',
  optionPaddingY: '--dasar-select-option-padding-y',
  optionPaddingX: '--dasar-select-option-padding-x',
  optionFontSize: '--dasar-select-option-font-size',
  optionColor: '--dasar-select-option-color',
  optionHoverBg: '--dasar-select-option-hover-bg',
  optionSelectedBg: '--dasar-select-option-selected-bg',
  optionSelectedColor: '--dasar-select-option-selected-color',
  optionSelectedFontWeight: '--dasar-select-option-selected-font-weight',
  optionDisabledColor: '--dasar-select-option-disabled-color',
  stateColor: '--dasar-select-state-color',
  hintFontSize: '--dasar-select-hint-font-size',
  hintColor: '--dasar-select-hint-color',
  hintErrorColor: '--dasar-select-hint-error-color',
};
export const cardMap: Record<keyof DasarThemeCard, string> = {
  background: '--dasar-card-background',
  outlineBorder: '--dasar-card-outline-border',
  elevatedBorder: '--dasar-card-elevated-border',
  elevatedShadow: '--dasar-card-elevated-shadow',
  radiusNone: '--dasar-card-radius-none',
  radiusXs: '--dasar-card-radius-xs',
  radiusSm: '--dasar-card-radius-sm',
  radiusMd: '--dasar-card-radius-md',
  radiusLg: '--dasar-card-radius-lg',
  radiusXl: '--dasar-card-radius-xl',
  radiusFull: '--dasar-card-radius-full',
  normalHeaderPaddingVertical: '--dasar-card-normal-header-padding-vertical',
  normalHeaderPaddingHorizontal: '--dasar-card-normal-header-padding-horizontal',
  normalBodyPaddingVertical: '--dasar-card-normal-body-padding-vertical',
  normalBodyPaddingHorizontal: '--dasar-card-normal-body-padding-horizontal',
  normalActionsPadding: '--dasar-card-normal-actions-padding',
  compactHeaderPadding: '--dasar-card-compact-header-padding',
  compactBodyPadding: '--dasar-card-compact-body-padding',
  compactActionsPadding: '--dasar-card-compact-actions-padding',
  fontSizeSm: '--dasar-card-font-size-sm',
  fontSizeMd: '--dasar-card-font-size-md',
  fontSizeLg: '--dasar-card-font-size-lg',
  headerBorder: '--dasar-card-header-border',
  titleColor: '--dasar-card-title-color',
  titleFontWeight: '--dasar-card-title-font-weight',
  bodyColor: '--dasar-card-body-color',
  captionColor: '--dasar-card-caption-color',
  captionFontSize: '--dasar-card-caption-font-size',
  actionsBackground: '--dasar-card-actions-background',
  actionsGap: '--dasar-card-actions-gap',
};
export const menuMap: Record<keyof DasarThemeMenu, string> = {
  triggerPaddingHorizontal: '--dasar-menu-trigger-padding-horizontal',
  triggerGap: '--dasar-menu-trigger-gap',
  outlineBorder: '--dasar-menu-outline-border',
  outlineBackground: '--dasar-menu-outline-background',
  outlineHoverBorder: '--dasar-menu-outline-hover-border',
  outlineFocusBorder: '--dasar-menu-outline-focus-border',
  outlineFocusRing: '--dasar-menu-outline-focus-ring',
  filledBorder: '--dasar-menu-filled-border',
  filledBackground: '--dasar-menu-filled-background',
  filledHoverBackground: '--dasar-menu-filled-hover-background',
  filledFocusBackground: '--dasar-menu-filled-focus-background',
  filledFocusBorder: '--dasar-menu-filled-focus-border',
  filledFocusRing: '--dasar-menu-filled-focus-ring',
  disabledOpacity: '--dasar-menu-disabled-opacity',
  heightSm: '--dasar-menu-height-sm',
  fontSizeSm: '--dasar-menu-font-size-sm',
  heightMd: '--dasar-menu-height-md',
  fontSizeMd: '--dasar-menu-font-size-md',
  heightLg: '--dasar-menu-height-lg',
  fontSizeLg: '--dasar-menu-font-size-lg',
  radiusNone: '--dasar-menu-radius-none',
  radiusXs: '--dasar-menu-radius-xs',
  radiusSm: '--dasar-menu-radius-sm',
  radiusMd: '--dasar-menu-radius-md',
  radiusLg: '--dasar-menu-radius-lg',
  radiusXl: '--dasar-menu-radius-xl',
  radiusFull: '--dasar-menu-radius-full',
  panelMinWidth: '--dasar-menu-panel-min-width',
  panelBackground: '--dasar-menu-panel-background',
  panelBorder: '--dasar-menu-panel-border',
  panelRadius: '--dasar-menu-panel-radius',
  panelShadow: '--dasar-menu-panel-shadow',
  panelPadding: '--dasar-menu-panel-padding',
  panelZIndex: '--dasar-menu-panel-z-index',
  panelOffset: '--dasar-menu-panel-offset',
  itemGap: '--dasar-menu-item-gap',
  itemPaddingVertical: '--dasar-menu-item-padding-vertical',
  itemPaddingHorizontal: '--dasar-menu-item-padding-horizontal',
  itemFontSize: '--dasar-menu-item-font-size',
  itemColor: '--dasar-menu-item-color',
  itemRadius: '--dasar-menu-item-radius',
  itemHoverBackground: '--dasar-menu-item-hover-background',
  itemHoverColor: '--dasar-menu-item-hover-color',
  itemDisabledColor: '--dasar-menu-item-disabled-color',
  dividerHeight: '--dasar-menu-divider-height',
  dividerBackground: '--dasar-menu-divider-background',
  dividerMarginVertical: '--dasar-menu-divider-margin-vertical',
};
export const tableMap: Record<string, string> = {
  radius: '--dasar-table-radius',
  background: '--dasar-table-background',
  outlineBorder: '--dasar-table-outline-border',
  filledBackground: '--dasar-table-filled-background',
  filledBorder: '--dasar-table-filled-border',
  filledRowBorder: '--dasar-table-filled-row-border',
  filledRowBackground: '--dasar-table-filled-row-background',
  elevatedBorder: '--dasar-table-elevated-border',
  elevatedShadow: '--dasar-table-elevated-shadow',
  radiusNone: '--dasar-table-radius-none',
  containerRadiusNone: '--dasar-table-container-radius-none',
  containerRadiusXs: '--dasar-table-container-radius-xs',
  containerRadiusSm: '--dasar-table-container-radius-sm',
  containerRadiusMd: '--dasar-table-container-radius-md',
  containerRadiusLg: '--dasar-table-container-radius-lg',
  containerRadiusXl: '--dasar-table-container-radius-xl',
  containerRadiusFull: '--dasar-table-container-radius-full',
  borderlessBackground: '--dasar-table-borderless-background',
  fontSizeSm: '--dasar-table-font-size-sm',
  fontSizeMd: '--dasar-table-font-size-md',
  fontSizeLg: '--dasar-table-font-size-lg',
  compactPaddingVertical: '--dasar-table-compact-padding-vertical',
  compactPaddingHorizontal: '--dasar-table-compact-padding-horizontal',
  normalPaddingVertical: '--dasar-table-normal-padding-vertical',
  normalPaddingHorizontal: '--dasar-table-normal-padding-horizontal',
  relaxedPaddingVertical: '--dasar-table-relaxed-padding-vertical',
  relaxedPaddingHorizontal: '--dasar-table-relaxed-padding-horizontal',
  color: '--dasar-table-color',
  headerBackground: '--dasar-table-header-background',
  headerFontWeight: '--dasar-table-header-font-weight',
  headerColor: '--dasar-table-header-color',
  headerHoverBackground: '--dasar-table-header-hover-background',
  headerContentGap: '--dasar-table-header-content-gap',
  sortIndicatorSize: '--dasar-table-sort-indicator-size',
  sortActiveColor: '--dasar-table-sort-active-color',
  rowBorder: '--dasar-table-row-border',
  rowHoverBackground: '--dasar-table-row-hover-background',
  rowHoverIndicatorWidth: '--dasar-table-row-hover-indicator-width',
  rowHoverIndicatorColor: '--dasar-table-row-hover-indicator-color',
  stripeBackground: '--dasar-table-stripe-background',
  expandBtnColor: '--dasar-table-expand-btn-color',
  expandBtnRadius: '--dasar-table-expand-btn-radius',
  expandBtnHoverBackground: '--dasar-table-expand-btn-hover-background',
  expandBtnHoverColor: '--dasar-table-expand-btn-hover-color',
  stateCellPadding: '--dasar-table-state-cell-padding',
  stateContentGap: '--dasar-table-state-content-gap',
  stateContentColor: '--dasar-table-state-content-color',
  spinnerTrack: '--dasar-table-spinner-track',
  spinnerColor: '--dasar-table-spinner-color',
  emptyContentGap: '--dasar-table-empty-content-gap',
  emptyTitleFontWeight: '--dasar-table-empty-title-font-weight',
  emptyTitleColor: '--dasar-table-empty-title-color',
  emptyTitleFontSize: '--dasar-table-empty-title-font-size',
  emptyDescColor: '--dasar-table-empty-desc-color',
  emptyDescFontSize: '--dasar-table-empty-desc-font-size',
  paginationPaddingVertical: '--dasar-table-pagination-padding-vertical',
  paginationPaddingHorizontal: '--dasar-table-pagination-padding-horizontal',
  paginationBorder: '--dasar-table-pagination-border',
  paginationBackground: '--dasar-table-pagination-background',
};
export const listMap: Record<string, string> = {
  background: '--dasar-list-background',
  color: '--dasar-list-color',
  radius: '--dasar-list-radius',
  radiusNone: '--dasar-list-radius-none',
  radiusXs: '--dasar-list-radius-xs',
  radiusSm: '--dasar-list-radius-sm',
  radiusMd: '--dasar-list-radius-md',
  radiusLg: '--dasar-list-radius-lg',
  radiusXl: '--dasar-list-radius-xl',
  radiusFull: '--dasar-list-radius-full',
  border: '--dasar-list-border',
  fontSizeSm: '--dasar-list-font-size-sm',
  fontSizeMd: '--dasar-list-font-size-md',
  fontSizeLg: '--dasar-list-font-size-lg',
  divider: '--dasar-list-divider',
  hoverBackground: '--dasar-list-hover-background',
  activeBackground: '--dasar-list-active-background',
  headerPadding: '--dasar-list-header-padding',
  headerFontWeight: '--dasar-list-header-font-weight',
  headerBorder: '--dasar-list-header-border',
  headerBackground: '--dasar-list-header-background',
  footerPadding: '--dasar-list-footer-padding',
  footerFontSize: '--dasar-list-footer-font-size',
  footerColor: '--dasar-list-footer-color',
  footerBorder: '--dasar-list-footer-border',
  footerBackground: '--dasar-list-footer-background',
  itemPadding: '--dasar-list-item-padding',
  maxHeight: '--dasar-list-max-height',
  activeItemBackground: '--dasar-list-active-item-background',
  activeItemColor: '--dasar-list-active-item-color',
  focusItemOutline: '--dasar-list-focus-item-outline',
  prefixColor: '--dasar-list-prefix-color',
  suffixColor: '--dasar-list-suffix-color',
};
export const paginationMap: Record<string, string> = {
  gap: '--dasar-pagination-gap',
  fontSize: '--dasar-pagination-font-size',
  itemMinWidth: '--dasar-pagination-item-min-width',
  ellipsisColor: '--dasar-pagination-ellipsis-color',
  summaryColor: '--dasar-pagination-summary-color',
  dropdownMaxHeight: '--dasar-pagination-dropdown-max-height',
};
export const switchMap: Record<string, string> = {
  gap: '--dasar-switch-gap',
  radius: '--dasar-switch-radius',
  thumbRadius: '--dasar-switch-thumb-radius',
  heightSm: '--dasar-switch-height-sm',
  heightMd: '--dasar-switch-height-md',
  heightLg: '--dasar-switch-height-lg',
  minWidthSm: '--dasar-switch-min-width-sm',
  minWidthMd: '--dasar-switch-min-width-md',
  minWidthLg: '--dasar-switch-min-width-lg',
  trackBg: '--dasar-switch-track-bg',
  trackCheckedBg: '--dasar-switch-track-checked-bg',
  thumbBg: '--dasar-switch-thumb-bg',
  thumbIconColor: '--dasar-switch-thumb-icon-color',
  thumbIconCheckedColor: '--dasar-switch-thumb-icon-checked-color',
  contentColor: '--dasar-switch-content-color',
  contentFontSize: '--dasar-switch-content-font-size',
  focusColor: '--dasar-switch-focus-color',
  disabledOpacity: '--dasar-switch-disabled-opacity',
  labelColor: '--dasar-switch-label-color',
  labelFontSize: '--dasar-switch-label-font-size',
  errorColor: '--dasar-switch-error-color',
  hintGap: '--dasar-switch-hint-gap',
  hintColor: '--dasar-switch-hint-color',
  hintFontSize: '--dasar-switch-hint-font-size',
  hintErrorColor: '--dasar-switch-hint-error-color',
};
export const skeletonMap: Record<keyof DasarThemeSkeleton, string> = {
  baseColor: '--dasar-skeleton-base-color',
  highlightColor: '--dasar-skeleton-highlight-color',
  animationDuration: '--dasar-skeleton-animation-duration',
  gap: '--dasar-skeleton-gap',
};
export const tabsMap: Record<keyof DasarThemeTabs, string> = {
  listPaddingNormal: '--dasar-tabs-list-padding-normal',
  listPaddingCompact: '--dasar-tabs-list-padding-compact',
  gapNormal: '--dasar-tabs-gap-normal',
  gapCompact: '--dasar-tabs-gap-compact',
  contentGapNormal: '--dasar-tabs-content-gap-normal',
  contentGapCompact: '--dasar-tabs-content-gap-compact',
  listRadiusNone: '--dasar-tabs-list-radius-none',
  listRadiusXs: '--dasar-tabs-list-radius-xs',
  listRadiusSm: '--dasar-tabs-list-radius-sm',
  listRadiusMd: '--dasar-tabs-list-radius-md',
  listRadiusLg: '--dasar-tabs-list-radius-lg',
  listRadiusXl: '--dasar-tabs-list-radius-xl',
  listRadiusFull: '--dasar-tabs-list-radius-full',
  scrollGap: '--dasar-tabs-scroll-gap',
  scrollFade: '--dasar-tabs-scroll-fade',
  scrollBtnPaddingX: '--dasar-tabs-scroll-btn-padding-x',
};
export const overlayMap: Record<keyof DasarThemeOverlay, string> = {
  background: '--dasar-overlay-background',
  blur: '--dasar-overlay-blur',
};
export const treeMap: Record<keyof DasarThemeTree, string> = {
  color: '--dasar-tree-color',
  fontSizeSm: '--dasar-tree-font-size-sm',
  fontSizeMd: '--dasar-tree-font-size-md',
  fontSizeLg: '--dasar-tree-font-size-lg',
  rowHeightSm: '--dasar-tree-row-height-sm',
  rowHeightMd: '--dasar-tree-row-height-md',
  rowHeightLg: '--dasar-tree-row-height-lg',
  rowRadius: '--dasar-tree-row-radius',
  rowGap: '--dasar-tree-row-gap',
  rowPaddingX: '--dasar-tree-row-padding-x',
  indent: '--dasar-tree-indent',
  expanderSize: '--dasar-tree-expander-size',
  hoverBg: '--dasar-tree-hover-bg',
  selectedBg: '--dasar-tree-selected-bg',
  selectedColor: '--dasar-tree-selected-color',
  selectedFontWeight: '--dasar-tree-selected-font-weight',
  focusColor: '--dasar-tree-focus-color',
  lineColor: '--dasar-tree-line-color',
  iconColor: '--dasar-tree-icon-color',
  folderColor: '--dasar-tree-folder-color',
  dropColor: '--dasar-tree-drop-color',
  draggingOpacity: '--dasar-tree-dragging-opacity',
  disabledOpacity: '--dasar-tree-disabled-opacity',
  disabledColor: '--dasar-tree-disabled-color',
  labelColor: '--dasar-tree-label-color',
  labelFontWeight: '--dasar-tree-label-font-weight',
  hintColor: '--dasar-tree-hint-color',
  hintFontSize: '--dasar-tree-hint-font-size',
  emptyColor: '--dasar-tree-empty-color',
  gap: '--dasar-tree-gap',
};
export const drawerMap: Record<keyof DasarThemeDrawer, string> = {
  background: '--dasar-drawer-background',
  bodyColor: '--dasar-drawer-body-color',
  titleColor: '--dasar-drawer-title-color',
  titleFontWeight: '--dasar-drawer-title-font-weight',
  fontSize: '--dasar-drawer-font-size',
  border: '--dasar-drawer-border',
  shadow: '--dasar-drawer-shadow',
  headerBorder: '--dasar-drawer-header-border',
  headerPadding: '--dasar-drawer-header-padding',
  bodyPadding: '--dasar-drawer-body-padding',
  actionsBackground: '--dasar-drawer-actions-background',
  actionsBorder: '--dasar-drawer-actions-border',
  actionsPadding: '--dasar-drawer-actions-padding',
  actionsGap: '--dasar-drawer-actions-gap',
  animationDuration: '--dasar-drawer-animation-duration',
  resizeHandleSize: '--dasar-drawer-resize-handle-size',
  resizeHandleHoverColor: '--dasar-drawer-resize-handle-hover-color',
};
export const modalMap: Record<keyof DasarThemeModal, string> = {
  background: '--dasar-modal-background',
  bodyColor: '--dasar-modal-body-color',
  titleColor: '--dasar-modal-title-color',
  titleFontWeight: '--dasar-modal-title-font-weight',
  headerBorder: '--dasar-modal-header-border',
  actionsBackground: '--dasar-modal-actions-background',
  actionsBorder: '--dasar-modal-actions-border',
  actionsGap: '--dasar-modal-actions-gap',
  outlineBorder: '--dasar-modal-outline-border',
  elevatedBorder: '--dasar-modal-elevated-border',
  elevatedShadow: '--dasar-modal-elevated-shadow',
  widthSm: '--dasar-modal-width-sm',
  widthMd: '--dasar-modal-width-md',
  widthLg: '--dasar-modal-width-lg',
  fontSizeXs: '--dasar-modal-font-size-xs',
  fontSizeSm: '--dasar-modal-font-size-sm',
  fontSizeMd: '--dasar-modal-font-size-md',
  fontSizeLg: '--dasar-modal-font-size-lg',
  fontSizeXl: '--dasar-modal-font-size-xl',
  radiusNone: '--dasar-modal-radius-none',
  radiusXs: '--dasar-modal-radius-xs',
  radiusSm: '--dasar-modal-radius-sm',
  radiusMd: '--dasar-modal-radius-md',
  radiusLg: '--dasar-modal-radius-lg',
  radiusXl: '--dasar-modal-radius-xl',
  radiusFull: '--dasar-modal-radius-full',
  compactHeaderPadding: '--dasar-modal-compact-header-padding',
  compactBodyPadding: '--dasar-modal-compact-body-padding',
  compactActionsPadding: '--dasar-modal-compact-actions-padding',
  normalHeaderPaddingHorizontal: '--dasar-modal-normal-header-padding-horizontal',
  normalHeaderPaddingVertical: '--dasar-modal-normal-header-padding-vertical',
  normalBodyPaddingHorizontal: '--dasar-modal-normal-body-padding-horizontal',
  normalBodyPaddingVertical: '--dasar-modal-normal-body-padding-vertical',
  normalActionsPadding: '--dasar-modal-normal-actions-padding',
};
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : override) as T;
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    const current = result[key];
    result[key] =
      isPlainObject(current) && isPlainObject(value) ? deepMerge(current, value) : value;
  }
  return result as T;
}

function buildDefaultThemeConfig(mode: DasarThemeMode = 'light'): DasarThemeConfig {
  return {
    mode,
    colors: structuredClone(dasarVariables.colors) as DasarThemeColors,
    components: {},
    tokens: {
      light: { common: { ...defaultLightCommonTokens } },
      dark: { common: { ...defaultDarkCommonTokens } },
    },
  };
}

@Injectable({
  providedIn: 'root',
})
export class DasarThemeService {
  private themeState = new BehaviorSubject<DasarThemeConfig>({
    mode: 'light',
  });
  public theme$: Observable<DasarThemeConfig> = this.themeState.asObservable();
  private initialConfig = inject(DASAR_THEME_PROVIDER, { optional: true });
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (this.initialConfig) {
      this.setGlobalTheme({
        mode: this.initialConfig.mode ?? 'light',
        components: this.initialConfig.componentConfig,
        tokens: this.initialConfig.tokenConfig,
        colors: this.initialConfig.colorConfig,
      });
    }
  }

  public setGlobalTheme(config: DasarThemeConfig, targetElement?: HTMLElement) {
    if (!isPlatformBrowser(this.platformId)) {
      this.themeState.next(config);
      return;
    }
    const root = targetElement || this.document.documentElement;
    if (config.mode === 'dark') {
      this.renderer.setAttribute(root, 'data-theme', 'dark');
    } else {
      this.renderer.removeAttribute(root, 'data-theme');
    }
    if (config.colors) {
      this.injectColors(root, config.colors);
    }
    if (config.tokens?.[config.mode]?.common) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.common, commonMap);
    }
    if (config.tokens?.[config.mode]?.button) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.button, buttonMap);
    }
    if (config.tokens?.[config.mode]?.buttonGroup) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.buttonGroup, buttonGroupMap);
    }
    if (config.tokens?.[config.mode]?.input) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.input, inputMap);
    }
    if (config.tokens?.[config.mode]?.calendar) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.calendar, calendarMap);
    }
    if (config.tokens?.[config.mode]?.datepicker) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.datepicker, datepickerMap);
    }
    if (config.tokens?.[config.mode]?.chip) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.chip, chipMap);
    }
    if (config.tokens?.[config.mode]?.divider) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.divider, dividerMap);
    }
    if (config.tokens?.[config.mode]?.alert) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.alert, alertMap);
    }
    if (config.tokens?.[config.mode]?.checkbox) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.checkbox, checkboxMap);
    }
    if (config.tokens?.[config.mode]?.radio) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.radio, radioMap);
    }
    if (config.tokens?.[config.mode]?.select) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.select, selectMap);
    }
    if (config.tokens?.[config.mode]?.card) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.card, cardMap);
    }
    if (config.tokens?.[config.mode]?.menu) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.menu, menuMap);
    }
    if (config.tokens?.[config.mode]?.table) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.table, tableMap);
    }
    if (config.tokens?.[config.mode]?.list) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.list, listMap);
    }
    if (config.tokens?.[config.mode]?.pagination) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.pagination, paginationMap);
    }
    if (config.tokens?.[config.mode]?.switch) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.switch, switchMap);
    }
    if (config.tokens?.[config.mode]?.skeleton) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.skeleton, skeletonMap);
    }
    if (config.tokens?.[config.mode]?.tabs) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.tabs, tabsMap);
    }
    if (config.tokens?.[config.mode]?.overlay) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.overlay, overlayMap);
    }
    if (config.tokens?.[config.mode]?.modal) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.modal, modalMap);
    }
    if (config.tokens?.[config.mode]?.drawer) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.drawer, drawerMap);
    }
    if (config.tokens?.[config.mode]?.tree) {
      this.injectMappedTokens(root, config.tokens?.[config.mode]?.tree, treeMap);
    }
    this.themeState.next(config);
  }

  public themeVariable(): DasarThemeConfig {
    const raw = this.themeState.getValue();
    return deepMerge(buildDefaultThemeConfig(raw.mode ?? 'light'), raw);
  }

  public rawThemeVariable(): DasarThemeConfig {
    return this.themeState.getValue();
  }

  private injectMappedTokens(
    element: HTMLElement,
    payload: any,
    dictionary: Record<string, string>,
  ) {
    Object.entries(payload).forEach(([key, value]) => {
      const cssVar = dictionary[key];
      if (cssVar && value !== undefined && value !== null) {
        this.renderer.setStyle(element, cssVar, String(value));
      }
    });
  }

  private injectColors(element: HTMLElement, colors: DasarThemeColors) {
    Object.entries(colors).forEach(([paletteName, shades]) => {
      if (shades && typeof shades === 'object') {
        Object.entries(shades).forEach(([shadeKey, value]) => {
          if (value !== undefined && value !== null) {
            const cssVar = `--dasar-${paletteName}-${shadeKey}`;
            this.renderer.setStyle(element, cssVar, String(value));
          }
        });
      }
    });
  }
}
