import './App.css';
import {createCreditsTestDataList, createTitlesTestDataList} from './helpers';

function App() {

  const convertDataToCSV = (data) => {
    const headers = Object.keys(data[0]);

    const csvHeader = headers.join(',');

    const csvDataRows = data.map(item => {
      const values = headers.map(header => item[header]);
      return values.join(',');
    });

    const csvRows = [csvHeader, ...csvDataRows];

    return csvRows.join('\n');
  };

  const createDownloadLink = (csvData, fileName) => {
    const dataURI = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
    const link = document.createElement('a');
    link.href = dataURI;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const generateAndSaveSyntheticData = () => {
    const generatedTitlesTestDataList = createTitlesTestDataList();
    const generatedCreditsTestDataList = createCreditsTestDataList(generatedTitlesTestDataList);

    const convertGeneratedTitlesListToCsv = convertDataToCSV(generatedTitlesTestDataList);
    const convertGeneratedCreditsListToCsv = convertDataToCSV(generatedCreditsTestDataList);

    createDownloadLink(convertGeneratedTitlesListToCsv, 'synthetic_data_titles.csv');
    createDownloadLink(convertGeneratedCreditsListToCsv, 'synthetic_data_credits.csv');

  };

  return (
      <div className='App' ><button className='generate-button' onClick={generateAndSaveSyntheticData}>Generate Data</button></div>
  );
}

export default App;
