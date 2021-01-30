const datepickerApp = () => {
    console.log('this works');
    
    const date_picker_element = document.querySelector('.datepicker');
    const selected_date_element = document.querySelector('.datepicker .selected-date');
    const selected_time_element = document.querySelector('.datepicker .selected-time');
    const dates_element = document.querySelector('.datepicker .dates');
    const mth_element = document.querySelector('.datepicker .dates .month .mth');
    const next_mth_element = document.querySelector('.datepicker .dates .month .next-mth');
    const prev_mth_element = document.querySelector('.datepicker .dates .month .prev-mth');
    const days_element = document.querySelector('.datepicker .dates .days');
    const hidden_input_element = document.querySelector('.datepicker .hidden-input');
  
  
    const months = ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
  
  
  
    let selectedDate = date;
    let selectedDay = day;
    let selectedMonth = month;
    let selectedYear = year;
  
    mth_element.textContent = months[month]+ ' ' + year;
  
    selected_date_element.textContent = formatDate(date);
    selected_date_element.dataset.value = selectedDate;
    hidden_input_element.value = formatDatetime(selectedDate);
  
    populateDates();
  
    //EVENT LISTENERS
    date_picker_element.addEventListener('click', toggleDatePicker);
    next_mth_element.addEventListener('click', goToNextMonth);
    prev_mth_element.addEventListener('click', goToPrevMonth);
  
    //FUNCTIONS
    function toggleDatePicker (e) {
        if (!checkEventPathForClass(e.path, 'dates') && !checkEventPathForClass(e.path, 'time')) {
            dates_element.classList.toggle('active');
        }
    }
  
    function goToNextMonth (e) {
        month++;
        if (month > 11){
            month = 0;
            year++;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }
  
    function goToPrevMonth (e) {
        month--;
        if (month < 0){
            month = 11;
            year--;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }
  
    function populateDates(e) {
        days_element.innerHTML = '';
      var amount_days = getAmountDays(month, year);
      var last_day_prev = new Date(year, month - 1, 0);
      var prev_last = last_day_prev.getDate();
      var first_day_next = new Date(year, month + 1, 1);
      var next_first = first_day_next.getDate();
      var firstDayCurrMonth = new Date(year, month, 1);
      var lastDayCurrMonth = new Date(year, month, 0);
      
      if ( firstDayCurrMonth.getDay()- 1 == -1){
        var firstOffSet = 6;
      }else{
        var firstOffSet = firstDayCurrMonth.getDay() - 1;
      }
      if ( lastDayCurrMonth.getDay() == 6){
        var lastOffSet = 0;
      }else{
        var lastOffSet = lastDayCurrMonth.getDay();
      }
      var next_days= 1;
     
        for (let i = 0; i < 42; i++) {
        const day_element = document.createElement('div');
        if (firstOffSet < i <= amount_days) {
          day_element.className = 'day';
          day_element.textContent = i + 1 -firstOffSet;
        }
        if(i > amount_days + firstOffSet-1){
          
          day_element.className = 'filler';
          day_element.textContent = next_days;
          next_days = next_days+ 1;
        }
        if(i < firstOffSet){
            
          day_element.className = 'filler';
          day_element.textContent = prev_last-firstOffSet+i+1;
        
        }
        if (selectedDay == (i-firstOffSet+1) && selectedMonth == month && selectedYear == year){
          day_element.classList.add('selected');
        }
  
        day_element.addEventListener('click', function (){
          if(day_element.classList == 'filler'){
            formAlert(alert_box, 'wrongDay');
          }else{
            
          
            selectedDate = new Date(year + '/' + (month + 1) + '/' + day_element.textContent);
            selectedDay = day_element.textContent;
            selectedMonth = month;
            selectedYear = year;
  
            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;
            hidden_input_element.value = formatDatetime(selectedDate);
  
            populateDates();
          }
        })
        
        days_element.appendChild(day_element);
        
        }
  
    }
  
  
  
    //HELPER functions
    if (!("path" in Event.prototype))
    Object.defineProperty(Event.prototype, "path", {
      get: function() {
        var path = [];
        var currentElem = this.target;
        while (currentElem) {
          path.push(currentElem);
          currentElem = currentElem.parentElement;
        }
        if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
          path.push(document);
        if (path.indexOf(window) === -1)
          path.push(window);
        return path;
      }
    });
  
    function getAmountDays (month, year){
      let amount_days = 31;
        if (month == 1){
            amount_days = 28;
            if ((year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)){
                amount_days = 29;
            }
        }
        else if (month == 3 || month == 5 || month == 8 || month == 10) {
            amount_days = 30;
      }
      return amount_days
    }
  
    function checkEventPathForClass (path, selector) {
      for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
          return true;
        }
      }
      return false;
    }
  
    function formatDatetime(d) {
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let hours = 0;
      let minutes = 0;
  
      if (month< 10){
            month = '0' + month;
        }
      if (day< 10){
            day = '0' + day;
        }
      if (hours< 10){
            hours = '0' + hours;
        }
      if (minutes< 10){
            minutes = '0' + minutes;
        }
  
  
      return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
    }
  
    function formatDate(d) {
        let day = d.getDate();
        if (day< 10){
            day = '0' + day;
        }
  
        let month = d.getMonth() +1;
        if (month< 10){
            month = '0' + month;
        }
  
        let year = d.getFullYear();
  
        let minutes = date.getMinutes();
        if (minutes< 10){
            minutes = '0' + minutes;
        }
  
        let hours = date.getHours();
        if (hours< 10){
            hours = '0' + hours;
        }
  
        return day + '.' + month + '.' + year
    }
  }
  
  datepickerApp();