# localdate
LocalDate is a JS library to provide an immutable date object that represents an ISO-8601 date (year-month-day). LocalDate does not store a time or time-zone.

## Installation

Add **LocalDate** as a dependency to *package.json*:

```bash
$ npm install --save localdate
```

Or via bower

```bash
$ bower install localdate
```

## Usage

Creating a LocalDate object

```javascript
var today = new LocalDate();
var epoch = new LocalDate(1970, 1, 1);
```

### Converters

```javascript
var now   = LocalDate.fromDate(new Date);
var birth = LocalDate.fromString('1984-05-02');

birth.toDate();
now.toString();
```

### Clone

```javascript
var another = today.clone();
```

### Getters & Setters

Setters return new LocalDate instances, they do not modify the existing instance;

```javascript
today.getYear();
today.getMonth();
today.getDay();

var past = today.setYear(2000).setMonth(2).setDay(29);
```

### Comparators

You can compare two LocalDate objects, or a LocalDate to a String.

```javascript
birth.isBefore(today);
today.isAfter(past);
today.equals(now);

past.isBefore('1923-02-22');
```

### Utility

There are lots of utility methods.

```javascript
today.getDayOfWeek();
today.getDayOfYear();
today.getJulianDay();

birth.isLeapYear();
birth.isValid();

today.lengthOfMonth();
today.lengthOfYear();
```

### Add & Subtract

You can add or subtract years, months and days.

```javascript
var again = another.addMonths(22).subtractDays(10);
```

When adding months, if the original day of the month is greater than the number of days in the final month, the day will become the last day in the calculated month.