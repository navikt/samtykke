const apiPath = import.meta.env.VITE_API_PATH
const shouldMockAPI = import.meta.env.VITE_MOCK_DATA ?? 'nei'

export default {
    apiPath,
    shouldMockAPI,
}
