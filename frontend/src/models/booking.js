export default class Book {
  constructor(userId, roomId, booking_title, booking_description, date) {
    this.userId = userId;
    this.roomId = roomId;
    this.booking_title = booking_title;
    this.booking_description = booking_description;
    this.date = date;
  }
}
