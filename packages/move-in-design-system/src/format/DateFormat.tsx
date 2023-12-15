import { format as formatDate } from 'date-fns';
import React from 'react';

interface Props {
  date?: Date;
  format: string;
}

export const DateFormat: React.FC<Props> = ({ date, format }) => {
  try {
    if(date == null) {
      return <></>;
    }

    const dateString = formatDate(date, format);

    return <>{dateString}</>;
  } catch (error) {
    return <></>;
  }
};
