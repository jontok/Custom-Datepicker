# Custom-Datepicker
A cross browser compatible datepicker 

This datepicker works in Chrome, Safari, Edge and Firefox.

In the custom_datepicker_showcase.html you can see how it is used.

Styling:

    - the styling is extremely customizable
    - the div with the selected class is the "date-input"
    - colors can be change and added by preferenz
    - a custom width should only be applied to the datepicker element

Weekday:

    - the showcase file shows the calender ordered by the weekday and each day
      in the column of the coresponding weekday
    - the weekday div and its components is optional
    - default order => Monday, Tuesday, Wednesday, Thursday, Friday, Saturday,
      Sunday
    - changing the order:
        - change the order of the weekdays divs
        - go into custom_datepicker.js and change variable weekday_order
        - 1 is the default order
        - 0 is Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday