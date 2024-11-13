import React, { useEffect, useState } from 'react'
import { getRaceDetails } from '../service/seasons';
import { Response, Result } from '../types';
import { useParams } from 'react-router-dom';
import { Table, message } from 'antd';
import Header from '../component/Header';
import { Bar } from "react-chartjs-2";
import { ChartData, DataType, RaceDetailsColumns } from '../types/RaceDetailsType';


function RaceDetails() {
  const [results, setResults] = useState<DataType[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { seasonId, round } = useParams();


  const prepareRaceData = (results: Result[]) => {
    let raceResults: DataType[] = [];
    let chartData: { labels: string[], datasets: any[] } = {
      labels: [],
      datasets: [
        { label: "Completed Laps", data: [], backgroundColor: ['rgb(253, 104, 104)'], borderWidth: 1 },
        { label: "Drivers position", data: [], backgroundColor: ['rgb(15, 131, 171)'], borderWidth: 1 },
        { label: "Completed Race Time", data: [], backgroundColor: ['rgb(250, 164, 58)'], borderWidth: 1 }
      ]
    };

    results.forEach((result: Result) => {
      const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
      raceResults.push({
        name: driverName,
        position: result.position,
        nationality: result.Driver.nationality,
        laps: result.laps,
        team: result.Constructor.name,
      });

      chartData.labels.push(driverName);
      chartData.datasets[0].data.push(result.laps);
      chartData.datasets[1].data.push(result.position);
      chartData.datasets[2].data.push(result.status === "Finished" ? result.Time.millis * 1.666668e-5 : 0);
    });

    setResults(raceResults);
    setChartData(chartData);
  };

  const getRaceDetail = async () => {
    try {
      setIsLoading(true);
      const data: Response = await getRaceDetails(parseInt(seasonId!), parseInt(round!));
      if (data.MRData.RaceTable?.Races.length) {
        prepareRaceData(data.MRData.RaceTable?.Races[0].Results);
      }
    } catch (error) {
      console.error('Error fetching Races:', error);
      message.error('Failed to load race details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRaceDetail();
  }, []);

  return (
    <>
      <Header title={`Race Details for season ${seasonId} round ${round}`} />
      <Table columns={RaceDetailsColumns} loading={isLoading} dataSource={results} pagination={{ position: ['bottomRight'], pageSize: 8 }} />
      {chartData && (
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: { display: true, text: "Drivers performance" },
              legend: { display: false }
            },
            scales: {
              x: { beginAtZero: true },
              y: { beginAtZero: true }
            }
          }}
        />
      )}
    </>
  );
}

export default RaceDetails;
