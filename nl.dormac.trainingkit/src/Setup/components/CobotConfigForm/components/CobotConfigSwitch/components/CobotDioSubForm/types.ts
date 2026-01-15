import {
  DigitalInputName,
  DigitalOutputName,
  IOType,
} from '../../../../../../../core/models/cobot-config-types';

export type DIConfig = {
  kind: 'input';
  port: number;
  value?: DigitalInputName;
  type: IOType;
};

export type DOConfig = {
  kind: 'output';
  port: number;
  value?: DigitalOutputName;
  type: IOType;
};
