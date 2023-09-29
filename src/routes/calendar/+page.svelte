<!-- src/Calendar.svelte -->
<script>
    let currentDate = new Date();
  
    function prevMonth() {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    }
  
    function nextMonth() {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
  
    function getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }
  
    function getFirstDayOfMonth(year, month) {
      return new Date(year, month, 1).getDay();
    }
  </script>
  
  <div>
    <h1>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
    <button on:click={prevMonth}>&lt;</button>
    <button on:click={nextMonth}>&gt;</button>
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        {#each Array(getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())) as _, day}
          {#if day % 7 === 0}
            
          {/if}
          {#if day < getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) || day >= getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) + getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())}
            <td></td>
          {:else}
            <td>{day - getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) + 1}</td>
          {/if}
          {#if (day + 1) % 7 === 0 && day !== 0 && day !== getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) - 1}
          
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
  
  <style>
    /* Add your component styles here */
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }
  
    th {
      background-color: #f2f2f2;
    }
  
    td {
      cursor: pointer;
    }
  </style>