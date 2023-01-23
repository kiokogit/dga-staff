import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

  
  export function MinMaxDateRangePicker({value, setValue, label, disabled, minDate, required}) {

  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
          disabled={disabled}
          minDate={minDate}
          label={label}
          openTo="day"
          value={value}
          views={['year', 'month', 'day']}
          onChange={(newValue) => {
            setValue(new Date(newValue.$d).toISOString());
          }}
          renderInput={(params) => <TextField {...params} fullWidth error={false} required={required} type={"date"} />}
        />
      </LocalizationProvider>
    );
  }