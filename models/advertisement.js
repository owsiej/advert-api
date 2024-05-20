const moment = require("moment");

class Advertisement {
  constructor(
    title,
    description,
    author,
    category,
    tags,
    price,
    paidPeriodInWeeks,
    userId
  ) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.category = category;
    this.tags = tags;
    this.price = price;
    this.paidPeriodInWeeks = paidPeriodInWeeks;
    this.creationTime = moment().toDate();
    this.lastModified = this.creationTime;
    this.validTill = moment().add(this.paidPeriodInWeeks, "weeks").toDate();
    this.userId = userId;
  }
}

module.exports = Advertisement;
