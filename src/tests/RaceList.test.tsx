import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RaceList from '../pages/RaceList';
import { MemoryRouter, Route } from 'react-router-dom';

// Mock the service call
const getSeasonData = jest.fn() as jest.MockedFunction<(season: number) => Promise<any>>;

describe('RaceList Component', () => {
  const mockResponse = {
    MRData: {
      RaceTable: {
        Races: [
          {
            raceName: 'Monaco Grand Prix',
            date: '2024-05-26',
            Circuit: { circuitName: 'Circuit de Monaco' },
            round: 6,
          },
          {
            raceName: 'Canadian Grand Prix',
            date: '2024-06-09',
            Circuit: { circuitName: 'Circuit Gilles Villeneuve' },
            round: 7,
          },
        ],
      },
    },
  };

  beforeEach(() => {
    getSeasonData.mockResolvedValue(mockResponse);
    localStorage.clear();
  });

  it('renders the RaceList with correct data', async () => {
    render(
      <MemoryRouter initialEntries={['/seasons/2024/races/6']}>
        <Route path="/seasons/:seasonId/races/:round">
          <RaceList />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Monaco Grand Prix/i)).toBeInTheDocument();
      expect(screen.getByText(/Circuit de Monaco/i)).toBeInTheDocument();
      expect(screen.getByText(/Canadian Grand Prix/i)).toBeInTheDocument();
      expect(screen.getByText(/Circuit Gilles Villeneuve/i)).toBeInTheDocument();
    });
  });

  it('handles pinning functionality', async () => {
    render(
      <MemoryRouter initialEntries={['/race-list/2024']}>
        <Route path="/race-list/:seasonId">
          <RaceList />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Monaco Grand Prix/i)).toBeInTheDocument();
    });

    const pinButton = screen.getByText(/Pin/i);
    fireEvent.click(pinButton);

    const pinnedRaces = JSON.parse(localStorage.getItem('pinnedRaces_2024')!);
    expect(pinnedRaces).toContain('Monaco Grand Prix');
  });
});
