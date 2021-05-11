import * as React from 'react';
import TableParser from '../Utils/TableParser';
import raportVerification from '../Utils/objectVerification';

const useTableParser = (input) => {
  const reportObject = React.useMemo(() => {
    const parser = new TableParser(input);
    return parser.getObject();
  }, [input]);

  const isValidReport = () =>
    raportVerification.isValidUserDateObject(reportObject);

  return { reportObject, isValidReport };
};

export default useTableParser;
