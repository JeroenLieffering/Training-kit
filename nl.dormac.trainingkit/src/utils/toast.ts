import { IToast, Toast } from 'dart-api';
import { TFunction } from 'i18next';

export function successToast(t: TFunction, message: string) {
  Toast.show(IToast.TYPE_SUCCESS, t('SUCCESS'), message);
}

export function errorToast(t: TFunction, message: string) {
  Toast.show(IToast.TYPE_ERROR, t('FAILURE'), message);
}

export function genericErrorToast(t: TFunction) {
  Toast.show(IToast.TYPE_ERROR, t('FAILURE'), t('SOMETHING_WENT_WRONG'));
}
