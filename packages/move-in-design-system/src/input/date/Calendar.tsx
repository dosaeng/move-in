import { css, cva, cx } from '@move-in/styled-system/css';
import { isEqual as isEqualDate, startOfDay } from 'date-fns';
import React, { useMemo } from 'react';

interface Props {
  className?: string;
  viewDate?: Date;
  selectedValue?: Date;
  onClick?: (date: Date) => void;
}

const headerList = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar: React.FC<Props> = ({
  className,
  viewDate,
  selectedValue,
  onClick,
}) => {
  const currentViewDate = useMemo(() => viewDate || new Date(), [viewDate]);
  const dateList = useMemo(() => {
    return getDateList(
      currentViewDate.getFullYear(),
      currentViewDate.getMonth() + 1
    );
  }, [currentViewDate]);

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
        })
      )}
    >
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          columnGap: '3.6px',
        })}
      >
        {headerList.map((day) => {
          return (
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '25px',
                textStyle: 'body-12-r',
                color: 'text.light.04',
              })}
              key={day}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: '12px',
          columnGap: '3.6px',
        })}
      >
        {dateList.map((date, index) => {
          const isHoliday = date?.getDay() === 0 || date?.getDay() === 6;
          const isSelected =
            date != null &&
            selectedValue != null &&
            isEqualDate(startOfDay(date), startOfDay(selectedValue));

          console.log(date, selectedValue);

          return (
            <div
              className={cva({
                base: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  textStyle: 'body-16-m',
                  color: 'text.dark.04',
                  cursor: 'pointer',
                },
                variants: {
                  isHoliday: {
                    true: {
                      color: 'error.red.03',
                    },
                  },
                  isSelected: {
                    true: {
                      backgroundColor: 'brand.purple.03',
                      borderRadius: '16px',
                      color: 'text.light.01',
                    },
                  },
                },
              })({
                isHoliday,
                isSelected,
              })}
              key={index}
              onClick={() => {
                if (date == null) return;

                onClick && onClick(date);
              }}
            >
              {date?.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

// 년도와 월에 해당되는 날짜 리스트를 반환하는 함수
const getDateList = (year: number, month: number): Array<Date | null> => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const firstDayWeek = firstDay.getDay();
  const lastDayDate = lastDay.getDate();
  const lastDayWeek = lastDay.getDay();
  const dateList: Array<Date | null> = [];

  for (let i = 0; i < firstDayWeek; i++) {
    dateList.push(null);
  }

  for (let i = 1; i <= lastDayDate; i++) {
    dateList.push(new Date(year, month - 1, i));
  }

  for (let i = 0; i < 6 - lastDayWeek; i++) {
    dateList.push(null);
  }

  return dateList;
};
