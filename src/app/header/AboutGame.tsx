import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {GameHowToPlayModal} from '../gameMessages/GameHowToPlayModal';

export const AboutGame = (props: IAboutGameProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginTop: 10,
      marginBottom: 10,
    },
    textContainer: {
      flex: 1,
      marginRight: 8,
    },
    text: {
      color: '#776E65',
      fontSize: 12,
    },
    boldText: {
      fontWeight: 'bold',
    },
    buttonContainer: {
      backgroundColor: '#8f7a66',
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      fontSize: 12,
    },
  });

  const [showHowToPlayModal, setShowHowToPlayModal] = useState<boolean>(false);
  const onDismissHowToPlayModal = () => {
    setShowHowToPlayModal(false);
  };
  const onShowHowPlayModal = () => {
    setShowHowToPlayModal(true);
  };

  return (
    <>
      <GameHowToPlayModal
        visible={showHowToPlayModal}
        onModalDismiss={onDismissHowToPlayModal}
      />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TouchableWithoutFeedback onPress={onShowHowPlayModal}>
            <Text style={styles.text}>
              Join the numbers and get to the
              <Text style={styles.boldText}> 2048 tile!</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={props.onToggleAutoPlay}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Toggle Auto Play</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{marginHorizontal: 10}} />
        <TouchableWithoutFeedback onPress={props.onPressNewGame}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>New Game</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

interface IAboutGameProps {
  /**
   * Callback when the button new game is pressed
   */
  onPressNewGame: () => void;

  /**
   * Callback when the auto play mode is toggled
   */
  onToggleAutoPlay: () => void;
}
