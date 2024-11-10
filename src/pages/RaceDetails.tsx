import React, { useEffect } from 'react'
import { getRaceDetails } from '../service/seasons';
import { Response, Result } from '../types/seasons';
import { useParams } from 'react-router-dom';
import { List } from 'antd';
import Header from '../component/Header';

function RaceDetails() {

    const [results, setResults] = React.useState<Result[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {seasonId, round} = useParams();

    const getRace = async () => {

        try {
          setIsLoading(true);
  
          const data: Response = await getRaceDetails(parseInt(seasonId!), parseInt(round!));
            console.log(data.MRData.RaceTable?.Races);
            
            if( data.MRData.RaceTable?.Races.length ) {
                setResults(data.MRData.RaceTable?.Races[0].Results);
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



    </>

  )
}

export default RaceDetails
