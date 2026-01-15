import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import {
  Button,
  IconButton,
  InputField,
  InputHierarchy,
  Label,
  PoseField,
} from '../../../../../../../../components';
import { CobotConfig } from '../../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../../hooks/useT';

type Props = {
  /**
   * The name of the form field
   */
  name: 'config.MACHINE_PLACE_POSITIONS' | 'config.MACHINE_PICK_POSITIONS';

  /**
   * The label of the form field element.
   */
  label: string;

  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function MachinePositionsField({ name, label, form }: Props) {
  const t = useT();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  function addPosition() {
    const name = String.fromCharCode(65 + fields.length);

    append({ name, position: [0, 0, 0, 0, 0, 0] });
  }

  return (
    <>
      {fields.length === 0 ? (
        <Label>{label}</Label>
      ) : (
        <InputHierarchy
          showSub={true}
          main={<Label>{label}</Label>}
          sub={
            <>
              {fields.map((field, index) => (
                <div key={field.id} className="tw-grid tw-gap-4">
                  <div className="tw-flex tw-items-end tw-justify-between tw-gap-2">
                    <InputField
                      register={() => form.register(`${name}.${index}.name`)}
                      label={t('NAME')}
                      className="tw-flex-grow"
                    />

                    <IconButton
                      icon={DeleteIcon}
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    />
                  </div>
                  <PoseField
                    register={() => form.register(`${name}.${index}.position`)}
                    label={null}
                    mode="TASK"
                  />
                </div>
              ))}
            </>
          }
        />
      )}

      {fields.length < 10 ? (
        <Button variant="secondary" icon={AddIcon} onClick={addPosition} full>
          {t('ADD_POSITION')}
        </Button>
      ) : null}
    </>
  );
}
