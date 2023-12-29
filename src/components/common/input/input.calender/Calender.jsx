import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/green.css";
// import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import size from "react-element-popper/animations/size";
// import "react-multi-date-picker/styles/layouts/mobile.css";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";

export const Calender = (inputClass) => {
  const [values, setValues] = useState([
    new DateObject(),
    new DateObject().add(2, "day"),
  ]);
  // ////////////////

  return (
    <div style={{ direction: "rtl" }}>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        plugins={[weekends()]}
        calendarPosition="bottom-right"
        // render={<InputIcon />}
        className={`green text-green bg-light`}
        // rmdp-mobile
        animations={[size()]}
        placeholder="انتخاب تاریخ"
        highlightToday={true}
        onOpenPickNewDate={false}
        inputClass={inputClass}
        required
        value={values}
        onChange={setValues}
        range
        minDate={new DateObject().subtract(0, "days")}
        maxDate={new DateObject().add(6, "days")}
      />
    </div>
  );
};
