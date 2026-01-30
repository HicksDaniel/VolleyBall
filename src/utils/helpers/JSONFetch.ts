export default async function JSONFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options)

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
    }

    return await res.json() as Promise<T>
}