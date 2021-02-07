import React from 'react';
import {Text, View, Pressable} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';

const NBR_OF_ROWS = 5;
const NBR_OF_COLS = 5;
const NBR_OF_SHIPS = 3;
const NBR_OF_BOMBS = 15;
const START = 'plus';
const MISSED = 'cross';
const HIT = 'circle';

const Game = {
    notStarted: "Click the start button...",
    running: "The game is on...",
    won: "You sunk all the ships.",
    lostTime: "You ran out of time.",
    lostBombs: "Game over. Ships remaining."
};

export default class Gameboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: Game.notStarted,
            board: [],
            bombs: null,
            hits: null,
        };

        this.initializeBoard();
    }
    
    initializeBoard() {
        for (let i = 0; i < NBR_OF_ROWS * NBR_OF_COLS; i++) {
            this.state.board[i] = START;
        }
        this.setState({
            bombs: NBR_OF_BOMBS,
            hits: 0,
        });
    }

    chooseItemColor(number) {
        if (this.state.board[number] === MISSED) {
            return "#FF3031";
        } else if (this.state.board[number] === HIT){
            return "#45CE30";
        } else {
            return "#74B9FF"
        }
    }

    gameEnded() {
        /* did this game just end? */
        // out of ships
        console.log(this.state);
        if (this.state.hits === NBR_OF_SHIPS) {
            this.setState({ game: Game.won });
            return;
        }
        // out of time
        if (false) {
            this.setState({ game: Game.lostTime });
            return;
        }
        // out of bombs
        if (this.state.bombs === 0) {
            this.setState({ game: Game.lostBombs });
            return;
        }
    }

    reveal(number) {
        if (this.state.game === Game.running && this.state.board[number] === START) {
            /* not yet clicked */
            const isShip = Math.random() < ((NBR_OF_SHIPS - this.state.hits) / 
                (NBR_OF_COLS * NBR_OF_ROWS) + (NBR_OF_BOMBS - this.state.bombs));
            // change tile
            this.state.board[number] = isShip ? HIT : MISSED;
            // counters
            this.setState({ bombs: this.state.bombs - 1 });
            if (isShip) {
                this.setState({ hits: this.state.hits + 1 });
            }

            this.setState({}); // badness
        }
    }

    resetGame() {
        this.setState({
            game: Game.running,
            // TODO
        });
        this.initializeBoard();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.game === Game.running) {
            this.gameEnded();
        }
    }

    render() {
        const firstRow = [];
        const secondRow = [];
        const thirdRow = [];
        const fourthRow = [];
        const fifthRow = [];

        for (let i = 0; i < NBR_OF_ROWS; i++) {
            firstRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.reveal(i)}>
                    <Entypo key={i} name={this.state.board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS; i < NBR_OF_ROWS * 2; i++) {
            secondRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.reveal(i)}>
                    <Entypo key={i} name={this.state.board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS *2; i < NBR_OF_ROWS * 3; i++) {
            thirdRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.reveal(i)}>
                    <Entypo key={i} name={this.state.board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS *3; i < NBR_OF_ROWS * 4; i++) {
            fourthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.reveal(i)}>
                    <Entypo key={i} name={this.state.board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS *4; i < NBR_OF_ROWS * 5; i++) {
            fifthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.reveal(i)}>
                    <Entypo key={i} name={this.state.board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }

        return (
            <View style={styles.gameboard}>
                <View style={styles.flex}>{firstRow}</View>
                <View style={styles.flex}>{secondRow}</View>
                <View style={styles.flex}>{thirdRow}</View>
                <View style={styles.flex}>{fourthRow}</View>
                <View style={styles.flex}>{fifthRow}</View>
               
                <Pressable style={styles.button} onPress={() => this.resetGame()}>
                    { this.state.game === Game.notStarted &&
                        <Text style={styles.buttonText}>Start game</Text>
                    }
                    { this.state.game !== Game.notStarted &&
                        <Text style={styles.buttonText}>New game</Text>
                    }
                </Pressable>
                { this.state.game !== Game.notStarted &&
                    <>
                        <Text style={styles.gameinfo}>Hits: {this.state.hits} Bombs: {this.state.bombs} Ships: {NBR_OF_SHIPS - this.state.hits}</Text>
                        <Text style={styles.gameinfo}>Time: {this.state.time}</Text>
                    </>
                }
                <Text style={styles.gameinfo}>Status: {this.state.game}</Text>
            </View>
        )
    }
}