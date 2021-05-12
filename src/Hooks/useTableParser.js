import TableParser from '../Utils/TableParser';
import raportVerification from '../Utils/objectVerification';

const useTableParser = () => {
  const generateReportObject = (input) => {
    const parser = new TableParser(input);
    return parser.getObject();
  };

  const isValidReport = (reportObject) =>
    raportVerification.isValidUserDateObject(reportObject);

  return { generateReportObject, isValidReport };
};

export default useTableParser;
