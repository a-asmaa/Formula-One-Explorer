import React, { useEffect, useState } from 'react'
import { getRaceDetails } from '../service/seasons';
import { Response, Result } from '../types/seasons';
import { useParams } from 'react-router-dom';
import { List } from 'antd';
import Header from '../component/Header';
import { Bar } from "react-chartjs-2";


function RaceDetails() {

    const [results, setResults] = React.useState<Result[]>([]);
    const [performance, setPerformance] = React.useState<any[]>([]);
    const [chartData, setChartData] = useState<any>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {seasonId, round} = useParams();

    const getRace = async () => {

        try {
          setIsLoading(true);
  
          const data: Response = await getRaceDetails(parseInt(seasonId!), parseInt(round!));
            console.log(data.MRData.RaceTable?.Races);
            
            if( data.MRData.RaceTable?.Races.length ) {
                setResults(data.MRData.RaceTable?.Races[0].Results);

                let list : any= [];
                data.MRData.RaceTable?.Races[0].Results.forEach((result: Result) => {
                    list.push({
                      name: result.Driver.givenName + " " + result.Driver.familyName,
                      // time: result.status === "Finished" ? result.Time.millis * 1.666668e-5 : 0,
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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ],
                    },
                    {
                      label: "Drivers position",
                      data: list.map((data: any) => data.position),
                      borderWidth: 1,
                      backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0"
                      ],
                    },
                    // {
                    //   label: "Completed Race Time",
                    //   data: list.map((data: any) => data.time),
                    //   backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(255, 159, 64, 0.2)',
                    //     'rgba(255, 205, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)',
                    //     'rgba(201, 203, 207, 0.2)'
                    //   ],
                    //   borderColor: [
                    //     'rgb(255, 99, 132)',
                    //     'rgb(255, 159, 64)',
                    //     'rgb(255, 205, 86)',
                    //     'rgb(75, 192, 192)',
                    //     'rgb(54, 162, 235)',
                    //     'rgb(153, 102, 255)',
                    //     'rgb(201, 203, 207)'
                    //   ],
                    //   borderWidth: 1
                    // }
                  ]
                })
                setPerformance(list)
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
        getRace();
    }, [])
    
  return (<>

    <Header title={`Race Details for season ${seasonId} round ${round}`}/>

    <List
        style={{padding: 16}}
        dataSource={results}
        loading={isLoading}
        renderItem={(result: Result) => (
        <List.Item key={result.Driver.driverId}>
            <List.Item.Meta
                title={result.Driver.givenName + ' ' + result.Driver.familyName}
                description={result.Driver.nationality}
            />
            <div>{result.position}</div>
        </List.Item>
        )}
    />

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
              }
            }
          }}
        />
      }
    </>

  )
}

export default RaceDetails
