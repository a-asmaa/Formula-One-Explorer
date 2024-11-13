import React, { useEffect } from 'react'
import { getSeasons } from '../service/seasons'
import { Response, Season } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, List, Row} from 'antd';
import Header from '../component/Header';

function SeasonsList() {

    const [seasons, setSeasons] = React.useState<Season[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [view, setView] = React.useState<string>("list");

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
      const navigate = useNavigate();

    useEffect(() => {
        getSeaonList();
    }, [])
  return (
    <>
        <Header view={view} setView={setView} title={"Sessons"} />
 
     {
         view === "card" ? 
            <Row gutter={{ xs: 8, sm: 16, md: 20}} style={{margin: 'auto', padding: 16, justifyContent: 'center'}}>
                {seasons.map((season: Season)=> {
                    return ( <Col key={season.season} style={{marginBottom: 16}}>
                            <Card hoverable className="card-container" bordered={true} 
                              onClick={() => navigate(`/seasons/${season.season}/races`)}
                             >
                              <h3> Season {season.season} </h3>
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
                locale={{ emptyText: 'No seasons found' }}
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
