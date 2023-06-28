export const formatTrackingNumber = (trackingNumber: string): string => {
    return trackingNumber.split('-')[0].toUpperCase()
}