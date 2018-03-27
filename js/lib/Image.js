export function getImageOfWidth(widthTarget, images) {
    return images.reduce(
        (acc, thumb) => (thumb.width <= widthTarget && thumb.width > acc.width ? thumb : acc),
        { width: 0 }
    );
}