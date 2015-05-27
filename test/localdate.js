var LocalDate = require('../localdate.js');
var assert    = require('assert');

describe('Valid LocalDate', function () {

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

});

describe('Invalid LocalDate', function () {

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

describe('Add LocalDate', function () {

  it('add 4 years', function () {
    var l = new LocalDate(2015, 2, 3);
    var c = l.addYears(4);

    assert.equal(c.getYear(), 2019);
    assert.equal(c.getMonth(), 2);
    assert.equal(c.getDay(), 3);

    assert.ok(c.isValid());
  });

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