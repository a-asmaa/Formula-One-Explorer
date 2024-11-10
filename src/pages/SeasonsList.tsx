import React, { useEffect } from 'react'
import { getSeasons } from '../service/seasons'
import { Response, Season } from '../types/seasons';
import { Link } from 'react-router-dom';
import { Card, Col, List, Row} from 'antd';
import Header from '../component/Header';

function SeasonsList() {

    const [seasons, setSeasons] = React.useState<Season[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [view, setView] = React.useState<string>("card");

    const getSeaonList = async () => {

        try {
          setIsLoading(true);
  
          const data: Response = await getSeasons();
            console.log(data.MRData.SeasonTable?.Seasons);
            
          setSeasons(data.MRData.SeasonTable?.Seasons!);
  
        } catch (error) {
           console.error('Error fetching flights:', error);
  
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
        getSeaonList();
    }, [])
  return (
    <>
        <Header view={view} setView={setView} title={"Sessons"} />
 
     {
         view === "card" ? 
            <Row gutter={16} style={{padding: 16}}>
                {seasons.map((season: Season)=> {
                    return ( <Col span={8} key={season.season} style={{marginBottom: 16}}>
                            <Card bordered={true}>
                                <Link to={`/seasons/${season.season}/races`}> {season.season} </Link>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            :
            <List
                style={{padding: 16}}
                dataSource={seasons}
                loading={isLoading}
                renderItem={(season: Season) => (
                <List.Item key={season.season}>
                    <List.Item.Meta
                        title={<Link to={`/seasons/${season.season}/races`}>{season.season}</Link>}
                    />
                </List.Item>
                )}
            />
     }
     </>
  )
}

export default SeasonsList
