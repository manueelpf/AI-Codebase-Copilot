export function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B"

    const units = ["B", "KB", "MB", "GB", "TB"]
    const k = 1024

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    const value = bytes / Math.pow(k, i)

    if(units[i] === "B") return `${value} ${units[i]}`
    return `${value.toFixed(2)} ${units[i]}`
}