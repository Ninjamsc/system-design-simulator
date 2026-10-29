let seq = 0
export const uid = () => `x${Date.now().toString(36)}${seq++}`
