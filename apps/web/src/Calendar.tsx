import { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import { format } from "date-fns";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const handleChange = (value: Value) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  return (
    <div>
      <h3>{format(date, "yyyy-MM-dd")}</h3>
      <ReactCalendar
        onChange={handleChange}
        value={date}
        // tileContent={({ date }) => {
        //   const isSameDate = isSameDay(new Date(date), date);
        //   return isSameDate ? <span className="dot">•</span> : null;
        // }}
      />
      {/* {date && <Diary selectedDate={date} />} */}
    </div>
  );
};

export default Calendar;
