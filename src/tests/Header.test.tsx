import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../component/Header';

describe('Header component', () => {
  it('renders the title correctly', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the Radio.Group when setView is provided', () => {
    const setViewMock = jest.fn();
    render(<Header view="card" setView={setViewMock} title="Test Title" />);

    expect(screen.getByText('Card View')).toBeInTheDocument();
    expect(screen.getByText('List View')).toBeInTheDocument();
  });

  it('does not render the Radio.Group when setView is not provided', () => {
    render(<Header title="Test Title" />);

    expect(screen.queryByText('Card View')).not.toBeInTheDocument();
    expect(screen.queryByText('List View')).not.toBeInTheDocument();
  });

  it('calls setView when a radio button is clicked', () => {
    const setViewMock = jest.fn();
    render(<Header view="card" setView={setViewMock} title="Test Title" />);

    const listViewButton = screen.getByText('List View');
    fireEvent.click(listViewButton);

    expect(setViewMock).toHaveBeenCalledWith('list');
  });
});
