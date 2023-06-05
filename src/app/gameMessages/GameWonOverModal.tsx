import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

interface IGameWonOverModalProps {
  /**
   * Callback when the modal is dismissed
   */
  onModalDismiss: (action: 'KEEP_PLAYING' | 'RESTART' | 'NONE') => void;
  /**
   * Type of this modal
   */
  type: 'WON' | 'OVER';
}

export const GameWonOverModal = (props: IGameWonOverModalProps) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  const onPressContinuePlaying = () => {
    props.onModalDismiss('KEEP_PLAYING');
  };

  const onPressRestart = () => {
    props.onModalDismiss('RESTART');
  };

  const text =
    props.type === 'WON'
      ? 'Congratulations. You won 2048. Keep playing to go even farther.'
      : 'Sorry, there are no free movements!';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.onModalDismiss('NONE');
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          {props.type === 'WON' && (
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPressContinuePlaying}
            >
              <Text style={styles.textStyle}>Continue Playing</Text>
            </Pressable>
          )}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onPressRestart}
          >
            <Text style={styles.textStyle}>Restart</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
