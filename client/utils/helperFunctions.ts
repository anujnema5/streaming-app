// export function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   }

export const genMeetingID = () => {
    let id = [];
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 1; i < 12; i++) {
        if (i % 4 === 0) {
            id.push('-')
        } else {
            id.push(characters[Math.floor(Math.random() * characters.length)])
        }
    }

    let otp = id.join('');
    return otp;
}

export const generateTime = () => {
    const currentDate = new Date();
    // Extract hours and minutes from the current time
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    let modifiedTime = hours;

    const timeContext = hours < 12 ? "PM" : "AM"
    if (hours > 12) {
        modifiedTime = modifiedTime - 12
    }

    return `${modifiedTime}:${minutes} ${timeContext}`
}