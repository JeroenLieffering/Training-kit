import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { BaseInput } from '../../shadcn';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  return (
    <BaseInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      addonLeft={<SearchIcon className="h-6 w-6" />}
    />
  );
}
