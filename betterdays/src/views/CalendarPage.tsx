import React, {useState} from "react";
import {Calendar, momentLocalizer, Views, View} from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const defaultDate = new Date(2026, 2, 8);
const views = {
    month: true,
    week: true,
    day: true
};

const events = [{
    id: 'a',
    title: 'Daylight "Savings" Time starts',
    start: new Date(2026, 2, 8, 1, 0, 0),
    end: new Date(2026, 2, 8, 2, 0, 0),
}];

export default function CalenderPage() : React.JSX.Element {
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());
    return (<div className="height600">
        <Calendar
            showMultiDayTimes
            defaultDate={defaultDate}
            events={events}
            localizer={localizer}
            views={views}
            view={view}
            date={date}
            onView={(view) => setView(view)}
            onNavigate={(date) => {
                setDate(new Date(date));
            }}
            style={{height: 500}}
        />
      </div>
  );
}