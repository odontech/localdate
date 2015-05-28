var LocalDate = require('../localdate.js');
var assert    = require('assert');

describe('Valid', function () {

  it('valid', function () {
    var l = new LocalDate(983, 12, 31);

    assert.equal(l.getYear(), 983);
    assert.equal(l.getMonth(), 12);
    assert.equal(l.getDay(), 31);

    assert.ok(l.isValid());
  });

  it('valid leap day', function () {
    var l = new LocalDate(2004, 2, 29);

    assert.equal(l.getYear(), 2004);
    assert.equal(l.getMonth(), 2);
    assert.equal(l.getDay(), 29);

    assert.ok(l.isValid());
  });

  it('valid centenary leap day', function () {
    var l = new LocalDate(2000, 2, 29);

    assert.equal(l.getYear(), 2000);
    assert.equal(l.getMonth(), 2);
    assert.equal(l.getDay(), 29);

    assert.ok(l.isValid());
  });

  it('valid today', function () {
    var l = LocalDate.today();
    var d = new Date;

    assert.equal(l.getYear(), d.getFullYear());
    assert.equal(l.getMonth(), d.getMonth()+1);
    assert.equal(l.getDay(), d.getDate());

    assert.ok(l.isValid());
  });

});

describe('Invalid', function () {

  it('invalid month', function () {
    assert.ok(!new LocalDate(2015, 13, 3).isValid());
  });

  it('invalid leap day', function () {
    assert.ok(!new LocalDate(2003, 2, 29).isValid());
  });

  it('invalid day', function () {
    assert.ok(!new LocalDate(1, 6, 31).isValid());
  });

  it('invalid year', function () {
    assert.ok(!new LocalDate(0, 6, 30).isValid());
  });

});

describe('Add', function () {

  it('add 7 months', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.addMonths(7);

    assert.equal(c.getYear(), 2000);
    assert.equal(c.getMonth(), 9);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('add 40 months', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.addMonths(40);

    assert.equal(c.getYear(), 2003);
    assert.equal(c.getMonth(), 6);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('add 1 month', function () {
    var l = new LocalDate(2015, 1, 31);
    var c = l.addMonths(1);

    assert.equal(c.getYear(), 2015);
    assert.equal(c.getMonth(), 2);
    assert.equal(c.getDay(), 28);

    assert.ok(c.isValid());
  });

  it('add 10 days', function () {
    var l = new LocalDate(2015, 1, 31);
    var c = l.addDays(10);

    assert.equal(c.getYear(), 2015);
    assert.equal(c.getMonth(), 2);
    assert.equal(c.getDay(), 10);

    assert.ok(c.isValid());
  });

  it('add 1500 days', function () {
    var l = new LocalDate(2000, 10, 5);
    var c = l.addDays(1500);

    assert.equal(c.getYear(), 2004);
    assert.equal(c.getMonth(), 11);
    assert.equal(c.getDay(), 13);

    assert.ok(c.isValid());
  });

});

describe('Subtract', function () {

  it('subtract 1 month', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.subtractMonths(1);

    assert.equal(c.getYear(), 2000);
    assert.equal(c.getMonth(), 1);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('subtract 7 months', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.subtractMonths(7);

    assert.equal(c.getYear(), 1999);
    assert.equal(c.getMonth(), 7);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('subtract 18 months', function () {
    var l = new LocalDate(2015, 5, 31);
    var c = l.subtractMonths(18);

    assert.equal(c.getYear(), 2013);
    assert.equal(c.getMonth(), 11);
    assert.equal(c.getDay(), 30);

    assert.ok(c.isValid());
  });

  it('subtract 8 days', function () {
    var l = new LocalDate(2015, 5, 31);
    var c = l.subtractDays(8);

    assert.equal(c.getYear(), 2015);
    assert.equal(c.getMonth(), 5);
    assert.equal(c.getDay(), 23);

    assert.ok(c.isValid());
  });

  it('subtract 120 days', function () {
    var l = new LocalDate(2000, 3, 20);
    var c = l.subtractDays(120);

    assert.equal(c.getYear(), 1999);
    assert.equal(c.getMonth(), 11);
    assert.equal(c.getDay(), 21);

    assert.ok(c.isValid());
  });

});

describe('Compare', function () {

  it('is after by year', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = new LocalDate(1999, 2, 27);

    assert.ok(l.isAfter(c));
  });

  it('is after by month', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = new LocalDate(2000, 1, 27);

    assert.ok(l.isAfter(c));
  });

  it('is after by month', function () {
    var l = new LocalDate(2008, 1, 28);
    var c = new LocalDate(2008, 1, 27);

    assert.ok(l.isAfter(c));
  });

  it('is equal', function () {
    var l = new LocalDate(2008, 1, 28);
    var c = new LocalDate(2008, 1, 28);

    assert.ok(l.isEqualTo(c));
  });

  it('is before by year', function () {
    var l = new LocalDate(2007, 1, 28);
    var c = new LocalDate(2008, 1, 28);

    assert.ok(l.isBefore(c));
  });

  it('is before by month', function () {
    var l = new LocalDate(2007, 1, 28);
    var c = new LocalDate(2007, 2, 28);

    assert.ok(l.isBefore(c));
  });

  it('is before by day', function () {
    var l = new LocalDate(2007, 1, 27);
    var c = new LocalDate(2007, 1, 28);

    assert.ok(l.isBefore(c));
  });

});


describe('Convert', function () {

  it('to string', function () {
    var l = new LocalDate(2005, 4, 10);

    assert.equal(l.toString(), '2005-04-10');
  });

  it('to date', function () {
    var l = new LocalDate(2005, 4, 10);
    var c = l.toDate();

    assert.equal(c.getFullYear(), 2005);
    assert.equal(c.getMonth(), 3);
    assert.equal(c.getDate(), 10);
  });

});