import { GameHowToPlayModal } from "../GameHowToPlayModal";
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';



describe('GameHowToPlayModal', () => {
  it('renders modal with correct text and dismisses on button press', () => {
    const onModalDismissMock = jest.fn();

    const { getByText, getByTestId } = render(
      <GameHowToPlayModal visible={true} onModalDismiss={onModalDismissMock} />
    );

    // Get the modal component
    const modalComponent = getByTestId('gameHowToPlayModal'); expect(modalComponent).toBeTruthy();

    // Check if the Dismiss button is rendered
    const dismissButton = getByText('Dismiss');
    expect(dismissButton).toBeTruthy();

    // Trigger button press
    fireEvent.press(dismissButton);

    // Check if onModalDismissMock is called
    expect(onModalDismissMock).toHaveBeenCalled();
  });

  it('does not render modal when not visible', () => {
    const onModalDismissMock = jest.fn();

    const { queryByTestId } = render(
      <GameHowToPlayModal visible={false} onModalDismiss={onModalDismissMock} />
    );

     // Get the modal component
     const modalComponent = queryByTestId('gameHowToPlayModal');

    expect(modalComponent).toBeNull();
  });

  it('requests modal dismissal on background press', () => {
    const onModalDismissMock = jest.fn();

    const { getByTestId } = render(
      <GameHowToPlayModal visible={true} onModalDismiss={onModalDismissMock} />
    );

    // Get the modal component
    const modalComponent = getByTestId('gameHowToPlayModal');

    // Trigger background press
    fireEvent(modalComponent, 'requestClose');

    // Check if onModalDismissMock is called
    expect(onModalDismissMock).toHaveBeenCalled();
  });
});
