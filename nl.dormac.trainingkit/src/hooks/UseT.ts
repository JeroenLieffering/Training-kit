import { useTranslation } from 'react-i18next';

export function useT() {
  const { t } = useTranslation('nl.dormac.metatender');
  return t;
}
