import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import React from 'react'

import { Score } from './Score'
import { AboutGame } from './AboutGame'

export const Heading = (props: IHeadingProps) => {
    const styles = StyleSheet.create({
        container: {
            marginHorizontal: 10
        }, 
    });

    return (
        <View style={styles.container}>
            <Score best={props.best} score={props.score} />
            <AboutGame onPressNewGame={props.onPressNewGame} onToggleAutoPlay={props.onToggleAutoPlay}/>
        </View>
    )
}

interface IHeadingProps {
    score: number;
    best: number;
    onPressNewGame: () => void;
    onToggleAutoPlay: () => void;
}