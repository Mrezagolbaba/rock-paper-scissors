export interface scoreboardProps {
    userMove: 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
    computerMove: 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
    result: 'win' | 'lose' | 'draw';
}
export interface GameResponse extends scoreboardProps {

}