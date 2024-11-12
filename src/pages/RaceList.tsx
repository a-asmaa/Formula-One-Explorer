import React, { useEffect } from 'react'
import { getSeasonRace } from '../service/seasons';
import { Race, Response } from '../types/seasons';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, List, Row, Space } from 'antd';
import Header from '../component/Header';
import { PinterestFilled, PushpinOutlined } from '@ant-design/icons';

function RaceList(props: any) {

    const [races, setRaces] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [view, setView] = React.useState<string>("card");
    const {seasonId} = useParams();
 
    console.log(seasonId);
    
    const getSeasonRaces = async () => {

        try {
          setIsLoading(true);
  
          const data: Response = await getSeasonRace(parseInt(seasonId!));
            
          setRaces(data.MRData.RaceTable?.Races!);
  
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
        getSeasonRaces();
    }, []);

    const handlePinRaces = (raceName: string) => {

        const list = [...races].sort((x,y) => x.raceName == raceName ? -1 : y.raceName == raceName ? 1 : 0);
        setRaces(list);

        // presist races
        // localStorage.setItem("races", JSON.stringify(list));
    }

  return (
    <>
    <Header view={view} setView={setView} title={`Races for season ${seasonId}`}/>

    {
        view === "card" ? 
            <Row gutter={16} style={{padding: 16}} >
                {races.map((race: Race)=> {
                    return ( <Col span={8} key={race.raceName} style={{marginBottom: 16}}>
                            <Card 
                            title={<Space style={{justifyContent: "space-between", width: '100%'}}>
                                <Link to={`/seasons/${seasonId}/races/${race.round}`}> {race.raceName}</Link>
                                <PushpinOutlined  onClick={() => handlePinRaces(race.raceName)}/>
                                </Space>
                                } bordered={true}>
                                <div>{race.Circuit.circuitName}</div>
                                <div>{race.date}</div>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        :
            <List
                style={{padding: 16}}
                dataSource={races}
                loading={isLoading}
                renderItem={(race: Race) => (
                <List.Item key={race.raceName}>
                    <List.Item.Meta
                        title={<Link to={`/seasons/${seasonId}/races/${race.round}`}>{race.raceName}</Link>}
                        description={race.Circuit.circuitName}
                    />
                    <div>{race.date}</div>
                </List.Item>
                )}
            />
    }
    </>
  )
}

export default RaceList
