export const GetUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        return '';
    }
    return userId;
}