import { useContext } from 'react';
import { NavigateContext } from '../app/Router';

export function useNavigate() {
  return useContext(NavigateContext);
}
