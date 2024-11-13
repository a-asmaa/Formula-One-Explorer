import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // for routing
import SeasonsList from '..//pages/SeasonsList'; // The path to your component
import { getSeasons } from '../service/seasons';
import { Response } from '../types';

// Mock the API call to get seasons
jest.mock('../service/seasons', () => ({
  getSeasons: jest.fn() as jest.MockedFunction<typeof getSeasons>,

}));

describe('SeasonsList', () => {

  it('renders a loading state initially', () => {
    (getSeasons as jest.MockedFunction<typeof getSeasons>).mockResolvedValue({ MRData: { SeasonTable: { Seasons: [] } } });
    
    render(
      <MemoryRouter>
        <SeasonsList />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders seasons correctly when data is fetched', async () => {
    const mockSeasons: Response = {
      MRData: {
        SeasonTable: {
          Seasons: [
            { season: '2024', url: '/season/2024' },
            { season: '2023', url: '/season/2023' }
          ]
        }
      }
    };

    (getSeasons as jest.MockedFunction<typeof getSeasons>).mockResolvedValue(mockSeasons);

    render(
      <MemoryRouter>
        <SeasonsList />
      </MemoryRouter>
    );

    // Wait for the data to be fetched and rendered
    await waitFor(() => screen.getByText('Season 2024'));

    // Check if the seasons are displayed in the correct view
    expect(screen.getByText('Season 2024')).toBeInTheDocument();
    expect(screen.getByText('Season 2023')).toBeInTheDocument();
  });

  it('handles the card view correctly', async () => {
    const mockSeasons: Response = {
      MRData: {
        SeasonTable: {
          Seasons: [
            { season: '2024', url: '/season/2024' },
            { season: '2023', url: '/season/2023' }
          ]
        }
      }
    };

    (getSeasons as jest.MockedFunction<typeof getSeasons>).mockResolvedValue(mockSeasons);

    render(
      <MemoryRouter>
        <SeasonsList />
      </MemoryRouter>
    );

    // Switch to card view
    fireEvent.click(screen.getByText('Card View')); // Assuming there's a button to toggle views

    // Wait for the card items to be rendered
    await waitFor(() => screen.getByText('Season 2024'));

    expect(screen.getByText('Season 2024')).toBeInTheDocument();
    expect(screen.getByText('Season 2023')).toBeInTheDocument();
  });

  it('navigates to the correct race page when clicking on a season card or list item', async () => {
    const mockSeasons: Response = {
      MRData: {
        SeasonTable: {
          Seasons: [
            { season: '2024', url: '/season/2024' },
            { season: '2023', url: '/season/2023' }
          ]
        }
      }
    };

    (getSeasons as jest.MockedFunction<typeof getSeasons>).mockResolvedValue(mockSeasons);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SeasonsList />} />
          <Route path="/seasons/:season/races" element={<div>Races</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the seasons to be loaded
    await waitFor(() => screen.getByText('Season 2024'));

    // Simulate a click on the list item
    fireEvent.click(screen.getByText('Season 2024'));

    // Check if the user is navigated to the correct page
    expect(screen.getByText('Races')).toBeInTheDocument();
  });

  it('handles error state gracefully', async () => {
    getSeasons.mockRejectedValue(new Error('Failed to load seasons'));

    render(
      <MemoryRouter>
        <SeasonsList />
      </MemoryRouter>
    );

    // Wait for the error message to be shown
    await waitFor(() => screen.getByText('Failed to load seasons. Please try again.'));

    expect(screen.getByText('Failed to load seasons. Please try again.')).toBeInTheDocument();
  });
});
