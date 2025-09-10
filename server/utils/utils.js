export const generateUniqueIdentifier = () => {
    const min = 100000; // Smallest 6-digit number
    const max = 999999; // Largest 6-digit number

    const randomIdentifier = Math.floor(Math.random() * (max - min + 1)) + min;

    return String(randomIdentifier); // Convert it to a string
}
