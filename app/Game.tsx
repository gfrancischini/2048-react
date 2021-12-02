
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BoardMoveDirection, GameManager } from "../gameEngine/gameManager";
import { Tile } from "../gameEngine/tile";
import { useBoardPanResponder } from "./boardPanResponder";
import { useDimensions } from "./DimensionsProvider";
import { GameWonOverModal } from "./gameMessages/GameWonOverModal";
import { GridContainer } from "./grid/GridContainer";
import { Heading } from "./header/Header";
import { getData, setData } from "./storage";
import { TileContainer } from "./TileContainer";

let gameManager: GameManager = new GameManager(4);

/**
 * The Game component
 * Responsible to control the game
 * @returns 
 */
export const Game = () => {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [score, setScore] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(0);
    const [showModal, setShowModal] = useState<"HELP" | "WON" | "OVER" | null>(null);
    const [autoPlay, setAutoPlay] = useState<boolean>(false);
    const dimensions = useDimensions();
    /**
     * Use effect to setup the game
     */
    useEffect(() => {
        const setup = async () => {
            // loading data from async storage
            const data = await getData("@gameKey");

            // setting up the game
            gameManager.setup(data);

            actuateOnState();

            const bestScore = await getData<number>("@bestScore");
            setBestScore(bestScore ?? 0);
        }

        setup();
    }, [gameManager]);

    /**
     * Use Effect to control the autoplay configuration
     */
    useEffect(() => {
        if (autoPlay) {
            // auto play for testing
            const interval = setInterval(() => {
                if (!gameManager.isGameTerminated()) {
                    onMove(Math.floor(Math.random() * (3 - 0)) + 0);
                }
            }, 500);

            return () => {
                clearInterval(interval);
            }
        }
    }, [autoPlay]);


    const saveData = async () => {
        await setData("@gameKey", gameManager.serialize());
        const bestScore = await getData<number>("@bestScore");
        if (bestScore == null || gameManager.score > bestScore) {
            await setData("@bestScore", gameManager.score);
        }
    }

    const refreshTiles = () => {
        const _tiles: Tile[] = [];
        gameManager.grid.eachCell((x, y, tile) => {
            if (tile) {
                _tiles.push(tile);
            }
        });
        setTiles(_tiles);
    }

    const refreshScores = () => {
        setScore(gameManager.score);
        setBestScore((previous) => Math.max(previous, gameManager.score));
    }

    const actuateOnState = () => {
        refreshTiles();
        refreshScores();
        saveData();
        setShowModal(gameManager.won && !gameManager.shouldKeepPlaying ? "WON" : gameManager.over ? "OVER" : null);
    }

    const onMove = (direction: BoardMoveDirection) => {
        if (gameManager.move(direction)) {
            actuateOnState();
        }
    }

    const { panResponder } = useBoardPanResponder(onMove);

    const styles = StyleSheet.create({
        container: {
            width: dimensions.game.width,
            height: dimensions.game.height,
            backgroundColor: '#bbada0',
            borderRadius: 4,
            alignSelf: "center"
        }
    });

    const onPressNewGame = async () => {
        await saveData();
        gameManager.restart();
        setAutoPlay(false);
        actuateOnState();
    }

    const onGameWonModalDismiss = (action: "KEEP_PLAYING" | "RESTART" | "NONE") => {
        setShowModal(null);
        switch (action) {
            case "KEEP_PLAYING":
                gameManager.keepPlaying();
                break;
            case "RESTART":
                onPressNewGame();
                break;
            case "NONE":
                break;
        }
    }

    const onToggleAutoPlay = () => {
        setAutoPlay(previous => !previous)
    }

    return <>
        {showModal === "WON" || showModal === "OVER" && <GameWonOverModal type={showModal} onModalDismiss={onGameWonModalDismiss} />}

        <View  {...panResponder.panHandlers}>
            <Heading onPressNewGame={onPressNewGame} score={score} best={bestScore} onToggleAutoPlay={onToggleAutoPlay} />
            <View style={styles.container} >
                <GridContainer size={gameManager.size} />
                <TileContainer tiles={tiles} />
            </View>
        </View>
    </>
}