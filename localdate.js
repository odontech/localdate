/**
 *  LocalDate - immutable object representing an ISO-8601 date
 *  Homepage  : https://github.com/milestones-life/localdate
 *  Author    : Nenad Vukicevic
 *  License   : MIT
 */

(function () {

  'use strict';

  var _days = [0,31,28,31,30,31,30,31,31,30,31,30,31];

  /**
   * @constructor
   */
  function LocalDate (year, month, day) {
    if (typeof year === 'undefined') {
      return LocalDate.fromDate(new Date);
    }

    this.year  = parseInt(year, 10);
    this.month = parseInt(month, 10);
    this.day   = parseInt(day, 10);
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

  LocalDate.fromString = function (date) {
    return new (LocalDate.bind.apply(LocalDate, [null].concat(date.split('-'))));
  }

  LocalDate.fromDate = function (date) {
    return new LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  LocalDate.fromJulianDay = function (d) {
    var a = Math.floor((d - 1867216.25)/36524.25);
    var A = d < 2299161 ? d : d + 1 + a - Math.floor(a/4);

    var B = A + 1524;
    var C = Math.floor((B - 122.1)/365.25);
    var D = Math.floor(365.25 * C);
    var E = Math.floor((B - D)/30.6001);

    var day   = B - D - Math.floor(30.6001 * E);
    var month = E < 14 ? E - 1 : E - 13;
    var year  = month > 2 ? C - 4716 : C - 4715;

    return new LocalDate(year, month, Math.floor(day));
  }

  LocalDate.prototype.clone = function () {
    return new LocalDate(this.year, this.month, this.day);
  }

  LocalDate.prototype.equals = function (date) {
    return this.compareTo(date) === 0;
  }

  LocalDate.prototype.isBefore = function (date) {
    return this.compareTo(date) === -1;
  }

  LocalDate.prototype.isAfter = function (date) {
    return this.compareTo(date) === 1;
  }

  LocalDate.prototype.compareTo = function (date) {
    return LocalDate.comparator(this, typeof date === 'string' ? LocalDate.fromString(date) : date);
  }

  LocalDate.prototype.toString = function () {
    var month = this.month < 10 ? '0' + this.month : this.month;
    var day   = this.day   < 10 ? '0' + this.day   : this.day;

    return this.year + '-' + month + '-' + day;
  }

  LocalDate.prototype.toDate = function () {
    return new Date(this.year, this.month - 1, this.day);
  }

  LocalDate.prototype.toJulianDay = function () {
    var year  = this.year;
    var month = this.month;

    if (month <= 2) {
      year  -= 1;
      month += 12;
    }

    var A = Math.floor(year/100);
    var B = 2 - A + Math.floor(A/4);

    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + this.day + B - 1524;
  }

  LocalDate.prototype.isValid = function () {
    if (this.year === 0) {
      return false;
    }

    if (this.month < 1 || this.month > 12) {
      return false;
    }

    if (this.day < 1 || this.day > this.lengthOfMonth()) {
      return false;
    }

    return !isNaN(this.year) && !isNaN(this.month) && !isNaN(this.day);
  }

  LocalDate.prototype.isLeapYear = function (year) {
    var test = year || this.year;

    return ((test % 4) === 0) && ((test % 100) !== 0 || (test % 400) === 0);
  }

  LocalDate.prototype.lengthOfMonth = function (month, year) {
    var test = month || this.month;

    return _days[test] + (test === 2 && this.isLeapYear(year));
  }

  LocalDate.prototype.lengthOfYear = function (year) {
    return 365 + this.isLeapYear(year);
  }

  LocalDate.prototype.getDayOfYear = function () {
    return this.day + (this.month > 2 && this.isLeapYear()) + _days.slice(1, this.month).reduce(function (n, a) { return n + a }, 0);
  }

  LocalDate.prototype.getDayOfWeek = function () {
    return this.toDate().getDay();
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

  LocalDate.prototype.addYears = function (years) {
    return new LocalDate(this.year + years, this.month, this.day);
  }

  LocalDate.prototype.addMonths = function (months) {
    var year  = this.year;
    var month = this.month + Math.abs(months);

    while (month > 12) {
      month  -= 12;
      year   += 1;
    }

    var day   = Math.min(this.day, this.lengthOfMonth(month, year));

    return new LocalDate(year, month, day);
  }

  LocalDate.prototype.addDays = function (days) {
    var year  = this.year;
    var month = this.month;
    var day   = this.day + Math.abs(days);

    while (day > this.lengthOfMonth(month, year)) {
      day    -= this.lengthOfMonth(month, year);
      month  += 1;

      if (month > 12) {
        month = 1;
        year += 1;
      }
    }

    return new LocalDate(year, month, day);
  }

  LocalDate.prototype.subtractYears = function (years) {
    return new LocalDate(this.year - years, this.month, this.day);
  }

  LocalDate.prototype.subtractMonths = function (months) {
    var year  = this.year;
    var month = this.month - Math.abs(months);

    while (month < 1) {
      month  += 12;
      year   -= 1;
    }

    var day   = Math.min(this.day, this.lengthOfMonth(month, year));

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

      day    += this.lengthOfMonth(month - 1, year);
      month  -= 1;
    }

    return new LocalDate(year, month, day);
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = LocalDate;
  } else {
    window.LocalDate = LocalDate;
  }

})();