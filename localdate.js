function LocalDate (a1, a2, a3) {
  var args = arguments.length === 1 ? arguments[0].split('-') : Array.prototype.slice.apply(arguments);

  this.year  = parseInt(args[0]);
  this.month = parseInt(args[1]);
  this.day   = parseInt(args[2]);

  return this;
}

LocalDate.comparator = function (l1, l2) {
  var result = 0;

  if (l1.year === l2.year) {
    if (l1.month === l2.month) {
      if (l1.day !== l2.day) {
        result = l1.day < l2.day ? -1 : 1;
      }
    } else {
      result = l1.month < l2.month ? -1 : 1;
    }
  } else {
    result = l1.year < l2.year ? -1 : 1;
  }

  return result;
}

LocalDate.today = function () {
  var date = new Date;
  return new LocalDate(date.getFullYear(), date.getMonth()+1, date.getDate());
}

LocalDate.prototype.isEqualTo = function (date) {
  return this.compareTo(date) === 0;
}

LocalDate.prototype.isBefore = function (date) {
  return this.compareTo(date) === -1;
}

LocalDate.prototype.isAfter = function (date) {
  return this.compareTo(date) === 1;
}

LocalDate.prototype.compareTo = function (date) {
  if (typeof date === 'string')
    date = new LocalDate(date);

  return LocalDate.comparator(this, date);
}

LocalDate.prototype.toString = function () {
  return this.year + '-' + this.month + '-' + this.day;
}

LocalDate.prototype.isValid = function () {
  if (this.year === 0)
    return false;

  if (this.month < 1 || this.month > 12)
    return false;

  if (this.day < 1 || this.day > this.getDaysInMonth())
    return false;

  return !isNaN(this.year) && !isNaN(this.month) && !isNaN(this.day);
}

LocalDate.prototype.isLeapYear = function (year) {
  year = year || this.year;
  return ((year % 4) === 0) && ((year % 100) !== 0 || (year % 400) === 0);
}

LocalDate.prototype.getDaysInMonth = function (month, year) {
  month = month || this.month;
  return (month === 2 && this.isLeapYear(year)) ? 29 : [0,31,28,31,30,31,30,31,31,30,31,30,31][month];
}

LocalDate.prototype.getDay = function () {
  return this.day;
}

LocalDate.prototype.getMonth = function () {
  return this.month;
}

LocalDate.prototype.getYear = function () {
  return this.year;
}

LocalDate.prototype.addYears = function (years) {
  return new LocalDate(this.year + years, this.month, this.day);
}

LocalDate.prototype.addMonths = function (months) {
  var month = this.month + months;
  var year  = this.year;

  while (month > 12) {
    month -= 12;
    year  += 1;
  }

  return new LocalDate(year, month, this.day);
}

LocalDate.prototype.addDays = function (days) {
  var year  = this.year;
  var month = this.month;
  var day   = this.day + days;

  while (day > this.getDaysInMonth(month, year)) {
    day   -= this.getDaysInMonth(month, year);
    month += 1;

    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return new LocalDate(year, month, day);
}

LocalDate.prototype.setDay = function (day) {
  return new LocalDate(this.year, this.month, day);
}

LocalDate.prototype.setMonth = function (month) {
  return new LocalDate(this.year, month, this.day);
}

LocalDate.prototype.setYear = function (year) {
  return new LocalDate(year, this.month, this.day);
}
