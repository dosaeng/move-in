import { format as formatDate } from 'date-fns';

interface Props {
  date?: Date;
  format: string;
}

const DateFormat: React.FC<Props> = ({ date, format }) => {
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

export default DateFormat;
