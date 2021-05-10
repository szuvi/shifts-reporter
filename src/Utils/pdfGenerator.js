import { jsPDF as JsPDF } from 'jspdf';
import 'jspdf-autotable';
import myFont from '../Resources/font';

class PdfGenerator {
  constructor({ date, ...datesByUser }) {
    this.date = date;
    this.datesByUser = datesByUser;
    this.doc = new JsPDF({ orientation: 'landscape' });

    this.getReport = this.getReport.bind(this);
  }

  getReport() {
    this.fillPages();
    this.doc.save('a4.pdf');
  }

  fillPages() {
    Object.keys(this.datesByUser).forEach((userName, index, userNameArray) => {
      this.addPageElements(userName);
      this.addTable(userName);
      if (index !== userNameArray.length - 1) {
        this.doc.addPage();
      }
    });
  }

  addPageElements(userName) {
    this.doc.addFileToVFS('MyFont.ttf', myFont);
    this.doc.addFont('MyFont.ttf', 'MyFont', 'normal');
    this.doc.setFont('MyFont', 'normal');
    this.doc.setFontSize(14);
    this.doc.text('Godziny nadliczbowe (dyżury medyczne)', 100, 20);
    this.doc.text(`za MIESIĄC ${this.date.month} ${this.date.year}r.`, 112, 30);
    this.doc.setFontSize(12);
    this.doc.text(`${userName} / Zakład TK i MR`, 10, 45);
    this.doc.text('.............................................', 10, 160);
    this.doc.text('.............................................', 100, 160);
    this.doc.text('.............................................', 200, 160);
    this.doc.text('podpis lekarza', 20, 170);
    this.doc.text('podpis Ordynatora', 110, 170);
    this.doc.text('KADRY', 215, 170);
  }

  addTable(userName) {
    const tableBody = this.generateTableBody(userName);
    this.appendTableToDocument(tableBody);
  }

  generateTableBody(userName) {
    const tableHeaders = PdfGenerator.getTableHeaders();

    const tableBody = this.datesByUser[userName].map((day, index) => [
      `${index + 1}`,
      `${day}.${this.date.month}.${this.date.year}`,
      '15:05',
      `${index % 2 === 0 ? '20:05' : '20:10'}`,
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
    ]);

    return [tableHeaders, ...tableBody];
  }

  appendTableToDocument(tableBody) {
    this.doc.autoTable({
      startY: 60,
      styles: {
        fontStyle: 'normal',
        font: 'MyFont',
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        halign: 'center',
        fillColor: [255, 255, 255],
      },
      head: [
        [
          { content: '', colSpan: 1 },
          { content: 'WYPEŁNIA LEKARZ', colSpan: 3 },
          { content: 'GODZINY NADLICZBOWE wypełniają kadry', colSpan: 5 },
        ],
      ],
      body: tableBody,
      theme: 'grid',
    });
  }

  static getTableHeaders() {
    return [
      'L.p.',
      'Dzień / data dyżuru',
      'Godz. od',
      'Godz.do',
      'Miesięczny wymiar czasu',
      'Ilość godz. razem',
      'W tym godz. nocne',
      'Godziny świąteczne',
      'Godziny zwykłe',
    ];
  }
}

export default PdfGenerator;
