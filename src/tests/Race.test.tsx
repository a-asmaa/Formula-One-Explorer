import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RaceDetails from '../pages/RaceDetails';
import { getRaceDetails } from '../service/seasons';
import '@testing-library/jest-dom';
import { mockMediaQuery } from './utils';

// Mock the service function
jest.mock('../service/seasons', () => ({
  getRaceDetails: jest.fn(),
}));

describe('RaceDetails Component', () => {
  const seasonId = '2024'; 
  const round = '1'; 

  beforeEach(() => {
    mockMediaQuery();
    // Clear previous mock calls
    jest.clearAllMocks();
  });

  it('should render race details correctly when data is fetched', async () => {
    // Mock the service to return mock race data
    const mockRaceData = {
      MRData: {
        RaceTable: {
          Races: [
            {
              Results: [
                {
                  position: 1,
                  Driver: {
                    givenName: 'Lewis',
                    familyName: 'Hamilton',
                    nationality: 'British',
                  },
                  Constructor: {
                    name: 'Mercedes',
                  },
                  laps: 58,
                  status: 'Finished',
                  Time: { millis: 8700000 }, // milliseconds
                },
                {
                  position: 2,
                  Driver: {
                    givenName: 'Max',
                    familyName: 'Verstappen',
                    nationality: 'Dutch',
                  },
                  Constructor: {
                    name: 'Red Bull',
                  },
                  laps: 58,
                  status: 'Finished',
                  Time: { millis: 8800000 },
                }
              ]
            }
          ]
        }
      }
    };

    (getRaceDetails as jest.Mock).mockResolvedValueOnce(mockRaceData);

    render(
      <MemoryRouter initialEntries={[`/seasons/${seasonId}/races/${round}`]}>
        <RaceDetails />
      </MemoryRouter>
    );

    // Wait for the table and chart to render
    await waitFor(() => {
      expect(screen.getByText(/Driver Name/i)).toBeInTheDocument();
      expect(screen.getByText(/Lewis Hamilton/i)).toBeInTheDocument();
      expect(screen.getByText(/Max Verstappen/i)).toBeInTheDocument();
    });

    // Check the chart is rendered
    expect(screen.getByRole('chart')).toBeInTheDocument();
  });

  it('should handle empty data gracefully (no races)', async () => {
    // Mock the service to return empty race data
    const mockEmptyData = {
      MRData: {
        RaceTable: {
          Races: []
        }
      }
    };

    (getRaceDetails as jest.Mock).mockResolvedValueOnce(mockEmptyData);

    render(
      <MemoryRouter initialEntries={[`/seasons/${seasonId}/races/${round}`]}>
        <RaceDetails />
      </MemoryRouter>
    );

    // The table should show no data
    await waitFor(() => {
      expect(screen.getByText(/No Race Data/i)).toBeInTheDocument();
    });
  });
});
