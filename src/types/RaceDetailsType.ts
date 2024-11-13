import { TableProps } from "antd";

export type DataType = {
    name: string;
    laps: string;
    position: string;
    nationality: string;
    team: string;
  }
  
 export type ChartData = {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }>
  };


export  const RaceDetailsColumns: TableProps<DataType>['columns'] = [
    { title: 'Driver Name', dataIndex: 'name', key: 'name' },
    { title: 'Nationality', dataIndex: 'nationality', key: 'nationality' },
    { title: 'Laps', dataIndex: 'laps', key: 'laps' },
    { title: 'Team', dataIndex: 'team', key: 'team' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
  ];
