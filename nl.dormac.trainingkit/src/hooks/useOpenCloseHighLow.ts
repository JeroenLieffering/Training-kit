import { DigitalInput, DigitalOutput } from '../core/models/cobot-config-types';
import { useDigitalInput } from './useDigitalnput';
import { useDigitalOutput } from './useDigitalOutput';

type UseOpenCloseHighLowConfig = {
  openDigitalInput: DigitalInput;
  closeDigitalInput: DigitalInput;
  isOpenedDigitalOutput: DigitalOutput;
  isClosedDigitalOutput: DigitalOutput;
};

export type UseOpenCloseHighLowResult = {
  open: () => void;
  close: () => void;
  isOpened: boolean;
  isClosed: boolean;
  isOpenHigh: boolean;
  isCloseHigh: boolean;
  isOpenLow: boolean;
  isCloseLow: boolean;
};

export function useOpenCloseHighLow({
  openDigitalInput,
  closeDigitalInput,
  isOpenedDigitalOutput,
  isClosedDigitalOutput,
}: UseOpenCloseHighLowConfig): UseOpenCloseHighLowResult {
  const [isOpenHigh, setOpen] = useDigitalOutput(openDigitalInput);
  const [isCloseHigh, setClose] = useDigitalOutput(closeDigitalInput);

  const isOpened = useDigitalInput(isOpenedDigitalOutput);
  const isClosed = useDigitalInput(isClosedDigitalOutput);

  function open() {
    if (!isOpenHigh) {
      setClose(false);
      setOpen(true);
    } else {
      setClose(false);
      setOpen(false);
    }
  }

  function close() {
    if (!isCloseHigh) {
      setOpen(false);
      setClose(true);
    } else {
      setClose(false);
      setOpen(false);
    }
  }

  return {
    open,
    close,
    isOpened,
    isClosed,
    isOpenHigh,
    isCloseHigh,
    isOpenLow: !isOpenHigh,
    isCloseLow: !isCloseHigh,
  } as const;
}
