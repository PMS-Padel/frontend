import React from 'react';

const hours = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00','22:00','23:00'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ScheduleTable = () => (
  <table>
    <thead>
      <tr>
        <th></th>
        {days.map(day => <th>{day}</th>)}
      </tr>
    </thead>
    <tbody>
      {hours.map(hour => (
        <tr>
          <td>{hour}</td>
          {days.map((day, index) => <td key={`${day}-${hour}`}></td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ScheduleTable;