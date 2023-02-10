import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = ({hideDiv}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    hideDiv(start, end);
  }
  return (
    <DatePicker selected={startDate} onChange={onChange}
    startDate={startDate} endDate={endDate} 
    minDate={new Date()} monthsShown={2} locale={ko}
    selectsRange inline/>
  );
};

export default Example;