import PdfGenerator from '../Utils/pdfGenerator';

const usePdfGenerator = (reportObject, selectedUsersData) => {
  const { date } = reportObject;
  const { getReport } = new PdfGenerator({ date, ...selectedUsersData });

  return getReport;
};

export default usePdfGenerator;
