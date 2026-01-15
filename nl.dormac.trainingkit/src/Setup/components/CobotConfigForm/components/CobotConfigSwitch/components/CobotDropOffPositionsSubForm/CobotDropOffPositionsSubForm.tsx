import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import {
  Button,
  Card,
  Container,
  InputField,
  PoseField,
  PosesField,
  Title,
} from '../../../../../../../components';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../hooks/useT';
import {
  getErrorNames,
  getValidationErrorsWithInfo,
} from '../../../../../../../utils/form';
import { parseAsNumber } from '../../../../../../../utils/number';
import { DeleteDropOffPositionButton } from './components/DeleteDropOffPositionButton';
import { DropOffPositionSelectButton } from './components/DropOffPositionSelectButton';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  initialSelectedIndex: string;
};

export function CobotDropOffPositionsSubForm({
  form,
  initialSelectedIndex,
}: Props) {
  const t = useT();

  const [selectedIndex, setSelectedIndex] = useState(() => {
    return parseAsNumber(initialSelectedIndex, 0);
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'config.DROP_OFF_POSITIONS',
  });

  function addPosition() {
    const name = String.fromCharCode(65 + fields.length);

    append({
      name,
      position: [0, 0, 0, 0, 0, 0],
      pathFromOutsideMachineDoor: [{ value: [0, 0, 0, 0, 0, 0] }],
    });

    setSelectedIndex(fields.length);
  }

  function onRemove(index: number) {
    remove(index);

    setSelectedIndex(0);

    form.trigger();

    window.scrollTo({ top: 0 });
  }

  const addButton = (
    <Button variant="outline" icon={AddIcon} onClick={addPosition}>
      {t('ADD_DROP_OFF_POSITION')}
    </Button>
  );

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const errorNames = getErrorNames(errors);

  const dropOffPositions = form.watch('config.DROP_OFF_POSITIONS');

  const selectedDropOffPosition = dropOffPositions[selectedIndex];

  return (
    <Container>
      <Title center>{t('DROP_OFF_POSITIONS')}</Title>

      {fields.length < 10 ? (
        <div className="tw-flex tw-justify-end">{addButton}</div>
      ) : null}

      {fields.length > 0 ? (
        <Card>
          <div className="tw-grid tw-grid-cols-12 tw-gap-4">
            <ol className="tw-col-span-4 tw-min-h-64 tw-border-r tw-border-solid tw-border-slate-200">
              {fields.map((field, index) => (
                <li key={field.id} className="tw-m-2">
                  <DropOffPositionSelectButton
                    form={form}
                    index={index}
                    onClick={() => setSelectedIndex(index)}
                    isSelected={index === selectedIndex}
                    warning={errorNames.some((error) =>
                      error.startsWith(`config.DROP_OFF_POSITIONS.${index}`),
                    )}
                  />
                </li>
              ))}
              <li className="tw-m-2 tw-flex tw-justify-center">{addButton}</li>
            </ol>

            {selectedDropOffPosition ? (
              <div
                className="tw-col-span-8 tw-p-4 tw-grid tw-gap-4 tw-pt-4"
                key={selectedIndex}
              >
                <InputField
                  register={() =>
                    form.register(
                      `config.DROP_OFF_POSITIONS.${selectedIndex}.name`,
                    )
                  }
                  label={t('NAME')}
                />

                <PoseField
                  register={() =>
                    form.register(
                      `config.DROP_OFF_POSITIONS.${selectedIndex}.position`,
                    )
                  }
                  label={t('DROP_OFF_POSITION')}
                  mode="TASK"
                />

                <PosesField
                  register={() =>
                    form.register(
                      `config.DROP_OFF_POSITIONS.${selectedIndex}.pathFromOutsideMachineDoor`,
                    )
                  }
                  label={t(
                    'PATH_FROM_DROP_OFF_POSITION_TO_OUTSIDE_MACHINE_DOOR',
                  )}
                  mode="JOINT"
                  min={0}
                  max={5}
                />

                <DeleteDropOffPositionButton
                  name={selectedDropOffPosition.name}
                  onRemove={() => onRemove(selectedIndex)}
                />
              </div>
            ) : null}
          </div>
        </Card>
      ) : null}
    </Container>
  );
}
