import React, { useEffect, useState } from 'react'
import { getRaceDetails } from '../service/seasons';
import { Response, Result } from '../types';
import { useParams } from 'react-router-dom';
import { List, Table, TableProps } from 'antd';
import Header from '../component/Header';
import { Bar } from "react-chartjs-2";
import { scales } from 'chart.js';
import { callback } from 'chart.js/dist/helpers/helpers.core';

type DataType = {
  name: string;
  laps: number;
  position: number;
  nationality: number;
}



function RaceDetails() {

    const [results, setResults] = React.useState<DataType[]>([]);
    const [chartData, setChartData] = useState<any>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {seasonId, round} = useParams();
    const columns: TableProps<DataType>['columns'] = [
      {
        title: 'Driver Name',
        dataIndex: 'name',

        key: 'name',
      },
      {
        title: 'Nationality',
        dataIndex: 'nationality',

        key: 'nationality',
      },
      {
        title: 'Laps',
        dataIndex: 'laps',
        key: 'laps',
      },
      {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
      },
     
    ];
    const getRaceDetail = async () => {

        try {
          setIsLoading(true);
  
          const data: Response = await getRaceDetails(parseInt(seasonId!), parseInt(round!));
            console.log(data.MRData.RaceTable?.Races);
            
            if( data.MRData.RaceTable?.Races.length ) {

              let _list: any = [];
              data.MRData.RaceTable?.Races[0].Results.forEach((result: Result) => {
                  _list.push({
                    name: result.Driver.givenName + " " + result.Driver.familyName,
                    position: result.position,
                    nationality: result.Driver.nationality,
                    laps: result.laps,
                    team: result.Constructor.name
                  });
              })
      
              setResults(_list);


                let list : any= [];
                data.MRData.RaceTable?.Races[0].Results.forEach((result: Result) => {
                    list.push({
                      name: result.Driver.givenName + " " + result.Driver.familyName,
                      time: result.status === "Finished" ? result.Time.millis * 1.666668e-5 : 0,
                      laps: result.laps,
                      position: result.position
                    })
                });
                
                setChartData({
                  labels: list.map((data: any) => data.name), 
                  datasets: [
                    {
                      label: "Completed Laps",
                      data: list.map((data: any) => data.laps),
                      borderWidth: 1,
                      backgroundColor: [
                        'rgb(253, 104, 104)',
                      ],
                    },
                    {
                      label: "Drivers position",
                      data: list.map((data: any) => data.position),
                      borderWidth: 1,
                      backgroundColor: [
                        'rgb(15, 131, 171)', 
                      ],
                    },
                    {
                      label: "Completed Race Time",
                      data: list.map((data: any) => data.time),
                      backgroundColor: [
                        'rgb(250, 164, 58)',
                      
                      ],
                      borderWidth: 1
                    }
                  ],
                })
            }
  
        } catch (error) {
           console.error('Error fetching Races:', error);
  
            // Display error message
            // messageApi.open({
            //   type: 'error',
            //   content: 'Failed to load flights. Please try again.',
            // });
        } finally {
          setIsLoading(false);
        }
    }

    useEffect(() => {
      getRaceDetail();
    }, [])
    
  return (<>

    <Header title={`Race Details for season ${seasonId} round ${round}`}/>

     <Table columns={columns} loading={isLoading} dataSource={results} pagination={{ position: ['bottomRight'], pageSize: 8 }}/>

      { 
        chartData &&
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Drivers performance"
              },
              legend: {
                display: false
              },
            
            },
          }}
        />
      }
    </>

  )
}

export default RaceDetails
