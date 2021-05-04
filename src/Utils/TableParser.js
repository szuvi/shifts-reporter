class TableParser {
  constructor(input) {
    if (typeof input !== 'string') {
      throw new Error('Incorrect argument to constructor');
    }
    this.rawData = input;
    this.parsedToArray = null;
  }

  getObject() {
    const splittedByLine = TableParser.splitByLine(this.rawData);
    this.parsedToArray = TableParser.splitByCell(splittedByLine);
    const reportsDate = this.retrieveDate();
    const datesByUser = this.retrieveDatesByUser();
    const userNames = Object.keys(datesByUser);
    return {
      date: reportsDate,
      userNames,
      ...datesByUser,
    };
  }

  retrieveDate() {
    if (this.parsedToArray == null) {
      throw new Error('Data not parsed!');
    }
    const firstLine = this.parsedToArray[0][0];
    const [month, year] = firstLine.split(' ');
    return { month, year: +year };
  }

  retrieveDatesByUser() {
    if (this.parsedToArray == null) {
      throw new Error('Data not parsed!');
    }

    const [, ...userLines] = this.parsedToArray;

    const usersObject = userLines.reduce((acc, line) => {
      if (line.length === 0) {
        return acc;
      }

      const [currentDate, , ...users] = line;

      users.forEach((user) => {
        if (user !== '--') {
          acc[user] = acc[user] ?? [];
          acc[user].push(+currentDate);
        }
      });

      return acc;
    }, {});

    return usersObject;
  }

  static splitByLine(stringInput) {
    if (typeof stringInput !== 'string') {
      throw new Error(
        'Incorrect input. This method accepts string as argument'
      );
    }
    return stringInput.split(/\r\n|\r|\n/);
  }

  static splitByCell(arrSplittedByLine) {
    if (
      !Array.isArray(arrSplittedByLine) ||
      arrSplittedByLine.some((line) => typeof line !== 'string')
    ) {
      throw new Error('Incorrect input. This method accepts array of strings');
    }
    return arrSplittedByLine.map((line) => line.trim().split(/\t/));
  }
}

export default TableParser;
