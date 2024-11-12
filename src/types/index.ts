
export interface Response {
   MRData: Mrdata
}
  
  export interface Mrdata {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    RaceTable?: RaceTable
    SeasonTable?: SeasonTable

  }

export interface SeasonTable {
    Seasons: Season[]
}

export interface Season {
    season: string
    url: string
}
  
  export interface Race {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    Results: Result[]
  }
  
  
  export interface Circuit {
    circuitId: string
    url: string
    circuitName: string
    Location: Location
  }

  export interface RaceTable {
    season: string
    round?: string
    Races: Race[]
  }
  

  export interface Result {
    number: string
    position: string
    positionText: string
    points: string
    Driver: Driver
    Constructor: any
    grid: string
    laps: string
    status: string
    Time?: any
    FastestLap?: any
  }
  
  export interface Driver {
    driverId: string
    permanentNumber?: string
    code: string
    url: string
    givenName: string
    familyName: string
    dateOfBirth: string
    nationality: string
  }