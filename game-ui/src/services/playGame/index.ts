import axios from "axios";


export const GamePlay = async ({ move, userId }: { move: string, userId: string }) => {
    try {
        const response = await axios.post(`http://localhost:3001/play/${userId}`, {
            move
        });
        return response.data;
    } catch (error) {
        console.error('Failed to play game:', error);
    }
}
export const getScoreboard = async (userId: string) => {
    try {
        const response = await axios.get(`http://localhost:3001/scoreboard/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch scoreboard:', error);
    }
}