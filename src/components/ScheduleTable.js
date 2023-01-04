import React from 'react';

const ScheduleTable = ({ hours, days, date }) => (
<>

  <table style={{ borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th colSpan={days.length + 1}>{date.toDateString()}</th>
      </tr>
      <tr>
        <th></th>
        {days.map(day => <th>{day}</th>)}
      </tr>
    </thead>
    <tbody>
      {hours.map(hour => (
        <tr>
          <td>{hour}</td>
          {days.map((day, index) => <td key={`${day}-${hour}`} style={{ border: '1px solid black', width: '6rem' }}></td>)}
        </tr>
      ))}
    </tbody>
  </table>
</>
);

export default ScheduleTable;
