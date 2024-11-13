import React, { useEffect, useState } from 'react';
import { getSeasonRace } from '../service/seasons';
import { Race, Response } from '../types';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Row, Table, TableProps, Space } from 'antd';
import Header from '../component/Header';
import { PushpinOutlined } from '@ant-design/icons';
import { format } from 'date-fns/format';

type DataType = {
    pinned?: boolean;
    race: string;
    date: string;
    circuit: string;
    round: number;
}

function RaceList() {
    const [races, setRaces] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [view, setView] = useState<string>("list");
    const { seasonId } = useParams();

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Race Name',
            dataIndex: 'race',
            key: 'race',
        },
        {
            title: 'Round',
            dataIndex: 'round',
            key: 'round',
        },
        {
            title: 'Circuit Name',
            dataIndex: 'circuit',
            key: 'circuit',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const getSeasonRaces = async () => {
        try {
            setIsLoading(true);
            const data: Response = await getSeasonRace(parseInt(seasonId!));

            let list: any[] = [];
            data.MRData.RaceTable?.Races.forEach((race: Race) => {
                list.push({
                    race: race.raceName,
                    date: format(race.date, "MMMM dd, yyyy"),
                    circuit: race.Circuit.circuitName,
                    round: race.round,
                });
            });

            setRaces(list);
            loadRacesForSeason(list);
        } catch (error) {
            console.error('Error fetching Races:', error);
            // TODO: use notification toast for errors 
        } finally {
            setIsLoading(false);
        }
    }

    const loadRacesForSeason = (racesList: any[]) => {
        const pinnedRaces = JSON.parse(localStorage.getItem(`pinnedRaces_${seasonId}`)!) || [];

        // update races list with pinned status 
        const racesWithPinnedStatus = racesList.map(race => ({
            ...race,
            pinned: pinnedRaces.includes(race.race),
        }));

        const sortedRaces = [...racesWithPinnedStatus].sort((a, b) => b.pinned - a.pinned);
        setRaces(sortedRaces);
    }

    const handlePinRaces = (raceName: string) => {
        // Retrieve the current pinned races for the season or initialize if not found
        const savedPinnedRaces = JSON.parse(localStorage.getItem(`pinnedRaces_${seasonId}`)!) || [];

        // Check if the race is already pinned
        const isPinned = savedPinnedRaces.includes(raceName);

        let updatedPinnedRaces;
        if (isPinned) {
            updatedPinnedRaces = savedPinnedRaces.filter((id: any) => id !== raceName);
        } else {
            updatedPinnedRaces = [...savedPinnedRaces, raceName];
        }

        // Persist pinned races
        localStorage.setItem(`pinnedRaces_${seasonId}`, JSON.stringify(updatedPinnedRaces));

        // Update races with the new pinned status
        loadRacesForSeason(races);
    }

    useEffect(() => {
        getSeasonRaces();
    }, [seasonId]);

    return (
        <>
            <Header view={view} setView={setView} title={`${seasonId} RACE RESULTS`} />
            {view === "card" ? (
                <Row gutter={16} style={{ padding: 16 }}>
                    {races.map((race: DataType) => (
                        <Col span={8} key={race.race} style={{ marginBottom: 16 }}>
                            <Card className='card-container'
                                title={
                                    <Space style={{ justifyContent: "space-between", width: '100%' }}>
                                        <Link className='card-link' style={{ color: "black" }}
                                            to={`/seasons/${seasonId}/races/${race.round}`}>{race.race}</Link>
                                        { race?.pinned ? <PushpinOutlined onClick={() => handlePinRaces(race.race)} /> : 
                                            <a style={{ fontSize: 10 }} onClick={() => handlePinRaces(race.race)} > Pin </a>
                                        }
                                    </Space>
                                }
                                bordered={true}>
                                <div>{race.circuit}</div>
                                <div>{race.date}</div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Table columns={columns} loading={isLoading} dataSource={races} pagination={{ position: ['bottomRight'], pageSize: 8 }} />
            )}
        </>
    );
}

export default RaceList;
