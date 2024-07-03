// utils.js
export const createInitialsAvatar = (name, size = 30) => {
    const nameParts = name.split(' ');
    const initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
  
    context.fillStyle = '#007bff'; // Background color
    context.fillRect(0, 0, size, size);
  
    context.fillStyle = '#fff'; // Text color
    context.font = `${size / 2}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initials, size / 2, size / 2);
  
    return canvas.toDataURL();
  };
  