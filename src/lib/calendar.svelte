<script>
	export let data;
	const date = new Date();
	
	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	}
	
	const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let monthIndex = date.getMonth();
	// const currentMonth = date.toLocaleString('en-US', { month: 'long' })
	$: month = monthNames[monthIndex];
	
	let year = date.getFullYear();
	
	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();
	// const currentDay = date.getDate();
	$: numberOfDays = new Date(year, monthIndex+1, 0).getDate();
	
	$: calendarCellsQty = numberOfDays + firstDayIndex;
	
	const goToNextMonth = () => {
		if (monthIndex >= 11) {
			year += 1;
			return monthIndex = 0;
		}
		return monthIndex += 1;
	}
	
	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
			year -= 1;
			return monthIndex = 11;
		}
		return monthIndex -= 1;
	}
	
	$: console.log(`${month}, ${today.dayNumber}, ${year}, FIRST DAY index is ${firstDayIndex}, MONTH index is ${monthIndex}, No. of days: ${numberOfDays}`)

	function handleDateClick(outfit) {
    // Call the function from the main page to redirect to the outfit details
    redirectToOutfit(outfit);
  }

  function getOutfitForDate(dayIndex) {
    const selectedDate = new Date(year, monthIndex, (dayIndex - firstDayIndex) + 1);
    // Find the outfit that matches the selected date
    return data.outfits.find(outfit => {
      const outfitDate = new Date(outfit.date);
      return (
        outfitDate.getDate() === selectedDate.getDate() &&
        outfitDate.getMonth() === selectedDate.getMonth() &&
        outfitDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }

</script>


	<div class="month">
		<ul>
			<li class="prev" on:click={goToPrevMonth}>&#10094;</li>
			<li class="next" on:click={goToNextMonth}>&#10095;</li>
			<li>{month}<br>
				<span style="font-size:18px">{year}</span>
			</li>
		</ul>
	</div>

	<ul class="weekdays">
		<li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li>
	</ul>

	<ul class="days">
		{#each Array(calendarCellsQty) as _, i}
		  {#if i < firstDayIndex || i >= numberOfDays + firstDayIndex }
			<li>&nbsp;</li>
		  {:else}
			<li
			  class:active={i === today.dayNumber + (firstDayIndex - 1) &&
										monthIndex === today.month &&
										year === today.year}
			  on:click={() => handleDateClick(getOutfitForDate(i))}
			>
			  {(i - firstDayIndex) + 1}
			</li>
		  {/if}
		{/each}
	  </ul>


				
<style>
	ul {list-style-type: none;}

	/* Month header */
	.month {
		padding: 70px 25px;
		width: auto;
		background: #07325f;
		text-align: center;
	}

	/* Month list */
	.month ul {
		margin: 0;
		padding: 0;
	}

	.month ul li {
		color: white;
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	/* Previous button inside month header */
	.month .prev {
		float: left;
		padding-top: 10px;
		cursor: pointer;
	}

	/* Next button */
	.month .next {
		float: right;
		padding-top: 10px;
		cursor: pointer;
	}

	/* Weekdays (Mon-Sun) */
	.weekdays {
		margin: 0;
		padding: 10px 0;
		background-color:#ddd;
	}

	.weekdays li {
		display: inline-block;
		width: 13.6%;
		color: #666;
		text-align: center;
	}

	/* Days (1-31) */
	.days {
		padding: 10px 0;
		background: #eee;
		margin: 0;
	}

	.days li {
		list-style-type: none;
		display: inline-block;
		border: 1px solid black;
		padding: 9px;
		width: 13.6%;
		text-align: center;
		margin-bottom: 1px;
		font-size: 1.2rem;
		color: #777;
		cursor: pointer;
	}

	/* Highlight the "current" day */
	.active {
		padding: 5px;
		background: #234671;
		color: white !important
	}
</style>