import { cx, css } from '@move-in/styled-system/css';
import React from 'react';
import { useState } from 'react';
import Calendar from './Calendar';
import { IconButton } from '../../buttons/IconButton';
import { Button } from '../../buttons/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { addMonths, format, subMonths } from 'date-fns';

interface Props {
  className?: string;
  selectedValue?: Date;
  initialViewDate?: Date;
  footer?: React.ReactNode;
  onClick?: (date: Date) => void;
}

const DayPicker: React.FC<Props> = ({
  className,
  selectedValue,
  initialViewDate,
  footer,
  onClick,
}) => {
  const [viewDate, setViewDate] = useState<Date>(initialViewDate ?? new Date());

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'fill.light.01',
          borderColor: 'stroke.light.02',
          borderWidth: '1px',
          borderRadius: '16px',
          paddingX: '16px',
          paddingY: '24px',
        })
      )}
    >
      <div
        className={css({
          position: 'relative',
          display: 'flex',
          marginBottom: '20px',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <IconButton
            className={css({ color: 'text.light.04' })}
            shape="outline"
            theme="neutral"
            size="xs"
            icon={<IconChevronLeft size={16} />}
            onClick={() => {
              setViewDate(subMonths(viewDate, 1));
            }}
          />
          <div
            className={css({
              textStyle: 'header-18-sb',
              color: 'text.dark.04',
            })}
          >
            {format(viewDate, 'yyyy.MM')}
          </div>
          <IconButton
            className={css({ color: 'text.light.04' })}
            shape="outline"
            theme="neutral"
            size="xs"
            icon={<IconChevronRight size={16} />}
            onClick={() => {
              setViewDate(addMonths(viewDate, 1));
            }}
          />
        </div>
        <Button
          className={css({
            position: 'absolute',
            right: '0px',
            w: '40px',
            p: '0px',
            textStyle: 'body-10-r',
            color: 'text.dark.02',
          })}
          shape="outline"
          theme="neutral"
          size="xs"
          label="오늘"
          onClick={() => {
            setViewDate(new Date());
          }}
        />
      </div>
      <Calendar
        viewDate={viewDate}
        selectedValue={selectedValue}
        onClick={onClick}
      />
      {footer}
    </div>
  );
};

export default DayPicker;
