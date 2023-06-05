import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

interface IGameHowToPlayModalProps {
  /**
   * Is the modal visible?
   */
  visible: boolean;
  /**
   * Callback when the modal is dismissed
   */
  onModalDismiss: () => void;
}

export const GameHowToPlayModal = (props: IGameHowToPlayModalProps) => {
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.onModalDismiss();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Slide your fingers on the screen to left, right, top or bottom to
            move the blocks. Try to join together blocks of the same value.
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={props.onModalDismiss}
          >
            <Text style={styles.textStyle}>Dismiss</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
