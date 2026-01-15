import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import {
  Button,
  Card,
  Container,
  InputField,
  PoseField,
  Title,
} from '../../../../../../../components';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../hooks/useT';
import {
  getErrorNames,
  getValidationErrorsWithInfo,
} from '../../../../../../../utils/form';
import { parseAsNumber } from '../../../../../../../utils/number';
import { DeleteStaticGridButton } from './components/DeleteStaticGridButton';
import { StaticGridSelectButton } from './components/StaticGridSelectButton';
import { TeachGridVisualization } from './components/TeachGridVisualization';

type TEACH_POSITION =
  | 'DRAWER_LEFT_FRONT_TEACH_POSITION'
  | 'DRAWER_RIGHT_FRONT_TEACH_POSITION'
  | 'DRAWER_LEFT_BACK_TEACH_POSITION'
  | 'DRAWER_RIGHT_BACK_TEACH_POSITION';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  initialSelectedIndex: string;
};

export function CobotStaticGridConfigSubForm({
  form,
  initialSelectedIndex,
}: Props) {
  const t = useT();

  const [selectedIndex, setSelectedIndex] = useState(() => {
    return parseAsNumber(initialSelectedIndex, 0);
  });

  const [activeTeachPosition, setActiveTeachPosition] =
    useState<TEACH_POSITION>('DRAWER_LEFT_FRONT_TEACH_POSITION');

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'config.STATIC_GRIDS',
  });

  function addStaticGrid() {
    append({
      name: '',
      AMOUNT_SQUARES_X_AXIS: '0',
      AMOUNT_SQUARES_Y_AXIS: '0',
      DRAWER_LEFT_BACK_TEACH_POSITION: [1030, -420, 200, 0.14, 179.91, 29.37],
      DRAWER_LEFT_FRONT_TEACH_POSITION: [1030, 385, 200, 0.32, -179.98, 30.2],
      DRAWER_RIGHT_BACK_TEACH_POSITION: [425, -420, 200, 0.21, -179.47, 29.71],
      DRAWER_RIGHT_FRONT_TEACH_POSITION: [425, 385, 200, 0.19, -179.86, 30.37],
    });

    setSelectedIndex(fields.length);
  }

  function onRemove(index: number) {
    remove(index);

    setSelectedIndex(0);

    const cobotConfig = form.getValues();

    if (cobotConfig.config.STATIC_GRID_INDEX === index.toString()) {
      cobotConfig.config.STATIC_GRID_INDEX = '';
    } else if (
      cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX ===
      index.toString()
    ) {
      cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX = '';
    }

    form.trigger();

    window.scrollTo({ top: 0 });
  }

  const addButton = (
    <Button variant="outline" icon={AddIcon} onClick={addStaticGrid}>
      {t('ADD_STATIC_GRID')}
    </Button>
  );

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const errorNames = getErrorNames(errors);

  const staticGrids = form.watch('config.STATIC_GRIDS');

  const selectedStaticGridConfig = staticGrids[selectedIndex];

  return (
    <Container>
      <Title center>{t('STATIC_GRIDS')}</Title>

      {fields.length < 10 ? (
        <div className="tw-flex tw-justify-end">{addButton}</div>
      ) : null}

      <Card>
        <div className="tw-grid tw-grid-cols-12 tw-gap-4">
          <ol className="tw-col-span-4 tw-min-h-64 tw-border-r tw-border-solid tw-border-slate-200">
            {fields.map((field, index) => (
              <li key={field.id} className="tw-m-2">
                <StaticGridSelectButton
                  form={form}
                  index={index}
                  onClick={setSelectedIndex}
                  isSelected={index === selectedIndex}
                  warning={errorNames.some((error) =>
                    error.startsWith(`config.STATIC_GRIDS.${index}`),
                  )}
                />
              </li>
            ))}
            {/* <li className="tw-m-2 tw-flex tw-justify-center">{addButton}</li> */}
          </ol>
          <div
            className="tw-col-span-8 tw-p-4 tw-grid tw-gap-4 tw-pt-4"
            key={selectedIndex}
          >
            <InputField
              register={() =>
                form.register(`config.STATIC_GRIDS.${selectedIndex}.name`)
              }
              label={t('NAME')}
            />

            <InputField
              register={() =>
                form.register(
                  `config.STATIC_GRIDS.${selectedIndex}.AMOUNT_SQUARES_X_AXIS`,
                )
              }
              label={t('AMOUNT_SQUARES_X_AXIS')}
            />

            <InputField
              register={() =>
                form.register(
                  `config.STATIC_GRIDS.${selectedIndex}.AMOUNT_SQUARES_Y_AXIS`,
                )
              }
              label={t('AMOUNT_SQUARES_Y_AXIS')}
            />

            <TeachGridVisualization
              form={form}
              activeTeachPosition={activeTeachPosition}
              selectedIndex={selectedIndex}
            />

            <PoseField
              register={() =>
                form.register(
                  `config.STATIC_GRIDS.${selectedIndex}.DRAWER_LEFT_FRONT_TEACH_POSITION`,
                )
              }
              label={t('DRAWER_LEFT_FRONT_TEACH_POSITION')}
              mode="TASK"
              onFocus={() =>
                setActiveTeachPosition('DRAWER_LEFT_FRONT_TEACH_POSITION')
              }
            />

            <PoseField
              register={() =>
                form.register(
                  `config.STATIC_GRIDS.${selectedIndex}.DRAWER_RIGHT_FRONT_TEACH_POSITION`,
                )
              }
              label={t('DRAWER_RIGHT_FRONT_TEACH_POSITION')}
              mode="TASK"
              onFocus={() =>
                setActiveTeachPosition('DRAWER_RIGHT_FRONT_TEACH_POSITION')
              }
            />

            <PoseField
              register={() =>
                form.register(
                  `config.STATIC_GRIDS.${selectedIndex}.DRAWER_LEFT_BACK_TEACH_POSITION`,
                )
              }
              label={t('DRAWER_LEFT_BACK_TEACH_POSITION')}
              mode="TASK"
              onFocus={() =>
                setActiveTeachPosition('DRAWER_LEFT_BACK_TEACH_POSITION')
              }
            />

            <PoseField
              register={() =>
                form.register(
                  `config.STATIC_GRIDS.${selectedIndex}.DRAWER_RIGHT_BACK_TEACH_POSITION`,
                )
              }
              label={t('DRAWER_RIGHT_BACK_TEACH_POSITION')}
              mode="TASK"
              onFocus={() =>
                setActiveTeachPosition('DRAWER_RIGHT_BACK_TEACH_POSITION')
              }
            />

            {fields.length > 1 && selectedStaticGridConfig ? (
              <DeleteStaticGridButton
                name={selectedStaticGridConfig.name}
                onRemove={() => onRemove(selectedIndex)}
              />
            ) : null}
          </div>
        </div>
      </Card>
    </Container>
  );
}
