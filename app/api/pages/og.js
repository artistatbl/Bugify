// Client-side code where you want to use the generated image

const res = await fetch("/api/og");
const blob = await res.blob();
const url = URL.createObjectURL(blob);

// Now you can use the `url` to display the image in your UI
