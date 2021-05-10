import PdfGenerator from '../Utils/pdfGenerator';

const usePdfGenerator = (reportObject, selectedUsersData) => {
  const { date } = reportObject;
  const generator = new PdfGenerator({ date, ...selectedUsersData });

  return generator;
};

export default usePdfGenerator;
