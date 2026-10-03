import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VenueSearchDrawer } from '../../components/venues/VenueSearchDrawer';

// Mock the hook to avoid errors if navigator is not fully mocked
jest.mock('../../hooks/usePlatformModifier', () => ({
  usePlatformModifier: () => ({
    formatShortcut: (key: string) => key,
    getAriaKeyshortcuts: (key: string) => key,
  }),
}));

describe('FilterDrawer (VenueSearchDrawer) Accessibility', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows filter chips to be focused and toggled via keyboard events', () => {
    render(<VenueSearchDrawer {...defaultProps} />);
    
    // The label we set was `Filter by ${item.label}`
    const wifiChip = screen.getByRole('checkbox', { name: 'Filter by High-Speed WiFi' });
    
    // Ensure it can be focused via tabIndex={0}
    expect(wifiChip).toHaveAttribute('tabindex', '0');
    
    // Initial state
    expect(wifiChip).toHaveAttribute('aria-checked', 'false');
    
    // Focus the element
    wifiChip.focus();
    expect(wifiChip).toHaveFocus();
    
    // Trigger Enter key
    fireEvent.keyDown(wifiChip, { key: 'Enter' });
    
    // State should toggle to true
    expect(wifiChip).toHaveAttribute('aria-checked', 'true');
    
    // Trigger Space key
    fireEvent.keyDown(wifiChip, { key: ' ' });
    
    // State should toggle to false
    expect(wifiChip).toHaveAttribute('aria-checked', 'false');
  });
});
