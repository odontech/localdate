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

LocalDate.prototype.clone = function () {
  return new LocalDate(this.year, this.month, this.day);
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
  var month = this.month < 10 ? '0' + this.month : this.month;
  var day   = this.day   < 10 ? '0' + this.day   : this.day;

  return this.year + '-' + month + '-' + day;
}

LocalDate.prototype.toDate = function () {
  return new Date(this.year, this.month - 1, this.day);
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
  var test = year || this.year;

  return ((test % 4) === 0) && ((test % 100) !== 0 || (test % 400) === 0);
}

LocalDate.prototype.getDaysInMonth = function (month, year) {
  var test = month || this.month;
  var leap = test === 2 && this.isLeapYear(year) ? 1 : 0;

  return [0,31,28,31,30,31,30,31,31,30,31,30,31][test] + leap;
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

LocalDate.prototype.setDay = function (day) {
  return new LocalDate(this.year, this.month, day);
}

LocalDate.prototype.setMonth = function (month) {
  return new LocalDate(this.year, month, this.day);
}

LocalDate.prototype.setYear = function (year) {
  return new LocalDate(year, this.month, this.day);
}

LocalDate.prototype.addMonths = function (months) {
  var year  = this.year;
  var month = this.month + Math.abs(months);

  while (month > 12) {
    month  -= 12;
    year   += 1;
  }

  var day   = Math.min(this.day, this.getDaysInMonth(month, year));

  return new LocalDate(year, month, day);
}

LocalDate.prototype.addDays = function (days) {
  var year  = this.year;
  var month = this.month;
  var day   = this.day + Math.abs(days);

  while (day > this.getDaysInMonth(month, year)) {
    day    -= this.getDaysInMonth(month, year);
    month  += 1;

    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return new LocalDate(year, month, day);
}

LocalDate.prototype.subtractMonths = function (months) {
  var year  = this.year;
  var month = this.month - Math.abs(months);

  while (month < 1) {
    month  += 12;
    year   -= 1;
  }

  var day   = Math.min(this.day, this.getDaysInMonth(month, year));

  return new LocalDate(year, month, day);
}

LocalDate.prototype.subtractDays = function (days) {
  var year  = this.year;
  var month = this.month;
  var day   = this.day - Math.abs(days);

  while (day < 1) {
    if (month - 1 < 1) {
      month = 13;
      year -= 1;
    }

    day    += this.getDaysInMonth(month - 1, year);
    month  -= 1;
  }

  return new LocalDate(year, month, day);
}

if (module.exports) {
  module.exports = LocalDate;
}