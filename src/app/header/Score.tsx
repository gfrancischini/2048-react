import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export const Score = (props: IHeadingProps) => {
  const styles = StyleSheet.create({
    heading: {
      marginTop: 10,
      flexDirection: 'row',
    },
    headingTitle: {
      fontSize: 40,
      color: '#776E65',
      fontWeight: 'bold',
    },
    scores: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    container: {
      backgroundColor: '#bbada0',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 2,
      marginLeft: 2,
      flexDirection: 'column',
      alignItems: 'center',
    },
    containerTitle: {
      color: '#eee4da',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 10,
    },
    containerValue: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.heading}>
      <Text style={styles.headingTitle}>2048</Text>
      <View style={styles.scores}>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>SCORE</Text>
          <Text style={styles.containerValue}>{props.score}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>BEST</Text>
          <Text style={styles.containerValue}>{props.best}</Text>
        </View>
      </View>
    </View>
  );
};

interface IHeadingProps {
  score: number;
  best: number;
}
